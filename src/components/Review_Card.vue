<script setup>
import { Star } from 'lucide-vue-next'

defineProps({
  review: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-white p-6 sm:p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
    <!-- Stars -->
    <div class="flex gap-1 mb-4">
      <Star
        v-for="n in 5"
        :key="n"
        class="w-4 h-4"
        :class="n <= review.rating ? 'fill-wabi-moss text-wabi-moss' : 'text-stone-200'"
      />
    </div>

    <p class="text-stone-600 leading-relaxed italic flex-1">
      "{{ review.comment }}"
    </p>

    <div class="flex items-center gap-4 mt-6 pt-6 border-t border-stone-100">
      <div class="w-11 h-11 rounded-full bg-wabi-moss/10 text-wabi-moss font-bold flex items-center justify-center shrink-0">
        {{ review.initials }}
      </div>
      <div>
        <p class="font-bold text-stone-800 text-sm">{{ review.name }}</p>
        <p class="text-xs text-stone-400">{{ review.product }}</p>
      </div>
    </div>
  </div>
</template>