<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserPlus } from 'lucide-vue-next'
import { useAuth } from '../store/auth'

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const dob = ref('')
const gender = ref('')
const address = ref('')
const city = ref('')
const postcode = ref('')
const stateRegion = ref('')

const localError = ref('')
const { register, error, loading } = useAuth()
const router = useRouter()

const handleRegister = async () => {
  localError.value = ''

  if (password.value !== confirmPassword.value) {
    localError.value = 'Passwords do not match.'
    return
  }

  const success = await register({
    name: name.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
    dob: dob.value,
    gender: gender.value,
    address: address.value,
    city: city.value,
    postcode: postcode.value,
    state: stateRegion.value
  })

  if (success) {
    router.push('/Bakery-Website/profile')
  }
}
</script>

<template>
  <div class="pt-10 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 min-h-screen bg-[#FDFCFB] flex items-center justify-center">
    <div class="w-full max-w-md bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-stone-100 shadow-xl">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-black text-stone-900 tracking-tight">
          Create <span class="text-wabi-moss italic font-serif font-medium">Account.</span>
        </h1>
        <p class="text-stone-500 text-sm mt-2">Join us for faster checkout and order tracking.</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Full Name</label>
          <input
            v-model="name"
            type="text"
            required
            placeholder="Jane Doe"
            class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="you@example.com"
            class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Phone Number</label>
          <input
            v-model="phone"
            type="tel"
            required
            placeholder="0123456789"
            class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Date of Birth</label>
            <input
              v-model="dob"
              type="date"
              required
              class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Gender</label>
            <select
              v-model="gender"
              required
              class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors bg-white">
              <option value="" disabled>Select</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div class="pt-2 border-t border-stone-100">
          <p class="text-xs font-bold uppercase tracking-widest text-stone-400 mt-4 mb-3">Delivery Address</p>

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Street Address</label>
              <input
                v-model="address"
                type="text"
                required
                placeholder="123 Jalan Bakeri"
                class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">City</label>
                <input
                  v-model="city"
                  type="text"
                  required
                  placeholder="Rawang"
                  class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Postcode</label>
                <input
                  v-model="postcode"
                  type="text"
                  required
                  placeholder="48000"
                  class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">State</label>
              <input
                v-model="stateRegion"
                type="text"
                required
                placeholder="Selangor"
                class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
            </div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            required
            placeholder="••••••••"
            class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
        </div>

        <p v-if="localError || error" class="text-sm text-red-500 font-medium">{{ localError || error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-wabi-moss text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
          <UserPlus class="w-4 h-4" />
          {{ loading ? 'Creating account...' : 'Create Account' }}
        </button>
      </form>

      <p class="text-center text-sm text-stone-500 mt-8">
        Already have an account?
        <router-link to="/Bakery-Website/login" class="text-wabi-moss font-bold hover:underline">Sign in</router-link>
      </p>
    </div>
  </div>
</template>