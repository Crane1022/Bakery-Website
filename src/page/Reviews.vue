<script setup>
import { ref } from 'vue'
import { Star, Send } from 'lucide-vue-next'
import ReviewCard from '../components/Review_Card.vue'

const reviews = ref([
  {
    id: 1,
    name: "Amelia Tan",
    initials: "AT",
    rating: 5,
    product: "Classic Honey Oat",
    comment: "Genuinely the best biscuits I've had. You can taste that the honey is real — not overly sweet at all."
  },
  {
    id: 2,
    name: "Marcus Lim",
    initials: "ML",
    rating: 5,
    product: "Dark Cacao & Sea Salt",
    comment: "The sea salt on top makes such a difference. Ordered twice already and gifted a box to my parents."
  },
  {
    id: 3,
    name: "Nadia Rahman",
    initials: "NR",
    rating: 4,
    product: "Lavender Lemon Shortbread",
    comment: "Delicate and fragrant, not overpowering at all. Would love to see a bigger box option for these."
  },
  {
    id: 4,
    name: "James Ooi",
    initials: "JO",
    rating: 5,
    product: "Matcha Shortbread",
    comment: "Fast delivery and the biscuits arrived perfectly intact. Texture is exactly what shortbread should be."
  },
  {
    id: 5,
    name: "Priya Nair",
    initials: "PN",
    rating: 5,
    product: "Classic Honey Oat",
    comment: "Ordered for a small work event and everyone asked where I got them from. Packaging was lovely too."
  },
  {
    id: 6,
    name: "Daniel Wong",
    initials: "DW",
    rating: 4,
    product: "Dark Cacao & Sea Salt",
    comment: "Rich without being heavy. My only wish is that they came in a bigger batch for the price."
  }
])

// New review form state
const newReview = ref({
  name: '',
  product: '',
  rating: 5,
  comment: ''
})

const submitted = ref(false)

const submitReview = () => {
  if (!newReview.value.name || !newReview.value.comment) return

  reviews.value.unshift({
    id: Date.now(),
    name: newReview.value.name,
    initials: newReview.value.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2),
    rating: newReview.value.rating,
    product: newReview.value.product || 'Bakery Order',
    comment: newReview.value.comment
  })

  submitted.value = true
  newReview.value = { name: '', product: '', rating: 5, comment: '' }

  setTimeout(() => (submitted.value = false), 2500)
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
          Real words from real customers who've had a taste of WabiSabi Home.
        </p>
      </div>

      <!-- Responsive Review Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <ReviewCard
          v-for="review in reviews"
          :key="review.id"
          :review="review"
        />
      </div>

      <!-- Leave a Review -->
      <div class="mt-14 md:mt-20 max-w-2xl mx-auto bg-stone-900 text-white p-6 sm:p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
        <h2 class="text-2xl font-bold mb-2">Share Your Experience</h2>
        <p class="text-stone-400 text-sm mb-8">Tell other biscuit lovers what you thought.</p>

        <form @submit.prevent="submitReview" class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Your Name</label>
              <input
                v-model="newReview.name"
                required
                type="text"
                placeholder="Jane Doe"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors placeholder:text-stone-500" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Product</label>
              <input
                v-model="newReview.product"
                type="text"
                placeholder="Classic Honey Oat"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors placeholder:text-stone-500" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Rating</label>
            <div class="flex gap-2">
              <button
                v-for="n in 5"
                :key="n"
                type="button"
                @click="newReview.rating = n"
                class="transition-transform active:scale-90">
                <Star
                  class="w-7 h-7"
                  :class="n <= newReview.rating ? 'fill-wabi-moss text-wabi-moss' : 'text-stone-600'" />
              </button>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Your Review</label>
            <textarea
              v-model="newReview.comment"
              required
              rows="3"
              placeholder="Tell us what you loved..."
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-wabi-moss transition-colors placeholder:text-stone-500 resize-none"></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-wabi-moss text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all active:scale-95">
            <Send class="w-4 h-4" />
            {{ submitted ? 'Thank you for your review!' : 'Submit Review' }}
          </button>
        </form>
      </div>

    </div>
  </div>
</template>