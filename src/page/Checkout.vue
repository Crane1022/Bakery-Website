<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Minus, Trash2, CreditCard, Wallet, Landmark, Banknote, CheckCircle2, X, Loader2 } from 'lucide-vue-next'
import { useCart } from '../store/cart'
import { useAuth } from '../store/auth'
import { useOrders } from '../store/orders'
import { loadProducts } from '../store/products'

// Shared cart state — same items added from Home, Shop, etc.
const { items: cart, updateQty, removeItem, subtotal, clearCart } = useCart()
const { isLoggedIn } = useAuth()
const { placeOrder } = useOrders()
const router = useRouter()

const shipping = computed(() => (cart.value.length === 0 ? 0 : 5.00))
const total = computed(() => subtotal.value + shipping.value)

// Payment method options
const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'ewallet', label: 'E-Wallet (PayPal, TnG, GrabPay)', icon: Wallet },
  { id: 'bank', label: 'Bank Transfer / FPX', icon: Landmark },
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote }
]
const selectedPayment = ref('card')
const selectedMethodLabel = computed(
  () => paymentMethods.find((p) => p.id === selectedPayment.value)?.label
)

// Modal step: 'closed' -> 'confirm' -> 'processing' -> 'done'
const modalStep = ref('closed')

const openConfirm = () => {
  if (cart.value.length === 0) return

  // Require login before checkout completes
  if (!isLoggedIn.value) {
    router.push({
      path: '/Bakery-Website/login',
      query: { redirect: '/Bakery-Website/checkout' }
    })
    return
  }

  modalStep.value = 'confirm'
}

const closeModal = () => {
  // don't let the backdrop close it mid-payment
  if (modalStep.value === 'processing') return
  modalStep.value = 'closed'
}

const orderError = ref('')

const confirmPayment = async () => {
  orderError.value = ''
  modalStep.value = 'processing'

  try {
    // The server checks the stock and works out the real total
    await placeOrder({
      items: cart.value.map((i) => ({ id: i.id, qty: i.qty })),
      paymentMethod: selectedMethodLabel.value
    })

    clearCart()
    loadProducts() // stock changed, so refresh the product list
    modalStep.value = 'done'
  } catch (err) {
    orderError.value = err.message
    modalStep.value = 'confirm' // go back so the customer can read the error
  }
}
</script>

<template>
  <section class="py-20 px-6 bg-[#FDFCFB] min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-black text-stone-900 mb-10 tracking-tight">
        Your <span class="text-wabi-moss italic font-serif font-medium">Order</span>
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

        <!-- Left Side: Item List -->
        <div class="lg:col-span-2 space-y-6">
          <div v-if="cart.length === 0" class="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300">
            <p class="text-stone-500 italic">Your basket is empty.</p>
            <router-link to="/Bakery-Website/shop" class="text-wabi-moss font-bold underline mt-4 inline-block">Back to Shop</router-link>
          </div>

          <div v-for="item in cart" :key="item.id"
              class="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-3xl border border-stone-100 shadow-sm gap-4">
            <div class="flex items-center gap-6 w-full sm:w-auto">
              <img :src="item.image" class="w-20 h-20 object-cover rounded-2xl" />
              <div>
                <h3 class="font-bold text-stone-800">{{ item.name }}</h3>
                <p class="text-wabi-moss font-semibold">${{ item.price.toFixed(2) }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="flex items-center border border-stone-200 rounded-full px-3 py-1">
                <button @click="updateQty(item.id, -1)" class="p-1 hover:text-wabi-moss"><Minus class="w-4 h-4"/></button>
                <span class="mx-4 font-bold text-stone-700 w-4 text-center">{{ item.qty }}</span>
                <button @click="updateQty(item.id, 1)" class="p-1 hover:text-wabi-moss"><Plus class="w-4 h-4"/></button>
              </div>
              <button @click="removeItem(item.id)" class="text-stone-300 hover:text-red-400 transition-colors">
                <Trash2 class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Payment Method Selection -->
          <div v-if="cart.length > 0" class="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
            <h3 class="font-bold text-stone-800 mb-4">Choose Payment Method</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                v-for="method in paymentMethods"
                :key="method.id"
                type="button"
                @click="selectedPayment = method.id"
                :class="selectedPayment === method.id
                  ? 'border-wabi-moss bg-wabi-moss/5 text-wabi-moss'
                  : 'border-stone-200 text-stone-600 hover:border-stone-300'"
                class="flex items-center gap-3 px-5 py-4 rounded-2xl border-2 font-semibold text-sm transition-all text-left">
                <component :is="method.icon" class="w-5 h-5 shrink-0" />
                {{ method.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Right Side: Summary & Checkout -->
        <div class="lg:col-span-1">
          <div class="bg-stone-900 text-white p-8 rounded-[2.5rem] sticky top-32 shadow-2xl">
            <h2 class="text-2xl font-bold mb-6">Summary</h2>

            <div class="space-y-4 border-b border-stone-700 pb-6">
              <div class="flex justify-between">
                <span class="text-stone-400">Subtotal</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-stone-400">Shipping</span>
                <span>${{ shipping.toFixed(2) }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center py-6">
              <span class="text-xl font-medium">Total</span>
              <span class="text-3xl font-black text-wabi-moss">${{ total.toFixed(2) }}</span>
            </div>

            <p v-if="!isLoggedIn" class="text-xs text-stone-400 mb-4 text-center">
              You'll need to sign in to complete payment.
            </p>

            <button
              @click="openConfirm"
              :disabled="cart.length === 0"
              class="w-full bg-wabi-moss hover:bg-stone-100 hover:text-stone-900 text-white py-4 rounded-full font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed">
              <CreditCard class="w-5 h-5" />
              {{ isLoggedIn ? 'Proceed to Payment' : 'Sign In to Pay' }}
            </button>

            <p class="text-[10px] text-stone-500 text-center mt-6 uppercase tracking-widest font-bold">
              Secure Checkout • 100% Organic
            </p>
          </div>
        </div>

      </div>
    </div>

    <!-- ============================================================= -->
    <!-- Liquid-glass payment modal -->
    <!-- ============================================================= -->
    <transition name="glass">
      <div
        v-if="modalStep !== 'closed'"
        class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-900/30 backdrop-blur-sm"
        @click.self="closeModal">

        <div class="relative w-full max-w-md rounded-[2.5rem] overflow-hidden
                    bg-white/30 backdrop-blur-2xl border border-white/60
                    shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]">

          <!-- liquid glass sheen -->
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-white/10 to-transparent" />
          <div class="pointer-events-none absolute -top-16 -left-16 w-48 h-48 bg-white/40 rounded-full blur-3xl" />
          <div class="pointer-events-none absolute -bottom-20 -right-10 w-56 h-56 bg-wabi-moss/20 rounded-full blur-3xl" />

          <div class="relative p-8 md:p-10">

            <!-- Close button (hidden while processing) -->
            <button
              v-if="modalStep !== 'processing'"
              @click="closeModal"
              class="absolute top-6 right-6 text-stone-500 hover:text-stone-800 transition-colors">
              <X class="w-5 h-5" />
            </button>

            <!-- Step: Confirm -->
            <div v-if="modalStep === 'confirm'" class="text-center">
              <h2 class="text-2xl font-black text-stone-900 mb-1">Confirm Payment</h2>
              <p class="text-stone-600 text-sm mb-8">Please review before we process your order.</p>

              <div class="bg-white/50 border border-white/70 rounded-2xl p-6 text-left space-y-3 mb-8">
                <div class="flex justify-between text-sm">
                  <span class="text-stone-500">Paying with</span>
                  <span class="font-bold text-stone-800">{{ selectedMethodLabel }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-stone-500">Items</span>
                  <span class="font-bold text-stone-800">{{ cart.length }}</span>
                </div>
                <div class="flex justify-between items-center pt-3 border-t border-stone-200/70">
                  <span class="font-bold text-stone-800">Total</span>
                  <span class="text-2xl font-black text-wabi-moss">${{ total.toFixed(2) }}</span>
                </div>
              </div>

              <p v-if="orderError" class="text-sm text-red-600 font-medium mb-4">{{ orderError }}</p>

              <div class="flex gap-3">
                <button
                  @click="closeModal"
                  class="flex-1 py-3.5 rounded-full font-bold text-stone-700 border-2 border-stone-300/70 hover:bg-white/50 transition-all">
                  Cancel
                </button>
                <button
                  @click="confirmPayment"
                  class="flex-1 py-3.5 rounded-full font-bold text-white bg-wabi-moss hover:bg-opacity-90 transition-all active:scale-95">
                  Confirm
                </button>
              </div>
            </div>

            <!-- Step: Processing -->
            <div v-else-if="modalStep === 'processing'" class="text-center py-8">
              <Loader2 class="w-12 h-12 text-wabi-moss mx-auto mb-6 animate-spin" />
              <h2 class="text-xl font-bold text-stone-900 mb-1">Processing Payment...</h2>
              <p class="text-stone-600 text-sm">Please don't close this window.</p>
            </div>

            <!-- Step: Done -->
            <div v-else class="text-center">
              <CheckCircle2 class="w-16 h-16 text-wabi-moss mx-auto mb-5" />
              <h2 class="text-2xl font-black text-stone-900 mb-2">Payment Confirmed!</h2>
              <p class="text-stone-600 text-sm mb-8">
                Thanks for your order — it's been saved to your purchase history.
              </p>

              <div class="flex flex-col gap-3">
                <router-link
                  to="/Bakery-Website/profile"
                  class="w-full py-3.5 rounded-full font-bold text-white bg-wabi-moss hover:bg-opacity-90 transition-all text-center">
                  View Purchase History
                </router-link>
                <router-link
                  to="/Bakery-Website/shop"
                  class="w-full py-3.5 rounded-full font-bold text-stone-700 border-2 border-stone-300/70 hover:bg-white/50 transition-all text-center">
                  Continue Shopping
                </router-link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </transition>
  </section>
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