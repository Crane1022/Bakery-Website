<script setup>
import { ref } from 'vue'
import { Menu, ShoppingBag } from 'lucide-vue-next'
// import BiscuitForm from '../components/Biscuit_Form.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Section_Home from '../components/Section_Home.vue'
import Product_List from '../components/Product_List.vue'

const count = ref(0)

// Data for the image grid
const images = [
  { src: "https://picsum.photos/400/500?random=1", rotate: "rotate-2", border: "rounded-[2rem_3rem_2rem_1rem]" },
  { src: "https://picsum.photos/400/500?random=2", rotate: "-rotate-2", border: "rounded-[1rem_2rem_3rem_2rem]", offset: "mt-12" },
  { src: "https://picsum.photos/400/500?random=3", rotate: "rotate-1", border: "rounded-[3rem_1rem_2rem_2rem]" }
]
</script>

<template>
  <div class="min-h-screen bg-[#FDFCFB]">
    <!-- <Navbar /> -->
    
    <main>
      <Section_Home :images="images"/>
    </main>

    <!-- <Footer /> -->
  </div>
</template>
