import { reactive } from 'vue'
import { api } from '../api'

// Products now come from the Google Sheet instead of being typed in here.
// `products` and `categories` are reactive ARRAYS, so Shop.vue and Product_List.vue
// keep working exactly as before (products.filter(...), products.slice(...)).
export const products = reactive([])
export const categories = reactive(['All'])

// Use this in a page to show "Loading..." or an error message
export const productState = reactive({ loading: false, error: '' })

export async function loadProducts() {
  productState.loading = true
  productState.error = ''

  try {
    const data = await api.getProducts()
    products.splice(0, products.length, ...data.products)
    categories.splice(0, categories.length, 'All', ...data.categories)
  } catch (err) {
    productState.error = 'Could not load products. Please try again.'
    console.error(err)
  } finally {
    productState.loading = false
  }
}