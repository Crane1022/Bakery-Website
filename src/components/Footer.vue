<script setup>
import logo from '../assets/Logo.png'
import { useRoute } from 'vue-router'

const route = useRoute()

const goTo = (path) => {
  closeMenu()
  // isAccountOpen.value = false
  if (route.path === path) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="mt-16 md:mt-24 py-10 md:py-12 px-6 md:px-8 border-t border-stone-200 bg-stone-50/50">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-center">
      <router-link @click="goTo('/Bakery-Website/')" to="/Bakery-Website/" class="flex items-center gap-2 sm:gap-3">
        <img :src="logo" alt="OvalisRoom logo" class="h-9 sm:h-10 w-auto rounded-lg object-contain mix-blend-multiply" />
        <span class="font-serif text-xl sm:text-2xl font-bold text-wabi-moss whitespace-nowrap">OvalisRoom</span>
      </router-link>
      <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 md:gap-8 text-stone-500 font-medium">
        <a href="#" class="hover:underline transition-all underline-offset-4">Privacy</a>
        <a href="#" class="hover:underline transition-all underline-offset-4">Terms</a>
        <a href="#" class="hover:underline transition-all underline-offset-4">Wholesale</a>
        <a href="#" class="hover:underline transition-all underline-offset-4">Contact</a>
      </div>
      <div class="text-stone-400 text-sm">© 2026 OvalisRoom. Handcrafted with intention.</div>
    </div>
  </footer>
</template>