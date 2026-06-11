<template>
  <div class="a-tab-content">

    <!-- Filter Bar -->
    <div class="a-filter-bar" style="flex-wrap:wrap;gap:6px;">
      <select v-model="txFilter.status" class="a-select">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="rejected">Rejected</option>
      </select>
      <select v-model="txFilter.type" class="a-select">
        <option value="">All Types</option>
        <option value="deposit">Deposit</option>
        <option value="withdraw">Withdraw</option>
      </select>
      <input v-model="txSearch" class="a-input a-srch" placeholder="Search user/phone..." style="flex:1;min-width:100px;" />
      <button @click="fetchTx" class="a-btn-primary a-btn-sm-p">Search</button>
    </div>

    <!-- Bulk Action Bar -->
    <Transition name="bulk-slide">
      <div v-if="selectedIds.size > 0" class="bulk-bar">
        <span class="bulk-count">{{ selectedIds.size }} selected</span>
        <button @click="bulkAction('approve')" :disabled="bulkLoading" class="a-btn-sm a-btn-success">
          <span v-if="bulkLoading === 'approve'" class="a-spinner-sm"></span>
          ✓ Approve All
        </button>
        <button @click="bulkAction('reject')" :disabled="!!bulkLoading" class="a-btn-sm a-btn-danger">
          <span v-if="bulkLoading === 'reject'" class="a-spinner-sm"></span>
          ✗ Reject All
        </button>
        <button @click="clearSelection" class="a-btn-sm a-btn-ghost">✕</button>
      </div>
    </Transition>

    <!-- Select All + Live indicator -->
    <div v-if="!txLoading && pendingList.length > 0" class="sel-all-row">
      <label class="sel-all-label">
        <input type="checkbox" :checked="allPendingSelected" @change="toggleSelectAll" class="sel-cb" />
        Select all pending ({{ pendingList.length }})
      </label>
      <span class="rt-indicator" :class="rtLive ? 'rt-live' : 'rt-poll'">
        <span class="rt-dot"></span>
        {{ rtLive ? 'Live' : 'Polling' }}
      </span>
    </div>

    <!-- Loading / Error -->
    <div v-if="txLoading" class="a-loading"><span class="a-spinner"></span></div>
    <div v-else-if="txErr" class="a-err">{{ txErr }}</div>

    <!-- TX List -->
    <div v-else>
      <div
        v-for="tx in filteredList"
        :key="tx.id"
        class="a-tx-row"
        :class="[selectedIds.has(tx.id) ? 'tx-sel' : '', isFlagged(tx) ? 'tx-flagged' : '']"
      >
        <!-- Checkbox -->
        <div class="tx-cb-col">
          <input v-if="tx.status==='pending'" type="checkbox" :checked="selectedIds.has(tx.id)" @change="toggleOne(tx.id)" class="sel-cb" />
          <div v-else class="tx-cb-ph"></div>
        </div>

        <!-- Info -->
        <div style="flex:1;min-width:0;">
          <div class="a-tx-top">
            <span class="a-io-badge" :class="tx.type==='deposit'?'badge-in':'badge-out'">{{ tx.type==='deposit'?'IN':'OUT' }}</span>
            <span class="a-tx-amt">{{ Number(tx.amount).toLocaleString() }} Ks</span>
            <span class="a-sbadge" :class="`sb-${tx.status}`">{{ tx.status }}</span>
            <span v-if="isFlagged(tx)" class="risk-chip">⚠ Risk</span>
          </div>
          <div class="a-tx-meta">
            <span class="tx-user">{{ tx.username || tx.user_id?.slice(0,8) }}</span>
            <span class="tx-method">{{ tx.method }}</span>
            <span>{{ tx.slip_last5 || tx.phone || '—' }}</span>
            <span>{{ fmtDate(tx.created_at) }}</span>
          </div>
          <div v-if="tx.reject_reason" class="tx-reject-note">❌ {{ tx.reject_reason }}</div>
        </div>

        <!-- Actions -->
        <div class="a-tx-actions">
          <template v-if="tx.status==='pending'">
            <button @click="openApproveModal(tx)" :disabled="!!actionBusy[tx.id]" class="a-btn-sm a-btn-success">
              <span v-if="actionBusy[tx.id]==='approve'" class="a-spinner-sm"></span>
              <template v-else>✓</template>
            </button>
            <button @click="openRejectModal(tx)" class="a-btn-sm a-btn-danger">✗</button>
          </template>
          <button @click="openDetail(tx)" class="a-btn-sm a-btn-ghost">
            <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
          </button>
        </div>
      </div>

      <div v-if="!filteredList.length" class="a-empty">No transactions found</div>
    </div>

    <!-- ════════════════════════════════════════
         APPROVE MODAL (Quick ✓ button)
         Different UI for deposit vs withdraw
         ════════════════════════════════════════ -->
    <Teleport to="body">
      <div v-if="approveModal.open" class="tx-overlay" @click.self="approveModal.open=false">
        <div class="tx-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
            <h3 class="tx-card-title" style="margin:0;">
              {{ approveModal.tx?.type === 'deposit' ? '💰 Approve Deposit' : '💸 Approve Withdrawal' }}
            </h3>
            <button @click="approveModal.open=false" class="a-btn-sm a-btn-ghost" style="padding:2px 7px;">✕</button>
          </div>

          <!-- ── DEPOSIT view ── -->
          <template v-if="approveModal.tx?.type === 'deposit'">
            <!-- Requested amount banner -->
            <div class="approve-req-banner approve-req-banner--deposit">
              <div class="approve-req-label">User Requested</div>
              <div class="approve-req-amt">{{ Number(approveModal.tx?.amount).toLocaleString() }} Ks</div>
              <div class="approve-req-meta">
                <span class="tx-method" style="font-size:9px;">{{ approveModal.tx?.method }}</span>
                <span style="font-size:10px;color:#64748b;">{{ approveModal.tx?.username }}</span>
                <span v-if="approveModal.tx?.slip_last5" style="font-size:10px;color:#94a3b8;">Slip#{{ approveModal.tx.slip_last5 }}</span>
              </div>
            </div>

            <!-- Actual amount input -->
            <div class="approve-actual-section">
              <label class="approve-actual-label">
                <svg width="12" height="12" fill="none" stroke="#f59e0b" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Actual Amount Received (Ks)
              </label>
              <div class="approve-amt-wrap">
                <span class="approve-k-prefix">K</span>
                <input
                  v-model.number="approveModal.actualAmount"
                  type="number" inputmode="numeric"
                  class="approve-amt-input"
                  placeholder="Enter actual received..."
                  min="1" ref="approveAmtRef"
                />
              </div>
              <div v-if="approveModal.actualAmount && approveModal.actualAmount !== Number(approveModal.tx?.amount)" class="approve-diff-note">
                <svg width="11" height="11" fill="none" stroke="#f59e0b" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01"/><circle cx="12" cy="12" r="9"/></svg>
                Request {{ Number(approveModal.tx?.amount).toLocaleString() }} → Approve
                <strong style="color:#0891b2;">{{ Number(approveModal.actualAmount).toLocaleString() }} Ks</strong>
              </div>
              <div v-else-if="approveModal.actualAmount" class="approve-match-note">
                <svg width="11" height="11" fill="none" stroke="#16a34a" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                Matches requested amount
              </div>
            </div>
          </template>

          <!-- ── WITHDRAW view ── -->
          <template v-else>
            <!-- Balance preview card -->
            <div class="wd-preview-card">
              <div v-if="approveModal.balanceLoading" class="wd-balance-loading">
                <span class="a-spinner-sm" style="border-color:#0891b2;border-top-color:transparent;"></span>
                Loading balance...
              </div>
              <template v-else>
                <div class="wd-preview-row">
                  <span class="wd-preview-label">User</span>
                  <span class="wd-preview-val">{{ approveModal.tx?.username }}</span>
                </div>
                <div class="wd-preview-row">
                  <span class="wd-preview-label">Send To</span>
                  <span class="wd-preview-val" style="font-family:monospace;">{{ approveModal.tx?.phone || '—' }}</span>
                </div>
                <div class="wd-preview-row">
                  <span class="wd-preview-label">Method</span>
                  <span class="tx-method" style="font-size:9px;">{{ approveModal.tx?.method }}</span>
                </div>
                <div class="wd-preview-divider"></div>
                <div class="wd-preview-row">
                  <span class="wd-preview-label">Current Balance</span>
                  <span class="wd-preview-val wd-preview-val--bal">{{ Number(approveModal.userBalance).toLocaleString() }} Ks</span>
                </div>
                <div class="wd-preview-row">
                  <span class="wd-preview-label">Withdraw Request</span>
                  <span class="wd-preview-val wd-preview-val--out">− {{ Number(approveModal.tx?.amount).toLocaleString() }} Ks</span>
                </div>
                <div class="wd-preview-row wd-preview-row--result" :class="approveModal.afterBalance < 0 ? 'wd-preview-row--danger' : 'wd-preview-row--ok'">
                  <span class="wd-preview-label">After Approval</span>
                  <span class="wd-preview-val wd-preview-val--after">{{ Number(Math.max(0, approveModal.afterBalance)).toLocaleString() }} Ks</span>
                </div>
                <div v-if="approveModal.afterBalance < 0" class="wd-insufficient-warn">
                  ⚠️ Balance insufficient — user has {{ Number(approveModal.userBalance).toLocaleString() }} Ks but requests {{ Number(approveModal.tx?.amount).toLocaleString() }} Ks
                </div>
              </template>
            </div>

            <!-- Actual amount to send -->
            <div class="approve-actual-section" style="margin-top:10px;">
              <label class="approve-actual-label" style="color:#1e40af;">
                <svg width="12" height="12" fill="none" stroke="#3b82f6" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Amount to Send Out (Ks)
              </label>
              <div class="approve-amt-wrap" style="border-color:#93c5fd;">
                <span class="approve-k-prefix" style="background:#eff6ff;color:#2563eb;border-color:#bfdbfe;">K</span>
                <input
                  v-model.number="approveModal.actualAmount"
                  type="number" inputmode="numeric"
                  class="approve-amt-input"
                  placeholder="Amount to send..."
                  min="1"
                />
              </div>
              <div v-if="approveModal.actualAmount && approveModal.actualAmount !== Number(approveModal.tx?.amount)" class="approve-diff-note" style="background:#eff6ff;color:#1e40af;">
                <svg width="11" height="11" fill="none" stroke="#3b82f6" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01"/><circle cx="12" cy="12" r="9"/></svg>
                Will deduct <strong style="color:#dc2626;">{{ Number(approveModal.actualAmount).toLocaleString() }} Ks</strong> from balance
              </div>
            </div>
          </template>

          <div style="display:flex;gap:8px;margin-top:12px;">
            <button @click="approveModal.open=false" class="a-btn-sm a-btn-ghost" style="flex:1;">Cancel</button>
            <button
              @click="confirmApprove"
              :disabled="approveModal.busy || !approveModal.actualAmount || approveModal.actualAmount < 1"
              class="a-btn-sm a-btn-success"
              style="flex:2;"
            >
              <span v-if="approveModal.busy" class="a-spinner-sm"></span>
              <template v-else>
                {{ approveModal.tx?.type === 'deposit' ? '✓ Deposit' : '✓ Send Out' }}
                {{ Number(approveModal.actualAmount || 0).toLocaleString() }} Ks
              </template>
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Reject Modal -->
    <Teleport to="body">
      <div v-if="rejectModal.open" class="tx-overlay" @click.self="rejectModal.open=false">
        <div class="tx-card">
          <h3 class="tx-card-title">Reject Transaction</h3>
          <p class="tx-card-sub">{{ rejectModal.tx?.username }} · {{ Number(rejectModal.tx?.amount).toLocaleString() }} Ks</p>
          <label class="a-mini-label">Reason</label>
          <select v-model="rejectModal.reason" class="a-select" style="width:100%;margin-bottom:8px;">
            <option value="">Select reason...</option>
            <option>Wrong slip number</option>
            <option>Amount mismatch</option>
            <option>Duplicate request</option>
            <option>Suspicious activity</option>
            <option>Account not verified</option>
            <option>Insufficient balance</option>
          </select>
          <textarea v-model="rejectModal.note" class="a-input a-textarea" rows="2" placeholder="Note..." style="margin-bottom:10px;"></textarea>
          <div style="display:flex;gap:8px;">
            <button @click="rejectModal.open=false" class="a-btn-sm a-btn-ghost" style="flex:1;">Cancel</button>
            <button @click="confirmReject" :disabled="rejectModal.busy" class="a-btn-sm a-btn-danger" style="flex:2;">
              <span v-if="rejectModal.busy" class="a-spinner-sm"></span>
              Confirm Reject
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ════════════════════════════════════════
         DETAIL MODAL (🔍 button)
         Full detail + type-aware action section
         ════════════════════════════════════════ -->
    <Teleport to="body">
      <div v-if="detail.open" class="tx-overlay" @click.self="detail.open=false">
        <div class="tx-card tx-card--wide">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <h3 class="tx-card-title" style="margin:0;">Transaction Detail</h3>
            <button @click="detail.open=false" class="a-btn-sm a-btn-ghost">✕</button>
          </div>

          <!-- Common detail rows -->
          <div class="detail-grid">
            <div class="detail-row"><span class="dl">ID</span><span class="dv mono">{{ detail.tx?.id?.slice(0,20) }}...</span></div>
            <div class="detail-row">
              <span class="dl">Type</span>
              <span class="dv" :style="detail.tx?.type==='deposit'?'color:#16a34a;font-weight:800;':'color:#dc2626;font-weight:800;'">
                {{ detail.tx?.type === 'deposit' ? '↓ Deposit' : '↑ Withdraw' }}
              </span>
            </div>
            <div class="detail-row">
              <span class="dl">Amount</span>
              <span class="dv" :style="detail.tx?.type==='deposit'?'color:#16a34a;font-size:15px;font-weight:900;':'color:#dc2626;font-size:15px;font-weight:900;'">
                {{ detail.tx?.type === 'deposit' ? '+' : '−' }}{{ Number(detail.tx?.amount).toLocaleString() }} Ks
              </span>
            </div>
            <div class="detail-row"><span class="dl">Status</span><span class="a-sbadge" :class="`sb-${detail.tx?.status}`">{{ detail.tx?.status }}</span></div>
            <div class="detail-row"><span class="dl">Method</span><span class="dv">{{ detail.tx?.method }}</span></div>
            <div class="detail-row"><span class="dl">User</span><span class="dv">{{ detail.tx?.username || detail.tx?.user_id?.slice(0,14) }}</span></div>
            <div class="detail-row"><span class="dl">{{ detail.tx?.type==='deposit' ? 'Slip #' : 'Send To' }}</span>
              <span class="dv mono">{{ detail.tx?.type==='deposit' ? (detail.tx?.slip_last5 || '—') : (detail.tx?.phone || '—') }}</span>
            </div>
            <div v-if="detail.tx?.type==='deposit'" class="detail-row"><span class="dl">Bonus</span><span class="dv">{{ detail.tx?.bonus_option || 'none' }}</span></div>
            <div class="detail-row"><span class="dl">Date</span><span class="dv">{{ fmtDate(detail.tx?.created_at) }}</span></div>
            <div v-if="detail.tx?.reject_reason" class="detail-row"><span class="dl">Reject</span><span class="dv" style="color:#dc2626;">{{ detail.tx.reject_reason }}</span></div>
          </div>

          <!-- Slip Image (Deposit only) -->
          <div v-if="detail.tx?.type==='deposit' && (detail.tx?.slip_url || detail.tx?.screenshot_url)" class="slip-img-section">
            <div class="slip-img-label">📎 Slip Image</div>
            <div class="slip-img-grid">
              <div v-if="detail.tx?.slip_url" class="slip-img-wrap" @click="slipLightbox.url=detail.tx.slip_url;slipLightbox.open=true">
                <img :src="detail.tx.slip_url" alt="Slip" class="slip-doc-img" @error="e=>e.target.style.display='none'" />
                <span class="slip-img-tag">Slip</span>
              </div>
              <div v-if="detail.tx?.screenshot_url" class="slip-img-wrap" @click="slipLightbox.url=detail.tx.screenshot_url;slipLightbox.open=true">
                <img :src="detail.tx.screenshot_url" alt="Screenshot" class="slip-doc-img" @error="e=>e.target.style.display='none'" />
                <span class="slip-img-tag">Screenshot</span>
              </div>
            </div>
          </div>

          <!-- ── PENDING ACTION SECTION ── -->
          <div v-if="detail.tx?.status==='pending'" class="detail-approve-section">

            <!-- ═══ DEPOSIT PENDING ═══ -->
            <template v-if="detail.tx?.type==='deposit'">
              <div class="detail-approve-title" style="color:#166534;">
                <svg width="13" height="13" fill="none" stroke="#16a34a" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                Actual Amount Received
              </div>
              <div class="approve-amt-wrap" style="margin-top:6px;">
                <span class="approve-k-prefix">K</span>
                <input
                  v-model.number="detail.actualAmount"
                  type="number" inputmode="numeric"
                  class="approve-amt-input"
                  :placeholder="`Default: ${Number(detail.tx?.amount).toLocaleString()}`"
                  min="1"
                />
              </div>
              <div v-if="detail.actualAmount && detail.actualAmount !== Number(detail.tx?.amount)" class="approve-diff-note" style="margin-top:5px;">
                <svg width="11" height="11" fill="none" stroke="#f59e0b" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01"/><circle cx="12" cy="12" r="9"/></svg>
                Will credit <strong style="color:#16a34a;">{{ Number(detail.actualAmount).toLocaleString() }} Ks</strong>
                (not {{ Number(detail.tx?.amount).toLocaleString() }} Ks)
              </div>
            </template>

            <!-- ═══ WITHDRAW PENDING ═══ -->
            <template v-else>
              <div class="detail-approve-title" style="color:#991b1b;">
                <svg width="13" height="13" fill="none" stroke="#dc2626" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                Withdrawal Details
              </div>

              <!-- Balance preview for withdraw -->
              <div v-if="detail.balanceLoading" class="wd-balance-loading" style="margin-top:8px;">
                <span class="a-spinner-sm" style="border-color:#dc2626;border-top-color:transparent;"></span>
                Loading user balance...
              </div>
              <div v-else class="wd-detail-balance-card">
                <div class="wd-bal-row">
                  <span class="wd-bal-label">Current Balance</span>
                  <span class="wd-bal-val">{{ Number(detail.userBalance).toLocaleString() }} Ks</span>
                </div>
                <div class="wd-bal-row wd-bal-row--deduct">
                  <span class="wd-bal-label">Withdraw Request</span>
                  <span class="wd-bal-val wd-bal-val--out">− {{ Number(detail.actualAmount || detail.tx?.amount).toLocaleString() }} Ks</span>
                </div>
                <div class="wd-bal-divider"></div>
                <div class="wd-bal-row wd-bal-row--result" :class="(detail.userBalance - (detail.actualAmount || Number(detail.tx?.amount))) < 0 ? 'wd-bal-row--danger' : ''">
                  <span class="wd-bal-label">Balance After</span>
                  <span class="wd-bal-val wd-bal-val--after">
                    {{ Number(Math.max(0, detail.userBalance - (detail.actualAmount || Number(detail.tx?.amount)))).toLocaleString() }} Ks
                  </span>
                </div>
                <div v-if="(detail.userBalance - (detail.actualAmount || Number(detail.tx?.amount))) < 0" class="wd-insufficient-warn">
                  ⚠️ Insufficient — balance {{ Number(detail.userBalance).toLocaleString() }} Ks &lt; request {{ Number(detail.actualAmount || detail.tx?.amount).toLocaleString() }} Ks
                </div>
                <!-- Send to info -->
                <div class="wd-sendto-row">
                  <svg width="11" height="11" fill="none" stroke="#64748b" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  Send via <strong>{{ detail.tx?.method }}</strong> to
                  <strong class="wd-phone-val">{{ detail.tx?.phone || '—' }}</strong>
                </div>
              </div>

              <!-- Override amount input for withdraw -->
              <div class="approve-amt-wrap" style="margin-top:8px;border-color:#fca5a5;">
                <span class="approve-k-prefix" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5;">K</span>
                <input
                  v-model.number="detail.actualAmount"
                  type="number" inputmode="numeric"
                  class="approve-amt-input"
                  :placeholder="`Amount to send: ${Number(detail.tx?.amount).toLocaleString()}`"
                  min="1"
                />
              </div>
              <div class="approve-diff-note" style="background:#fef2f2;color:#991b1b;margin-top:4px;" v-if="detail.actualAmount && detail.actualAmount !== Number(detail.tx?.amount)">
                <svg width="11" height="11" fill="none" stroke="#dc2626" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01"/><circle cx="12" cy="12" r="9"/></svg>
                Will deduct <strong style="color:#dc2626;">{{ Number(detail.actualAmount).toLocaleString() }} Ks</strong> (not {{ Number(detail.tx?.amount).toLocaleString() }} Ks)
              </div>
            </template>

            <!-- Approve / Reject buttons -->
            <div style="display:flex;gap:8px;margin-top:10px;">
              <button
                @click="detailApprove"
                :disabled="!!detailBusy"
                class="a-btn-sm a-btn-success"
                style="flex:1;"
              >
                <span v-if="detailBusy === 'approve'" class="a-spinner-sm"></span>
                <template v-else>
                  {{ detail.tx?.type === 'deposit' ? '✓ Approve' : '✓ Send Out' }}
                  {{ Number(detail.actualAmount || detail.tx?.amount).toLocaleString() }} Ks
                </template>
              </button>
              <button
                @click="openRejectModal(detail.tx); detail.open=false"
                :disabled="!!detailBusy"
                class="a-btn-sm a-btn-danger"
                style="flex:1;"
              >✗ Reject</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Slip Lightbox -->
    <Teleport to="body">
      <Transition name="bulk-slide">
        <div v-if="slipLightbox.open" class="slip-lightbox" @click="slipLightbox.open=false">
          <img :src="slipLightbox.url" class="slip-lightbox-img" @click.stop />
          <button @click="slipLightbox.open=false" class="slip-lightbox-close">✕</button>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive, nextTick } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { supabase } from '@/supabase'

const { txFilter, txList, txLoading, txErr, fmtDate, fetchTx, doApprove, writeAudit, showToast } = useAdmin()

const txSearch     = ref('')
const bulkLoading  = ref('')
const rtLive       = ref(false)
const actionBusy   = reactive({})
const selectedIds  = ref(new Set())
const approveAmtRef = ref(null)
let rtSub = null

const pendingList = computed(() => txList.value.filter(t => t.status === 'pending'))

const filteredList = computed(() => {
  const q = txSearch.value.toLowerCase()
  return txList.value.filter(t =>
    !q || (t.username||'').toLowerCase().includes(q) ||
    (t.phone||'').includes(q) || (t.user_id||'').includes(q)
  )
})

const allPendingSelected = computed(() =>
  pendingList.value.length > 0 && pendingList.value.every(t => selectedIds.value.has(t.id))
)

function isFlagged(tx) { return Number(tx.amount) >= 500000 }

function toggleSelectAll() {
  const s = new Set(selectedIds.value)
  if (allPendingSelected.value) { pendingList.value.forEach(t => s.delete(t.id)) }
  else { pendingList.value.forEach(t => s.add(t.id)) }
  selectedIds.value = s
}
function toggleOne(id) {
  const s = new Set(selectedIds.value)
  s.has(id) ? s.delete(id) : s.add(id)
  selectedIds.value = s
}
function clearSelection() { selectedIds.value = new Set() }

// ── Fetch user wallet balance ──────────────────────────────────────────────────
async function fetchUserBalance(userId) {
  if (!userId) return 0
  try {
    const { data } = await supabase
      .from('wallets')
      .select('main_balance')
      .eq('user_id', userId)
      .maybeSingle()
    return Number(data?.main_balance) || 0
  } catch { return 0 }
}

// ── Approve Modal ─────────────────────────────────────────────────────────────
const approveModal = reactive({
  open: false, tx: null, actualAmount: 0, busy: false,
  userBalance: 0, balanceLoading: false,
  get afterBalance() { return this.userBalance - (this.actualAmount || Number(this.tx?.amount) || 0) }
})

async function openApproveModal(tx) {
  Object.assign(approveModal, {
    open: true, tx,
    actualAmount: Number(tx.amount) || 0,
    busy: false, userBalance: 0, balanceLoading: tx.type === 'withdraw'
  })
  nextTick(() => approveAmtRef.value?.focus())

  if (tx.type === 'withdraw' && tx.user_id) {
    approveModal.userBalance = await fetchUserBalance(tx.user_id)
    approveModal.balanceLoading = false
  }
}

async function confirmApprove() {
  if (!approveModal.actualAmount || approveModal.actualAmount < 1) return
  approveModal.busy = true
  actionBusy[approveModal.tx.id] = 'approve'
  try {
    await doApprove(approveModal.tx.id, 'approve', approveModal.actualAmount)
    approveModal.open = false
  } finally {
    approveModal.busy = false
    delete actionBusy[approveModal.tx.id]
  }
}

async function bulkAction(action) {
  bulkLoading.value = action
  try {
    const ids = [...selectedIds.value]
    await Promise.all(ids.map(id => doApprove(id, action)))
    await writeAudit(`BULK_${action.toUpperCase()}`, ids.join(','), `${ids.length} TX`)
    clearSelection()
    showToast(`Bulk ${action} done (${ids.length})`, 'success')
  } finally { bulkLoading.value = '' }
}

// ── Reject Modal ──────────────────────────────────────────────────────────────
const rejectModal = reactive({ open: false, tx: null, reason: '', note: '', busy: false })
function openRejectModal(tx) { Object.assign(rejectModal, { open: true, tx, reason: '', note: '', busy: false }) }
async function confirmReject() {
  rejectModal.busy = true
  try {
    await doApprove(rejectModal.tx.id, 'reject')
    await writeAudit('REJECT_TX', rejectModal.tx.id, rejectModal.reason)
    rejectModal.open = false
  } finally { rejectModal.busy = false }
}

// ── Detail Modal ──────────────────────────────────────────────────────────────
const detail = reactive({
  open: false, tx: null, actualAmount: null,
  userBalance: 0, balanceLoading: false
})
const detailBusy   = ref('')
const slipLightbox = reactive({ open: false, url: '' })

async function openDetail(tx) {
  Object.assign(detail, {
    open: true, tx,
    actualAmount: Number(tx.amount) || 0,
    userBalance: 0,
    balanceLoading: tx.type === 'withdraw' && tx.status === 'pending'
  })

  if (tx.type === 'withdraw' && tx.status === 'pending' && tx.user_id) {
    detail.userBalance = await fetchUserBalance(tx.user_id)
    detail.balanceLoading = false
  }
}

async function detailApprove() {
  if (!detail.tx) return
  detailBusy.value = 'approve'
  const amt = detail.actualAmount && detail.actualAmount > 0
    ? detail.actualAmount
    : Number(detail.tx.amount)
  try {
    await doApprove(detail.tx.id, 'approve', amt)
    detail.open = false
  } finally { detailBusy.value = '' }
}

function setupRealtime() {
  rtSub = supabase.channel('admin-tx')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, () => { fetchTx() })
    .subscribe(s => { rtLive.value = s === 'SUBSCRIBED' })
}

onMounted(() => { fetchTx(); setupRealtime() })
onUnmounted(() => { if (rtSub) supabase.removeChannel(rtSub) })
</script>

<style scoped>
.bulk-bar { display:flex;align-items:center;gap:8px;background:rgba(79,70,229,.08);border:1px solid rgba(79,70,229,.2);border-radius:8px;padding:8px 12px;margin-bottom:8px; }
.bulk-count { font-size:11px;font-weight:700;color:#4f46e5;flex:1; }
.bulk-slide-enter-active,.bulk-slide-leave-active { transition:all .2s; }
.bulk-slide-enter-from,.bulk-slide-leave-to { opacity:0;transform:translateY(-6px); }
.sel-all-row { display:flex;align-items:center;justify-content:space-between;padding:6px 2px;margin-bottom:6px; }
.sel-all-label { display:flex;align-items:center;gap:6px;font-size:11px;color:#64748b;cursor:pointer; }
.sel-cb { width:14px;height:14px;accent-color:#4f46e5;cursor:pointer; }
.rt-indicator { display:flex;align-items:center;gap:4px;font-size:10px;font-weight:600; }
.rt-live { color:#16a34a; } .rt-poll { color:#94a3b8; }
.rt-dot { width:7px;height:7px;border-radius:50%;background:currentColor;animation:rtb 1.5s ease-in-out infinite; }
@keyframes rtb { 0%,100%{opacity:1}50%{opacity:.4} }
.tx-cb-col { display:flex;align-items:center;padding-right:8px;flex-shrink:0; }
.tx-cb-ph { width:14px; }
.a-tx-row { display:flex;align-items:flex-start;gap:4px;padding:8px 6px;border-radius:8px;border-bottom:1px solid #f1f5f9; }
.tx-sel { background:rgba(79,70,229,.05); }
.tx-flagged { border-left:3px solid #dc2626; }
.tx-user { font-weight:700;color:#0f172a; }
.tx-method { background:#e0f2fe;color:#0891b2;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:700; }
.risk-chip { background:#fee2e2;color:#dc2626;padding:1px 5px;border-radius:4px;font-size:9px;font-weight:700; }
.tx-reject-note { font-size:9.5px;color:#dc2626;margin-top:2px; }
.tx-overlay { position:fixed;inset:0;z-index:9000;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto; }
.tx-card { background:#fff;border-radius:12px;padding:18px;width:100%;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,.3);max-height:90vh;overflow-y:auto; }
.tx-card--wide { max-width:400px; }
.tx-card-title { font-size:14px;font-weight:800;color:#0f172a;margin:0 0 6px; }
.tx-card-sub { font-size:11px;color:#64748b;margin:0 0 12px; }
.detail-grid { display:flex;flex-direction:column;gap:0; }
.detail-row { display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9; }
.dl { font-size:10px;color:#94a3b8;font-weight:600; }
.dv { font-size:11px;color:#0f172a;font-weight:600; }
.mono { font-family:monospace; }
.slip-img-section { margin-top:10px;padding-top:10px;border-top:1px solid #f1f5f9; }
.slip-img-label { font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:6px; }
.slip-img-grid { display:flex;gap:8px; }
.slip-img-wrap { position:relative;cursor:pointer;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;flex:1;aspect-ratio:4/3;max-width:120px; }
.slip-doc-img { width:100%;height:100%;object-fit:cover; }
.slip-img-tag { position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.5);color:#fff;font-size:9px;font-weight:700;text-align:center;padding:2px; }
.slip-lightbox { position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center; }
.slip-lightbox-img { max-width:90vw;max-height:88vh;object-fit:contain;border-radius:8px; }
.slip-lightbox-close { position:absolute;top:16px;right:16px;background:rgba(255,255,255,.15);border:none;border-radius:50%;width:36px;height:36px;color:#fff;font-size:16px;cursor:pointer; }

/* ── Approve Modal ── */
.approve-req-banner {
  border-radius:8px; padding:10px 12px; margin-bottom:12px;
}
.approve-req-banner--deposit {
  background:linear-gradient(135deg,rgba(22,163,74,.08),rgba(22,163,74,.04));
  border:1px solid rgba(22,163,74,.25);
}
.approve-req-label { font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:2px; }
.approve-req-amt { font-size:18px;font-weight:900;color:#16a34a;margin-bottom:4px; }
.approve-req-meta { display:flex;align-items:center;gap:6px;flex-wrap:wrap; }
.approve-actual-section { background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px 12px; }
.approve-actual-label { display:flex;align-items:center;gap:5px;font-size:10px;font-weight:700;color:#92400e;margin-bottom:6px; }
.approve-amt-wrap { display:flex;align-items:center;background:#fff;border:1.5px solid #fbbf24;border-radius:7px;overflow:hidden; }
.approve-k-prefix { padding:0 8px;font-size:13px;font-weight:800;color:#d97706;background:#fef3c7;border-right:1px solid #fde68a;align-self:stretch;display:flex;align-items:center; }
.approve-amt-input { flex:1;padding:9px 10px;border:none;outline:none;font-size:15px;font-weight:700;color:#0f172a;background:transparent; }
.approve-amt-input::placeholder { color:#cbd5e1;font-weight:400; }
.approve-diff-note { display:flex;align-items:center;gap:4px;margin-top:6px;font-size:10px;color:#92400e;background:#fef9c3;padding:5px 8px;border-radius:5px;flex-wrap:wrap; }
.approve-match-note { display:flex;align-items:center;gap:4px;margin-top:6px;font-size:10px;color:#166534;background:#dcfce7;padding:5px 8px;border-radius:5px; }

/* ── Withdraw preview card ── */
.wd-preview-card {
  background:linear-gradient(135deg,rgba(220,38,38,.05),rgba(220,38,38,.02));
  border:1px solid rgba(220,38,38,.2);
  border-radius:8px; padding:10px 12px; margin-bottom:0;
}
.wd-preview-row { display:flex;align-items:center;justify-content:space-between;padding:4px 0; }
.wd-preview-label { font-size:10px;color:#94a3b8;font-weight:600; }
.wd-preview-val { font-size:11px;color:#0f172a;font-weight:700; }
.wd-preview-val--bal { color:#0891b2;font-size:13px;font-weight:900; }
.wd-preview-val--out { color:#dc2626;font-weight:800; }
.wd-preview-val--after { font-size:14px;font-weight:900; }
.wd-preview-divider { height:1px;background:#fee2e2;margin:6px 0; }
.wd-preview-row--result { padding-top:6px; }
.wd-preview-row--ok .wd-preview-val--after { color:#16a34a; }
.wd-preview-row--danger .wd-preview-val--after { color:#dc2626; }
.wd-insufficient-warn { margin-top:6px;padding:6px 8px;background:#fee2e2;border-radius:5px;font-size:9.5px;color:#991b1b;font-weight:600;line-height:1.4; }
.wd-balance-loading { display:flex;align-items:center;gap:8px;padding:12px;font-size:11px;color:#94a3b8; }

/* ── Detail pending section ── */
.detail-approve-section { margin-top:12px;padding-top:12px;border-top:2px dashed #e2e8f0; }
.detail-approve-title { display:flex;align-items:center;gap:5px;font-size:10px;font-weight:700;text-transform:uppercase;margin-bottom:0; }

/* ── Withdraw balance card in detail ── */
.wd-detail-balance-card { background:#fff5f5;border:1px solid #fca5a5;border-radius:8px;padding:10px 12px;margin-top:8px; }
.wd-bal-row { display:flex;align-items:center;justify-content:space-between;padding:3px 0; }
.wd-bal-label { font-size:10px;color:#94a3b8;font-weight:600; }
.wd-bal-val { font-size:12px;color:#0f172a;font-weight:800; }
.wd-bal-val--out { color:#dc2626; }
.wd-bal-val--after { font-size:13px;font-weight:900; }
.wd-bal-divider { height:1px;background:#fca5a5;margin:5px 0; }
.wd-bal-row--result .wd-bal-val--after { color:#16a34a; }
.wd-bal-row--danger .wd-bal-val--after { color:#dc2626; }
.wd-sendto-row { display:flex;align-items:center;gap:4px;margin-top:8px;padding-top:7px;border-top:1px dashed #fca5a5;font-size:10px;color:#64748b;flex-wrap:wrap; }
.wd-phone-val { color:#0f172a;font-family:monospace;font-size:11px; }
</style>
