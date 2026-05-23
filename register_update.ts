import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY")!
)

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { username, password, phone, referral } = await req.json()

    if (!username || !password || !phone) {
      return new Response(JSON.stringify({ success: false, error: "Missing fields" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200
      })
    }

    const { data: existingUser } = await supabaseAdmin
      .from("users").select("id").eq("username", username.toUpperCase()).single()

    if (existingUser) {
      return new Response(JSON.stringify({ success: false, error: "Username already taken" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200
      })
    }

    const email = `${username.toUpperCase()}@novabett.internal`

    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email, password, email_confirm: true,
      user_metadata: { username: username.toUpperCase() }
    })

    if (authError) {
      return new Response(JSON.stringify({ success: false, error: authError.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200
      })
    }

    const userId = authUser.user.id

    const { error: insertError } = await supabaseAdmin
      .from("users")
      .insert({
        id: userId,
        username: username.toUpperCase(),
        phone: phone,
        total_deposit: 0,
        vip_level: 1,
        first_deposit_claimed: false
      })

    if (insertError) {
      await supabaseAdmin.auth.admin.deleteUser(userId)
      return new Response(JSON.stringify({ success: false, error: insertError.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200
      })
    }

    await supabaseAdmin.from("wallets").insert({
      user_id: userId, main_balance: 0, bonus_balance: 0
    })

    // ── Referral lookup ──────────────────────────────────────────────────────
    if (referral && referral.trim()) {
      const ref = referral.trim()
      let referrer: { id: string } | null = null

      // Game ID style: 8-char hex prefix of UUID (e.g. "08D52637" → "08d52637-...")
      // ilike matches case-insensitively so "08D52637%" matches "08d52637-..."
      if (/^[0-9a-fA-F]{8}$/.test(ref)) {
        const { data } = await supabaseAdmin
          .from("users")
          .select("id")
          .ilike("id", ref + "%")
          .single()
        referrer = data
      }
      // Full UUID fallback
      else if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(ref)) {
        const { data } = await supabaseAdmin
          .from("users").select("id").eq("id", ref).single()
        referrer = data
      }
      // Legacy username fallback (old links still work)
      else {
        const { data } = await supabaseAdmin
          .from("users").select("id").eq("username", ref.toUpperCase()).single()
        referrer = data
      }

      if (referrer && referrer.id !== userId) {
        const { data: ancestors } = await supabaseAdmin
          .from("affiliate_tree")
          .select("ancestor_id, level")
          .eq("descendant_id", referrer.id)
          .neq("level", 0)

        const treeInserts: any[] = [
          { ancestor_id: userId, descendant_id: userId, level: 0 },
          { ancestor_id: referrer.id, descendant_id: userId, level: 1 },
        ]
        if (ancestors) {
          for (const a of ancestors) {
            if (a.ancestor_id !== userId) {
              treeInserts.push({ ancestor_id: a.ancestor_id, descendant_id: userId, level: a.level + 1 })
            }
          }
        }
        await supabaseAdmin.from("affiliate_tree").insert(treeInserts)
      } else {
        await supabaseAdmin.from("affiliate_tree").insert(
          { ancestor_id: userId, descendant_id: userId, level: 0 }
        )
      }
    } else {
      await supabaseAdmin.from("affiliate_tree").insert(
        { ancestor_id: userId, descendant_id: userId, level: 0 }
      )
    }

    return new Response(JSON.stringify({ success: true, userId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200
    })

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200
    })
  }
})
