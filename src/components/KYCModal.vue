<template>
  <Teleport to="body">
    <Transition name="kyc-slide">
      <div v-if="visible" class="kyc-root">
        <header class="kyc-header">
          <button @click="close" class="kyc-back">
            <svg width="18" height="18" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <span class="kyc-title">KYC အတည်ပြုချက်</span>
          <div style="width:32px;"></div>
        </header>

        <div class="kyc-body">
          <div v-if="status === 'verified'" class="kyc-verified-card">
            <div class="kyc-check-circle">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="kyc-verified-title">အတည်ပြုပြီး ✓</div>
            <div class="kyc-verified-sub">သင်၏ KYC အောင်မြင်ပြီး ငွေထုတ်ပမာဏ limit မရှိတော့ပါ</div>
          </div>

          <div v-else-if="status === 'pending'" class="kyc-pending-card">
            <div class="kyc-clock-icon">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="#fbbf24" stroke-width="2"/><path d="M12 7v5l3 3" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/></svg>
            </div>
            <div class="kyc-pending-title">စစ်ဆေးနေဆဲ ⏳</div>
            <div class="kyc-pending-sub">admin မှ ၂၄ နာရီအတွင်း စစ်ဆေးပါမည်</div>
          </div>

          <div v-else>
            <div class="kyc-info-box">
              <div class="kyc-info-icon">💎</div>
              <div>
                <div class="kyc-info-title">KYC ဘာကြောင့် လိုအပ်လဲ?</div>
                <div class="kyc-info-desc">• ငွေထုတ် limit မရှိ<br>• Security တိုးမြင့်<br>• Bonus အပို ရနိုင်</div>
              </div>
            </div>

            <div class="kyc-form">
              <div class="kyc-field-group">
                <label class="kyc-label">အမည် (NRC ပါ အတိုင်း)</label>
                <input v-model="fullName" class="kyc-input" placeholder="မင်းကိုကိုနိုင်" />
              </div>
              <div class="kyc-field-group">
                <label class="kyc-label">NRC နံပါတ်</label>
                <input v-model="nrcNumber" class="kyc-input" placeholder="12/LAKANA(N)123456" />
              </div>
              <div class="kyc-field-group">
                <label class="kyc-label">NRC ရှေ့ဖက် ဓာတ်ပုံ</label>
                <div class="kyc-upload-area" @click="triggerUpload('front')">
                  <img v-if="frontPreview" :src="frontPreview" class="kyc-preview-img" />
                  <div v-else class="kyc-upload-placeholder">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <span>ထည့်ရန် နှိပ်ပါ</span>
                  </div>
                </div>
                <input ref="frontInput" type="file" accept="image/*" capture="environment" @change="onFrontChange" style="display:none;" />
              </div>
              <div class="kyc-field-group">
                <label class="kyc-label">NRC နောက်ဖက် ဓာတ်ပုံ</label>
                <div class="kyc-upload-area" @click="triggerUpload('back')">
                  <img v-if="backPreview" :src="backPreview" class="kyc-preview-img" />
                  <div v-else class="kyc-upload-placeholder">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <span>ထည့်ရန် နှိပ်ပါ</span>
                  </div>
                </div>
                <input ref="backInput" type="file" accept="image/*" capture="environment" @change="onBackChange" style="display:none;" />
              </div>

              <p v-if="errMsg" class="kyc-err">{{ errMsg }}</p>
              <p v-if="successMsg" class="kyc-success">{{ successMsg }}</p>

              <button @click="submitKyc" :disabled="submitting" class="kyc-submit-btn">
                <span v-if="submitting" class="kyc-spinner"></span>
                {{ submitting ? 'တင်နေသည်...' : 'KYC တင်ရန်' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])

const visible = ref(props.modelValue)
import { watch } from 'vue'
watch(() => props.modelValue, v => { visible.value = v })
watch(visible, v => emit('update:modelValue', v))

function close() { visible.value = false }

const status    = ref('none')
const fullName  = ref('')
const nrcNumber = ref('')
const frontFile = ref(null)
const backFile  = ref(null)
const frontPreview = ref('')
const backPreview  = ref('')
const frontInput = ref(null)
const backInput  = ref(null)
const submitting = ref(false)
const errMsg     = ref('')
const successMsg = ref('')

function triggerUpload(side) {
  if (side === 'front') frontInput.value?.click()
  else backInput.value?.click()
}
function onFrontChange(e) {
  const f = e.target.files[0]; if (!f) return
  frontFile.value = f
  frontPreview.value = URL.createObjectURL(f)
}
function onBackChange(e) {
  const f = e.target.files[0]; if (!f) return
  backFile.value = f
  backPreview.value = URL.createObjectURL(f)
}

async function toBase64(file) {
  return new Promise((res) => {
    const r = new FileReader()
    r.onload = e => res(e.target.result)
    r.readAsDataURL(file)
  })
}

async function submitKyc() {
  errMsg.value = ''; successMsg.value = ''
  if (!fullName.value || !nrcNumber.value) { errMsg.value = 'အချက်အလက်များ ဖြည့်ပါ'; return }
  if (!frontFile.value || !backFile.value) { errMsg.value = 'ဓာတ်ပုံ ၂ ပုံ လိုအပ်သည်'; return }
  submitting.value = true
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { errMsg.value = 'ဝင်ရောက်ပါ'; return }
    const frontB64 = await toBase64(frontFile.value)
    const backB64  = await toBase64(backFile.value)
    const { error } = await supabase.from('kyc_submissions').upsert({
      user_id: session.user.id,
      full_name: fullName.value,
      nrc_number: nrcNumber.value,
      front_image: frontB64,
      back_image: backB64,
      status: 'pending',
      submitted_at: new Date().toISOString()
    }, { onConflict: 'user_id' })
    if (error) throw error
    status.value = 'pending'
    successMsg.value = 'KYC တင်ပြီး ၂၄ နာရီအတွင်း စစ်ဆေးပါမည်'
  } catch (e) {
    errMsg.value = e.message || 'Error — ထပ်ကြိုးစားပါ'
  } finally {
    submitting.value = false
  }
}

async function loadStatus() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return
  const { data } = await supabase.from('kyc_submissions').select('status').eq('user_id', session.user.id).single()
  if (data) status.value = data.status
}

onMounted(loadStatus)
</script>

<style scoped>
.kyc-root { position: fixed; inset: 0; z-index: 1100; background: #07091b; display: flex; flex-direction: column; overflow: hidden; }
.kyc-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.07); }
.kyc-back { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.kyc-title { font-size: 15px; font-weight: 800; color: #fff; }
.kyc-body { flex: 1; overflow-y: auto; padding: 16px 14px 80px; }
.kyc-verified-card, .kyc-pending-card {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  padding: 40px 20px; text-align: center;
}
.kyc-check-circle {
  width: 64px; height: 64px; border-radius: 50%;
  background: rgba(74,222,128,0.15); border: 2px solid rgba(74,222,128,0.4);
  display: flex; align-items: center; justify-content: center;
}
.kyc-clock-icon {
  width: 64px; height: 64px; border-radius: 50%;
  background: rgba(251,191,36,0.15); border: 2px solid rgba(251,191,36,0.4);
  display: flex; align-items: center; justify-content: center;
}
.kyc-verified-title { font-size: 20px; font-weight: 900; color: #4ade80; }
.kyc-pending-title  { font-size: 20px; font-weight: 900; color: #fbbf24; }
.kyc-verified-sub, .kyc-pending-sub { font-size: 12px; color: rgba(255,255,255,0.5); line-height: 1.6; }
.kyc-info-box {
  display: flex; gap: 12px; align-items: flex-start;
  background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.25);
  border-radius: 12px; padding: 14px; margin-bottom: 20px;
}
.kyc-info-icon { font-size: 24px; flex-shrink: 0; }
.kyc-info-title { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 6px; }
.kyc-info-desc { font-size: 11px; color: rgba(255,255,255,0.55); line-height: 1.8; }
.kyc-form { display: flex; flex-direction: column; gap: 16px; }
.kyc-field-group { display: flex; flex-direction: column; gap: 6px; }
.kyc-label { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.7); }
.kyc-input {
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px; padding: 11px 12px; color: #fff; font-size: 13px; outline: none;
}
.kyc-input:focus { border-color: rgba(168,85,247,0.5); }
.kyc-upload-area {
  border: 2px dashed rgba(255,255,255,0.15); border-radius: 12px;
  min-height: 100px; cursor: pointer; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  transition: border-color 0.2s;
}
.kyc-upload-area:active { border-color: rgba(168,85,247,0.5); }
.kyc-upload-placeholder { display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 11px; color: rgba(255,255,255,0.3); }
.kyc-preview-img { width: 100%; height: 140px; object-fit: cover; display: block; }
.kyc-err     { font-size: 11px; color: #f87171; text-align: center; }
.kyc-success { font-size: 11px; color: #4ade80; text-align: center; }
.kyc-submit-btn {
  width: 100%; height: 48px; border-radius: 12px;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border: none; color: #fff; font-size: 14px; font-weight: 800;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
}
.kyc-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.kyc-spinner {
  width: 16px; height: 16px; border-radius: 50%;
  border: 2.5px solid rgba(255,255,255,0.3); border-top-color: #fff;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.kyc-slide-enter-active { animation: slideIn 0.3s cubic-bezier(0.22,1,0.36,1); }
.kyc-slide-leave-active { animation: slideIn 0.2s ease-in reverse; }
@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
</style>
