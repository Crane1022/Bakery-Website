<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { LogIn } from 'lucide-vue-next'
import { useAuth } from '../store/auth'

const email = ref('')
const password = ref('')

const { login, error, loading } = useAuth()
const router = useRouter()
const route = useRoute()

const handleLogin = async () => {
  const success = await login({ email: email.value, password: password.value })
  if (success) {
    // send them back wherever they were headed (e.g. checkout), default to profile
    router.push(route.query.redirect || '/Bakery-Website/profile')
  }
}
</script>

<template>
  <div class="pt-32 pb-20 px-6 min-h-screen bg-[#FDFCFB] flex items-center justify-center">
    <div class="w-full max-w-md bg-white p-8 md:p-10 rounded-[2.5rem] border border-stone-100 shadow-xl">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-black text-stone-900 tracking-tight">
          Welcome <span class="text-wabi-moss italic font-serif font-medium">Back.</span>
        </h1>
        <p class="text-stone-500 text-sm mt-2">Sign in to view your profile and order history.</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
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
          <label class="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors" />
        </div>

        <p v-if="error" class="text-sm text-red-500 font-medium">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-wabi-moss text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
          <LogIn class="w-4 h-4" />
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <p class="text-center text-sm text-stone-500 mt-8">
        Don't have an account?
        <router-link to="/Bakery-Website/register" class="text-wabi-moss font-bold hover:underline">Create one</router-link>
      </p>
    </div>
  </div>
</template>