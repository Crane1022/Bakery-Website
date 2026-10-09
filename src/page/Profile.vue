<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { User, Package, LogOut, Mail, Cake, VenetianMask, MapPin, Phone, Pencil } from 'lucide-vue-next'
import { useAuth } from '../store/auth'
import { useOrders } from '../store/orders'
import ConfirmModal from '../components/ConfirmModal.vue'

const { currentUser, logout, updateProfile, loading, error: authError } = useAuth()
const { myOrders, ordersLoading, loadMyOrders } = useOrders()
const router = useRouter()

onMounted(loadMyOrders) // fetch this user's orders from the Google Sheet

const activeTab = ref('details') // 'details' | 'history'
const showLogoutConfirm = ref(false)

// ---- Edit profile ----
const editing = ref(false)
const saved = ref(false)
const saveError = ref('')
const form = ref({})

const startEdit = () => {
  const u = currentUser.value
  form.value = {
    name: u.name, phone: u.phone, dob: u.dob, gender: u.gender,
    address: u.address, city: u.city, postcode: u.postcode, state: u.state
  }
  saved.value = false
  saveError.value = ''
  editing.value = true
}

const saveProfile = async () => {
  saveError.value = ''
  const ok = await updateProfile(form.value)
  if (ok) {
    editing.value = false
    saved.value = true
  } else {
    saveError.value = authError.value
  }
}

const requestLogout = () => {
  showLogoutConfirm.value = true
}

const confirmLogout = () => {
  logout()
  showLogoutConfirm.value = false
  router.push('/Bakery-Website/')
}

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
</script>

<template>
  <div class="pt-32 pb-20 px-6 min-h-screen bg-[#FDFCFB]">
    <div class="max-w-4xl mx-auto">

      <!-- Not logged in -->
      <div v-if="!currentUser" class="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300">
        <p class="text-stone-500 italic mb-4">You need to sign in to view your profile.</p>
        <router-link to="/Bakery-Website/login" class="text-wabi-moss font-bold underline">Go to Login</router-link>
      </div>

      <template v-else>
        <!-- Header -->
        <div class="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-wabi-moss/10 text-wabi-moss font-black text-xl flex items-center justify-center">
              {{ currentUser.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) }}
            </div>
            <div>
              <h1 class="text-2xl font-black text-stone-900">{{ currentUser.name }}</h1>
              <p class="text-stone-500 text-sm">{{ currentUser.email }}</p>
            </div>
          </div>
          <button
            @click="requestLogout"
            class="flex items-center gap-2 px-5 py-3 rounded-full border border-stone-200 text-stone-600 font-bold text-sm hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all">
            <LogOut class="w-4 h-4" />
            Log Out
          </button>
        </div>

        <!-- Tabs -->
        <div class="flex gap-2 bg-stone-100 p-1 rounded-xl w-fit mb-10">
          <button
            @click="activeTab = 'details'"
            :class="activeTab === 'details' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500'"
            class="px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all">
            <User class="w-4 h-4" /> My Details
          </button>
          <button
            @click="activeTab = 'history'"
            :class="activeTab === 'history' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500'"
            class="px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all">
            <Package class="w-4 h-4" /> Purchase History
          </button>
        </div>

        <!-- My Details -->
        <div v-if="activeTab === 'details'">
          <p v-if="saved" class="mb-4 text-sm font-bold text-wabi-moss">Profile updated.</p>

        <div v-if="!editing" class="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="flex items-start gap-3">
            <User class="w-5 h-5 text-wabi-moss mt-1" />
            <div>
              <p class="text-xs font-bold uppercase tracking-widest text-stone-400">Full Name</p>
              <p class="font-semibold text-stone-800">{{ currentUser.name }}</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <Mail class="w-5 h-5 text-wabi-moss mt-1" />
            <div>
              <p class="text-xs font-bold uppercase tracking-widest text-stone-400">Email</p>
              <p class="font-semibold text-stone-800">{{ currentUser.email }}</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <Phone class="w-5 h-5 text-wabi-moss mt-1" />
            <div>
              <p class="text-xs font-bold uppercase tracking-widest text-stone-400">Phone</p>
              <p class="font-semibold text-stone-800">{{ currentUser.phone || '—' }}</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <Cake class="w-5 h-5 text-wabi-moss mt-1" />
            <div>
              <p class="text-xs font-bold uppercase tracking-widest text-stone-400">Date of Birth</p>
              <p class="font-semibold text-stone-800">{{ currentUser.dob || '—' }}</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <VenetianMask class="w-5 h-5 text-wabi-moss mt-1" />
            <div>
              <p class="text-xs font-bold uppercase tracking-widest text-stone-400">Gender</p>
              <p class="font-semibold text-stone-800">{{ currentUser.gender || '—' }}</p>
            </div>
          </div>
          <div class="flex items-start gap-3 sm:col-span-2">
            <MapPin class="w-5 h-5 text-wabi-moss mt-1" />
            <div>
              <p class="text-xs font-bold uppercase tracking-widest text-stone-400">Delivery Address</p>
              <p class="font-semibold text-stone-800">
                <template v-if="currentUser.address">
                  {{ currentUser.address }}, {{ currentUser.city }} {{ currentUser.postcode }}, {{ currentUser.state }}
                </template>
                <template v-else>—</template>
              </p>
            </div>
          </div>
          <div class="sm:col-span-2 pt-2">
            <button
              @click="startEdit"
              class="flex items-center gap-2 px-5 py-3 rounded-full border border-stone-200 text-stone-700 font-bold text-sm hover:bg-wabi-moss hover:text-white hover:border-wabi-moss transition-all">
              <Pencil class="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        <!-- Edit form -->
        <form v-else @submit.prevent="saveProfile" class="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-5">
          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Full Name</label>
            <input v-model="form.name" type="text" required class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Email</label>
            <input :value="currentUser.email" type="email" disabled class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors bg-stone-50 text-stone-400 cursor-not-allowed" />
            <p class="text-xs text-stone-400 mt-1">Email is your login, so it can't be changed here.</p>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Phone Number</label>
            <input v-model="form.phone" type="tel" required placeholder="0123456789" class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Date of Birth</label>
              <input v-model="form.dob" type="date" required class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Gender</label>
              <select v-model="form.gender" required class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors bg-white">
                <option value="" disabled>Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Street Address</label>
            <input v-model="form.address" type="text" required class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">City</label>
              <input v-model="form.city" type="text" required class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Postcode</label>
              <input v-model="form.postcode" type="text" required class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">State</label>
            <input v-model="form.state" type="text" required class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
          </div>

          <p v-if="saveError" class="text-sm text-red-500 font-medium">{{ saveError }}</p>

          <div class="flex gap-3 pt-2">
            <button
              type="button"
              @click="editing = false"
              class="flex-1 py-3.5 rounded-full font-bold text-stone-700 border-2 border-stone-200 hover:bg-stone-50 transition-all">
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="flex-1 py-3.5 rounded-full font-bold text-white bg-wabi-moss hover:bg-opacity-90 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
              {{ loading ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
        </div>

        <!-- Purchase History -->
        <div v-else class="space-y-6">
          <p v-if="ordersLoading" class="text-center text-stone-400 italic py-10">Loading your orders...</p>

          <div v-else-if="myOrders.length === 0" class="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300">
            <p class="text-stone-500 italic">You haven't placed any orders yet.</p>
            <router-link to="/Bakery-Website/shop" class="text-wabi-moss font-bold underline mt-4 inline-block">Start Shopping</router-link>
          </div>

          <div v-for="order in myOrders" :key="order.id" class="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm">
            <div class="flex justify-between items-start mb-4 flex-wrap gap-2">
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-stone-400">Order #{{ order.id }}</p>
                <p class="text-sm text-stone-500">{{ formatDate(order.date) }} • {{ order.paymentMethod ? 'Paid via ' + order.paymentMethod : 'Payment: ' + order.paymentStatus }}</p>
              </div>
              <span class="text-xs font-bold uppercase tracking-widest bg-wabi-moss/10 text-wabi-moss px-3 py-1 rounded-full">
                {{ order.status }}
              </span>
            </div>

            <div class="space-y-2 border-t border-stone-100 pt-4">
              <div v-for="item in order.items" :key="item.id" class="flex justify-between text-sm">
                <span class="text-stone-600">{{ item.qty }} × {{ item.name }}</span>
                <span class="font-semibold text-stone-800">${{ (item.price * item.qty).toFixed(2) }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center pt-4 mt-4 border-t border-stone-100">
              <span class="font-bold text-stone-800">Total</span>
              <span class="font-black text-wabi-moss text-lg">${{ order.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </template>

    </div>

    <!-- Logout confirmation -->
    <ConfirmModal
      :show="showLogoutConfirm"
      title="Log Out?"
      message="You'll need to sign in again to view your profile and order history."
      confirm-text="Log Out"
      cancel-text="Stay Signed In"
      danger
      @confirm="confirmLogout"
      @cancel="showLogoutConfirm = false"
    />
  </div>
</template>