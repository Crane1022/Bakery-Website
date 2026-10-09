import { reactive, computed, watch } from 'vue'
import { useAuth } from './auth'
import { api } from '../api'

// Orders are saved in the "Orders" and "Order_items" tabs of your Google Sheet.
const { currentUser, token, logout } = useAuth()

const state = reactive({
  orders: [],
  loading: false,
  error: ''
})

// Forget the list when someone logs in or out, so nobody sees another person's orders
watch(currentUser, () => {
  state.orders = []
})

// If the server says the login is no longer valid, log the user out
function handleSessionError(err) {
  if (/log in again/i.test(err.message)) logout()
}

// Call this when the Profile page opens
async function loadMyOrders() {
  if (!token.value) return

  state.loading = true
  state.error = ''

  try {
    state.orders = await api.myOrders(token.value)
  } catch (err) {
    state.error = err.message
    handleSessionError(err)
  } finally {
    state.loading = false
  }
}

// items: [{ id, qty }]. The server works out prices and the total itself.
// Throws an Error (e.g. "Sorry, only 2 left of ...") so the Checkout page can show it.
async function placeOrder({ items, paymentMethod }) {
  try {
    const order = await api.createOrder(token.value, {
      items,
      paymentMethod,
      deliveryMethod: 'Delivery'
    })
    state.orders.unshift(order)
    return order
  } catch (err) {
    handleSessionError(err)
    throw err
  }
}

export function useOrders() {
  return {
    myOrders: computed(() => state.orders),
    ordersLoading: computed(() => state.loading),
    ordersError: computed(() => state.error),
    loadMyOrders,
    placeOrder
  }
}