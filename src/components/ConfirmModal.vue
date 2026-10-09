<script setup>
defineProps({
  show: Boolean,
  title: { type: String, default: 'Are you sure???' },
  message: { type: String, default: '' },
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' },
  danger: { type: Boolean, default: false }
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <transition name="glass">
    <div
      v-if="show"
      class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-900/30 backdrop-blur-sm"
      @click.self="emit('cancel')">

      <div class="relative w-full max-w-sm rounded-[2.5rem] overflow-hidden
                  bg-white/30 backdrop-blur-2xl border border-white/60
                  shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]">

        <!-- liquid glass sheen -->
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-white/10 to-transparent" />
        <div class="pointer-events-none absolute -top-14 -left-14 w-40 h-40 bg-white/40 rounded-full blur-3xl" />
        <div class="pointer-events-none absolute -bottom-16 -right-10 w-48 h-48 bg-wabi-moss/20 rounded-full blur-3xl" />

        <div class="relative p-8 text-center">
          <h2 class="text-xl font-black text-stone-900 mb-2">{{ title }}</h2>
          <p class="text-stone-600 text-sm mb-8">{{ message }}</p>

          <div class="flex gap-3">
            <button
              @click="emit('cancel')"
              class="flex-1 py-3.5 rounded-full font-bold text-stone-700 border-2 border-stone-300/70 hover:bg-white/50 transition-all">
              {{ cancelText }}
            </button>
            <button
              @click="emit('confirm')"
              :class="danger ? 'bg-red-500 hover:bg-red-600' : 'bg-wabi-moss hover:bg-opacity-90'"
              class="flex-1 py-3.5 rounded-full font-bold text-white transition-all active:scale-95">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.glass-enter-active,
.glass-leave-active {
  transition: opacity 0.25s ease;
}
.glass-enter-from,
.glass-leave-to {
  opacity: 0;
}
</style>