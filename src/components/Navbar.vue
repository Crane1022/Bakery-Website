<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingBag, Menu, X, User, LogOut } from 'lucide-vue-next'
import { useCart } from '../store/cart'
import { useAuth } from '../store/auth'
import ConfirmModal from './ConfirmModal.vue'

// Track menu is Open
const isMenuOpen = ref(false)
const isAccountOpen = ref(false)
const showLogoutConfirm = ref(false)

// Shared state
const { cartCount } = useCart()
const { currentUser, isLoggedIn, logout } = useAuth()
const router = useRouter()

// Function to close menu when a link is clicked
const closeMenu = () => {
  isMenuOpen.value = false
}

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
    <div class="font-serif text-xl sm:text-2xl font-bold text-wabi-moss whitespace-nowrap">OvalisRoom</div>

    <div class="hidden md:flex items-center gap-8 font-medium text-stone-600">
        <router-link to="/Bakery-Website/" class="hover:text-wabi-moss transition-colors">
            Home
        </router-link>
        <router-link to="/Bakery-Website/shop" class="hover:text-wabi-moss transition-colors">
            Order Now
        </router-link>
        <router-link to="/Bakery-Website/ingredients" class="hover:text-wabi-moss transition-colors">
            Our Ingredients
        </router-link>
        <router-link to="/Bakery-Website/reviews" class="hover:text-wabi-moss transition-colors">
            Reviews
        </router-link>
    </div>
    <div class="flex items-center gap-2 sm:gap-4">
      <router-link to="/Bakery-Website/checkout" class="relative cursor-pointer text-stone-600 hover:text-wabi-moss transition-colors mr-2">
        <ShoppingBag class="w-6 h-6" />
        <span class="absolute -top-2 -right-2 bg-wabi-moss text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
          {{ cartCount }}
        </span>
      </router-link>

      <!-- Account: logged out -->
      <router-link
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
            <router-link
              @click="isAccountOpen = false"
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

    <!-- Mobile Dropdown List -->
    <transition name="slide">
      <div v-if="isMenuOpen" class="absolute top-[4.5rem] left-0 w-full max-h-[calc(100dvh-7rem)] overflow-y-auto bg-white/95 backdrop-blur-lg rounded-3xl border border-stone-200 shadow-xl p-4 flex flex-col gap-1 md:hidden z-40">
        <router-link @click="closeMenu" to="/Bakery-Website/" class="text-lg font-bold text-stone-800 px-5 py-3 rounded-2xl transition-all hover:bg-wabi-moss/10 hover:text-wabi-moss active:scale-95">Home</router-link>
        <router-link @click="closeMenu" to="/Bakery-Website/shop" class="text-lg font-bold text-stone-800 px-5 py-3 rounded-2xl transition-all hover:bg-wabi-moss/10 hover:text-wabi-moss active:scale-95">Order Now</router-link>
        <router-link @click="closeMenu" to="/Bakery-Website/ingredients" class="text-lg font-bold text-stone-800 px-5 py-3 rounded-2xl transition-all hover:bg-wabi-moss/10 hover:text-wabi-moss active:scale-95">Our Ingredients</router-link>
        <router-link @click="closeMenu" to="/Bakery-Website/reviews" class="text-lg font-bold text-stone-800 px-5 py-3 rounded-2xl transition-all hover:bg-wabi-moss/10 hover:text-wabi-moss active:scale-95">Reviews</router-link>
        <hr class="border-stone-100 my-2" />

        <template v-if="!isLoggedIn">
          <router-link @click="closeMenu" to="/Bakery-Website/login" class="text-lg font-bold text-stone-800 px-5 py-3 rounded-2xl transition-all hover:bg-wabi-moss/10 hover:text-wabi-moss active:scale-95">Login</router-link>
          <router-link @click="closeMenu" to="/Bakery-Website/register" class="text-lg font-bold text-stone-800 px-5 py-3 rounded-2xl transition-all hover:bg-wabi-moss/10 hover:text-wabi-moss active:scale-95">Register</router-link>
        </template>
        <template v-else>
          <router-link @click="closeMenu" to="/Bakery-Website/profile" class="text-lg font-bold text-stone-800 px-5 py-3 rounded-2xl transition-all hover:bg-wabi-moss/10 hover:text-wabi-moss active:scale-95">Profile</router-link>
          <button @click="requestLogout" class="text-left text-lg font-bold text-stone-800 px-5 py-3 rounded-2xl transition-all hover:bg-red-50 hover:text-red-500 active:scale-95">Logout</button>
        </template>

        <router-link @click="closeMenu" to="/Bakery-Website/checkout">
          <button class="w-full bg-wabi-moss text-white py-3.5 rounded-full font-bold mt-2">Check Out</button>
        </router-link>
      </div>
    </transition>

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
</style>