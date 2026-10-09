<script setup>
import { ref, computed } from 'vue'

// form state
const name = ref('')
const contact = ref('')
const qtyA = ref(0)
const qtyB = ref(0)

// UI state
const loading = ref(false)
const showModal = ref(false)

// computed total
const total = computed(() => {
  return (qtyA.value * 18 + qtyB.value * 20).toFixed(2)
})

// submit
const handleSubmit = async () => {
  loading.value = true

  const scriptURL = 'https://script.google.com/macros/s/AKfycbwq_eAaMo5TnkePg1pKdxTJKMyuQT09aa-q1cWnNv4ehxWX2MkvH-Z48Nvh4f-hkRWbFg/exec'

  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('contact', contact.value)
  formData.append('qtyA', qtyA.value)
  formData.append('qtyB', qtyB.value)

  try {
    await fetch(scriptURL, {
      method: 'POST',
      body: formData
    })

    showModal.value = true
  } catch (error) {
    alert('Error! Please check your internet.')
  } finally {
    loading.value = false
  }
}

// reset
const closeModal = () => {
  showModal.value = false
  name.value = ''
  contact.value = ''
  qtyA.value = 0
  qtyB.value = 0
}
</script>

<template>
  <div class="flex justify-center py-10">
    <!-- Card -->
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Biscuit Order</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold mb-1">Name</label>
          <input v-model="name" required class="w-full border rounded-md p-2" />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-1">Contact Number</label>
          <input v-model="contact" required class="w-full border rounded-md p-2" />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-1">Biscuit A (RM 18)</label>
          <input type="number" min="0" v-model="qtyA" class="w-full border rounded-md p-2" />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-1">Biscuit B (RM 20)</label>
          <input type="number" min="0" v-model="qtyB" class="w-full border rounded-md p-2" />
        </div>

        <!-- Total -->
        <div class="bg-green-100 text-green-700 text-center p-3 rounded-md font-bold">
          Total Price: RM {{ total }}
        </div>

        <!-- Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-green-700 text-white py-3 rounded-md font-semibold hover:bg-green-800 transition"
        >
          {{ loading ? 'Processing...' : 'Place Order' }}
        </button>
      </form>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-xl w-[90%] max-w-sm text-center">
        <h3 class="text-lg font-bold mb-2">Order Receipt</h3>
        <p class="text-xs text-gray-500 mb-3">Thank you for your order!</p>

        <hr class="mb-3" />

        <div class="space-y-2 text-sm">
          <div class="flex justify-between border-b pb-1">
            <span>Customer:</span>
            <strong>{{ name }}</strong>
          </div>
          <div class="flex justify-between border-b pb-1">
            <span>Biscuit A:</span>
            <strong>{{ qtyA }} units</strong>
          </div>
          <div class="flex justify-between border-b pb-1">
            <span>Biscuit B:</span>
            <strong>{{ qtyB }} units</strong>
          </div>
        </div>

        <div class="text-green-700 font-bold text-lg mt-3">
          Total Paid: RM {{ total }}
        </div>

        <button
          @click="closeModal"
          class="mt-4 w-full bg-gray-800 text-white py-2 rounded-md"
        >
          Close & Reset
        </button>
      </div>
    </div>
  </div>
</template>