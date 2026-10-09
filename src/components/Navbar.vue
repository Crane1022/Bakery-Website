<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ShoppingBag, Menu, X, User, LogOut } from 'lucide-vue-next'
import { useCart } from '../store/cart'
import { useAuth } from '../store/auth'
import ConfirmModal from './ConfirmModal.vue'
import logo from '../assets/Logo.png'

// Track menu is Open
const isMenuOpen = ref(false)
const isAccountOpen = ref(false)
const showLogoutConfirm = ref(false)

// Shared state
const { cartCount } = useCart()
const { currentUser, isLoggedIn, logout } = useAuth()
const router = useRouter()
const route = useRoute()

// Function to close menu when a link is clicked
const closeMenu = () => {
  isMenuOpen.value = false
}

// Every navbar link calls this. A different page opens at the top (see scrollBehavior in main.js).
// If you click the link of the page you are already on, router-link does nothing,
// so we scroll back to the top ourselves.
const goTo = (path) => {
  closeMenu()
  isAccountOpen.value = false
  if (route.path === path) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Style for each link in the mobile menu: green when hovered/tapped, light green for the current page
const linkBase = 'menu-item block text-lg font-bold px-5 py-3 rounded-2xl transition-all duration-300 ease-out active:scale-95'
const linkClass = (path) => [
  linkBase,
  route.path === path
    ? 'bg-wabi-moss/10 text-wabi-moss'
    : 'text-stone-800 hover:bg-wabi-moss hover:text-white active:bg-wabi-moss active:text-white'
]

// Stop the page behind the menu from scrolling while it is open
watch(isMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

// If the window becomes wide (e.g. phone rotated), close the mobile menu
const wide = window.matchMedia('(min-width: 768px)')
const onWide = (e) => {
  if (e.matches) closeMenu()
}
onMounted(() => wide.addEventListener('change', onWide))
onUnmounted(() => {
  wide.removeEventListener('change', onWide)
  document.body.style.overflow = ''
})

const requestLogout = () => {
  isAccountOpen.value = false
  closeMenu()
  showLogoutConfirm.value = true
}

const confirmLogout = () => {
  logout()
  showLogoutConfirm.value = false
  router.push('/Bakery-Website/')
}
</script>

<template>
  <nav class="sticky top-3 sm:top-6 z-50 flex items-center justify-between px-4 sm:px-8 py-3 mt-3 sm:mt-0 mx-auto w-[92%] sm:w-[90%] max-w-5xl bg-white/60 backdrop-blur-md rounded-full border border-stone-200/50 shadow-[0_20px_40px_-15px_rgba(93,112,82,0.12)]">
    <router-link @click="goTo('/Bakery-Website/')" to="/Bakery-Website/" class="flex items-center gap-2 sm:gap-3">
      <img :src="logo" alt="OvalisRoom logo" class="h-9 sm:h-10 w-auto rounded-lg object-contain mix-blend-multiply" />
      <span class="font-serif text-xl sm:text-2xl font-bold text-wabi-moss whitespace-nowrap">OvalisRoom</span>
    </router-link>

    <div class="hidden md:flex items-center gap-8 font-medium text-stone-600">
        <router-link @click="goTo('/Bakery-Website/')" to="/Bakery-Website/" class="hover:text-wabi-moss transition-colors duration-300">
            Home
        </router-link>
        <router-link @click="goTo('/Bakery-Website/shop')" to="/Bakery-Website/shop" class="hover:text-wabi-moss transition-colors duration-300">
            Order Now
        </router-link>
        <router-link @click="goTo('/Bakery-Website/ingredients')" to="/Bakery-Website/ingredients" class="hover:text-wabi-moss transition-colors duration-300">
            Our Ingredients
        </router-link>
        <router-link @click="goTo('/Bakery-Website/reviews')" to="/Bakery-Website/reviews" class="hover:text-wabi-moss transition-colors duration-300">
            Reviews
        </router-link>
    </div>
    <div class="flex items-center gap-2 sm:gap-4">
      <router-link @click="goTo('/Bakery-Website/checkout')" to="/Bakery-Website/checkout" class="relative cursor-pointer text-stone-600 hover:text-wabi-moss transition-colors mr-2">
        <ShoppingBag class="w-6 h-6" />
        <span class="absolute -top-2 -right-2 bg-wabi-moss text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
          {{ cartCount }}
        </span>
      </router-link>

      <!-- Account: logged out -->
      <router-link @click="goTo('/Bakery-Website/login')"
        v-if="!isLoggedIn"
        to="/Bakery-Website/login"
        class="hidden md:flex bg-wabi-moss text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all active:scale-95 shadow-md">
        Login
      </router-link>

      <!-- Account: logged in -->
      <div v-else class="hidden md:block relative">
        <button
          @click="isAccountOpen = !isAccountOpen"
          class="flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-full font-semibold transition-all">
          <User class="w-4 h-4" />
          {{ currentUser.name.split(' ')[0] }}
        </button>

        <transition name="slide">
          <div v-if="isAccountOpen" class="absolute right-0 mt-3 w-48 bg-white rounded-2xl border border-stone-100 shadow-xl p-2 z-40">
            <router-link @click="goTo('/Bakery-Website/profile')"
             
              to="/Bakery-Website/profile"
              class="flex items-center gap-2 px-4 py-3 rounded-xl text-stone-700 font-medium hover:bg-wabi-moss/10 hover:text-wabi-moss transition-all">
              <User class="w-4 h-4" /> Profile
            </router-link>
            <button
              @click="requestLogout"
              class="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-stone-700 font-medium hover:bg-red-50 hover:text-red-500 transition-all">
              <LogOut class="w-4 h-4" /> Logout
            </button>
          </div>
        </transition>
      </div>

      <button @click="isMenuOpen = !isMenuOpen" class="flex md:hidden items-center p-2 text-wabi-moss">
        <Menu v-if="!isMenuOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile menu: centered on the screen. Teleport puts it on <body> so it is
         positioned against the whole screen, not the small navbar. -->
    <Teleport to="body">
      <transition name="menu">
        <div
          v-if="isMenuOpen"
          class="fixed inset-0 z-40 md:hidden flex items-center justify-center p-6 bg-stone-900/30 backdrop-blur-sm"
          @click.self="closeMenu">
          <div class="menu-panel w-full max-w-sm max-h-[calc(100dvh-10rem)] overflow-y-auto bg-white rounded-[2rem] shadow-2xl p-4 flex flex-col gap-1">
            <router-link @click="goTo('/Bakery-Website/')" to="/Bakery-Website/" :class="linkClass('/Bakery-Website/')">Home</router-link>
            <router-link @click="goTo('/Bakery-Website/shop')" to="/Bakery-Website/shop" :class="linkClass('/Bakery-Website/shop')">Order Now</router-link>
            <router-link @click="goTo('/Bakery-Website/ingredients')" to="/Bakery-Website/ingredients" :class="linkClass('/Bakery-Website/ingredients')">Our Ingredients</router-link>
            <router-link @click="goTo('/Bakery-Website/reviews')" to="/Bakery-Website/reviews" :class="linkClass('/Bakery-Website/reviews')">Reviews</router-link>
            <hr class="menu-item border-stone-100 my-2" />

            <template v-if="!isLoggedIn">
              <router-link @click="goTo('/Bakery-Website/login')" to="/Bakery-Website/login" :class="linkClass('/Bakery-Website/login')">Login</router-link>
              <router-link @click="goTo('/Bakery-Website/register')" to="/Bakery-Website/register" :class="linkClass('/Bakery-Website/register')">Register</router-link>
            </template>
            <template v-else>
              <router-link @click="goTo('/Bakery-Website/profile')" to="/Bakery-Website/profile" :class="linkClass('/Bakery-Website/profile')">Profile</router-link>
              <button
                @click="requestLogout"
                :class="[linkBase, 'text-left text-stone-800 hover:bg-red-500 hover:text-white active:bg-red-500 active:text-white']">
                Logout
              </button>
            </template>

            <router-link @click="goTo('/Bakery-Website/checkout')"
             
              to="/Bakery-Website/checkout"
              class="menu-item block text-center bg-wabi-moss text-white py-3.5 rounded-full font-bold mt-2 hover:bg-stone-800 active:bg-stone-800 transition-all duration-300 ease-out">
              Check Out
            </router-link>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Logout confirmation -->
    <Teleport to="body">
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
    </Teleport>
  </nav>
</template>

<style scoped>
/* Animation for the dropdown */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease-out;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Animation for the centered mobile menu */
.menu-enter-active, .menu-leave-active {
  transition: opacity 0.25s ease;
}
.menu-enter-active .menu-panel, .menu-leave-active .menu-panel {
  transition: transform 0.25s ease;
}
.menu-enter-from, .menu-leave-to {
  opacity: 0;
}
.menu-enter-from .menu-panel, .menu-leave-to .menu-panel {
  transform: scale(0.95) translateY(8px);
}

/* Menu items glide in one after another */
.menu-enter-active .menu-item {
  transition: opacity 0.35s ease-out, transform 0.35s ease-out;
}
.menu-enter-from .menu-item {
  opacity: 0;
  transform: translateY(12px);
}
.menu-enter-active .menu-item:nth-child(1) { transition-delay: 80ms; }
.menu-enter-active .menu-item:nth-child(2) { transition-delay: 120ms; }
.menu-enter-active .menu-item:nth-child(3) { transition-delay: 160ms; }
.menu-enter-active .menu-item:nth-child(4) { transition-delay: 200ms; }
.menu-enter-active .menu-item:nth-child(5) { transition-delay: 240ms; }
.menu-enter-active .menu-item:nth-child(6) { transition-delay: 280ms; }
.menu-enter-active .menu-item:nth-child(7) { transition-delay: 320ms; }
.menu-enter-active .menu-item:nth-child(8) { transition-delay: 360ms; }
</style>