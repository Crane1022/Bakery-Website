<script setup>
import { ref, onMounted } from 'vue'
import { Star, Send, Check } from 'lucide-vue-next'
import ReviewCard from '../components/Review_Card.vue'
import { useAuth } from '../store/auth'
import { products } from '../store/products'
import { api } from '../api'

const { isLoggedIn, currentUser, token, logout } = useAuth()

// ---- Reviews come from the "Reviews" tab of the Google Sheet ----
const reviews = ref([])
const loading = ref(false)
const loadError = ref('')

async function loadReviews() {
  loading.value = true
  loadError.value = ''

  try {
    reviews.value = await api.getReviews()
  } catch (err) {
    loadError.value = 'Could not load reviews. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadReviews)

// ---- New review form (only for logged-in customers) ----
const newReview = ref({ products: [], rating: 5, comment: '' })
const sending = ref(false)
const successMessage = ref('')
const formError = ref('')

// One review can cover several items: tap an item to add it, tap again to remove it
const MAX_ITEMS = 10
const toggleProduct = (name) => {
  const list = newReview.value.products
  const i = list.indexOf(name)
  if (i === -1) list.push(name)
  else list.splice(i, 1)
}

const submitReview = async () => {
  formError.value = ''
  successMessage.value = ''
  sending.value = true

  try {
    const { review, status } = await api.addReview(token.value, { ...newReview.value })

    // Approved reviews show straight away; Pending ones wait for you to approve them in the sheet
    if (status === 'Approved') {
      reviews.value.unshift(review)
      successMessage.value = 'Thank you for your review!'
    } else {
      successMessage.value = 'Thank you! Your review will appear once it has been approved.'
    }

    newReview.value = { products: [], rating: 5, comment: '' }
    setTimeout(() => (successMessage.value = ''), 4000)
  } catch (err) {
    formError.value = err.message
    if (/log in again/i.test(err.message)) logout()
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div class="pt-10 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 min-h-screen bg-[#FDFCFB]">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-10 md:mb-16 space-y-4 max-w-2xl mx-auto">
        <span class="inline-block px-4 py-1.5 bg-wabi-moss/10 text-wabi-moss rounded-full text-sm font-bold tracking-wide uppercase">
          Loved By Many
        </span>
        <h1 class="text-4xl md:text-6xl font-black text-stone-900 tracking-tight">
          Customer <span class="text-wabi-moss italic font-serif font-medium">Reviews.</span>
        </h1>
        <p class="text-lg text-stone-600 leading-relaxed">
          Real words from real customers who've had a taste of OvalisRoom.
        </p>
      </div>

      <!-- Review states -->
      <p v-if="loading" class="text-center text-stone-400 italic font-serif py-10">Loading reviews...</p>
      <p v-else-if="loadError" class="text-center text-red-500 font-medium py-10">{{ loadError }}</p>
      <p v-else-if="reviews.length === 0" class="text-center text-stone-400 italic font-serif py-10">
        No reviews yet. Be the first to share your experience!
      </p>

      <!-- Responsive Review Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <ReviewCard
          v-for="review in reviews"
          :key="review.id"
          :review="review"
        />
      </div>

      <!-- Leave a Review -->
      <div class="mt-14 md:mt-20 max-w-2xl mx-auto bg-stone-900 text-white p-6 sm:p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
        <h2 class="text-2xl font-bold mb-2">Share Your Experience</h2>

        <!-- Logged out: ask them to sign in first -->
        <div v-if="!isLoggedIn">
          <p class="text-stone-400 text-sm mb-8">Please sign in to leave a review.</p>
          <div class="flex flex-col sm:flex-row gap-3">
            <router-link
              to="/Bakery-Website/login"
              class="flex-1 text-center bg-wabi-moss text-white py-4 rounded-full font-bold hover:bg-opacity-90 transition-all duration-300 active:scale-95">
              Log In
            </router-link>
            <router-link
              to="/Bakery-Website/register"
              class="flex-1 text-center border-2 border-white/20 text-white py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300 active:scale-95">
              Create Account
            </router-link>
          </div>
        </div>

        <!-- Logged in: the form -->
        <div v-else>
          <p class="text-stone-400 text-sm mb-8">
            Posting as <span class="text-white font-semibold">{{ currentUser.name }}</span>.
            Your review shows your first name and last initial only.
          </p>

          <form @submit.prevent="submitReview" class="space-y-5">
            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
                Items you're reviewing
                <span class="normal-case tracking-normal font-medium text-stone-500">(pick one or more)</span>
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="p in products"
                  :key="p.id"
                  type="button"
                  :aria-pressed="newReview.products.includes(p.name)"
                  :disabled="!newReview.products.includes(p.name) && newReview.products.length >= MAX_ITEMS"
                  @click="toggleProduct(p.name)"
                  :class="newReview.products.includes(p.name)
                    ? 'bg-wabi-moss border-wabi-moss text-white'
                    : 'bg-white/5 border-white/10 text-stone-300 hover:border-wabi-moss hover:text-white'"
                  class="flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-sm font-semibold transition-all duration-300 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">
                  <Check v-if="newReview.products.includes(p.name)" class="w-4 h-4" />
                  {{ p.name }}
                </button>
              </div>
              <p class="text-xs text-stone-500 mt-2">
                {{ newReview.products.length ? newReview.products.length + ' selected' : 'Nothing selected means a general review of your order.' }}
              </p>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Rating</label>
              <div class="flex gap-2">
                <button
                  v-for="n in 5"
                  :key="n"
                  type="button"
                  :aria-label="`${n} star${n > 1 ? 's' : ''}`"
                  @click="newReview.rating = n"
                  class="p-1 transition-transform active:scale-90">
                  <Star
                    class="w-7 h-7 transition-colors duration-200"
                    :class="n <= newReview.rating ? 'fill-wabi-moss text-wabi-moss' : 'text-stone-600'" />
                </button>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Your Review</label>
              <textarea
                v-model="newReview.comment"
                required
                minlength="5"
                maxlength="500"
                rows="4"
                placeholder="Tell us what you loved..."
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors placeholder:text-stone-500 resize-none"></textarea>
              <p class="text-xs text-stone-500 text-right mt-1">{{ newReview.comment.length }}/500</p>
            </div>

            <p v-if="formError" class="text-sm text-red-400 font-medium">{{ formError }}</p>
            <p v-if="successMessage" class="text-sm text-green-300 font-bold">{{ successMessage }}</p>

            <button
              type="submit"
              :disabled="sending"
              class="w-full bg-wabi-moss text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
              <Send class="w-4 h-4" />
              {{ sending ? 'Sending...' : 'Submit Review' }}
            </button>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>