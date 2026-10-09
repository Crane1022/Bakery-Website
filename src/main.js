import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import { loadProducts } from './store/products'
import Home from './page/HelloWorld.vue'
import Shop from './page/Shop.vue'
import Checkout from './page/Checkout.vue'
import Ingredients from './page/Ingredients.vue'
import Reviews from './page/Reviews.vue'
import Login from './page/Login.vue'
import Register from './page/Register.vue'
import Profile from './page/Profile.vue'

// Define the routes path
const routes = [
  { path: '/Bakery-Website/', component: Home },
  { path: '/Bakery-Website/shop', component: Shop },
  { path: '/Bakery-Website/checkout', component: Checkout },
  { path: '/Bakery-Website/ingredients', component: Ingredients },
  { path: '/Bakery-Website/reviews', component: Reviews },
  { path: '/Bakery-Website/login', component: Login },
  { path: '/Bakery-Website/register', component: Register },
  { path: '/Bakery-Website/profile', component: Profile },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// createApp(App).mount('#app')
// Create the app instance
const app = createApp(App)

// THIS IS THE MISSING LINK:
app.use(router) 

loadProducts() // fetch the products from the Google Sheet

app.mount('#app')
