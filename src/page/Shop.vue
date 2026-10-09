<script setup>
import { ref, computed } from 'vue'
import { LayoutGrid, Columns2, Search, SlidersHorizontal } from 'lucide-vue-next'
import { products, categories, productState } from '../store/products'
import { useCart } from '../store/cart'

const viewColumns = ref(4) // Default view
const searchQuery = ref('')
const selectedCategory = ref('All')
const sortBy = ref('featured')

const { addToCart } = useCart()

// Filtered and Sorted Logic
const filteredProducts = computed(() => {
  let result = products.filter(p =>
    (selectedCategory.value === 'All' || p.category === selectedCategory.value) &&
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )

  if (sortBy.value === 'price-low') result = [...result].sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-high') result = [...result].sort((a, b) => b.price - a.price)

  return result
})
</script>

<template>
    <div class="pt-32 pb-20 px-6 min-h-screen bg-[#FDFCFB]">
        <div class="max-w-7xl mx-auto">
        
            <!-- Top Bar: Search & View Toggle -->
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div class="relative w-full md:w-96">
                    <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input v-model="searchQuery" type="text" placeholder="Search our bakery..." 
                            class="w-full pl-12 pr-4 py-3 rounded-full border border-stone-200 bg-white focus:ring-2 focus:ring-wabi-moss/20 outline-none transition-all" />
                </div>

                <div class="flex items-center gap-6 self-end">
                    <div class="flex items-center gap-2 bg-stone-100 p-1 rounded-xl">
                        <button @click="viewColumns = 2" :class="{'bg-white shadow-sm': viewColumns === 2}" class="p-2 rounded-lg transition-all">
                            <Columns2 class="w-5 h-5 text-stone-600" />
                        </button>
                        <button @click="viewColumns = 4" :class="{'bg-white shadow-sm': viewColumns === 4}" class="p-2 rounded-lg transition-all">
                            <LayoutGrid class="w-5 h-5 text-stone-600" />
                        </button>
                    </div>
                    <select v-model="sortBy" class="bg-transparent font-bold text-stone-700 outline-none cursor-pointer">
                        <option value="featured">Sort by: Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row gap-12">
                
                <!-- Left Sidebar: Filters -->
                <aside class="w-full lg:w-64 space-y-8">
                <div>
                    <h3 class="flex items-center gap-2 font-black text-stone-900 uppercase tracking-widest text-sm mb-6">
                    <SlidersHorizontal class="w-4 h-4" /> Categories
                    </h3>
                    <div class="space-y-3">
                    <button v-for="cat in categories" :key="cat" 
                            @click="selectedCategory = cat"
                            :class="selectedCategory === cat ? 'text-wabi-moss font-bold translate-x-2' : 'text-stone-500'"
                            class="block transition-all hover:text-wabi-moss">
                        {{ cat }}
                    </button>
                    </div>
                </div>

                <div class="p-6 bg-wabi-moss/5 rounded-[2rem] border border-wabi-moss/10">
                    <p class="text-xs font-bold text-wabi-moss uppercase mb-2">Notice</p>
                    <p class="text-sm text-stone-600 leading-relaxed">All orders placed after 2pm will be baked and shipped the next morning.</p>
                </div>
                </aside>

                <!-- Right Side: Product Grid -->
                <!-- Same card template as the Home page's Product_List.vue, just dropped
                     into a grid that can toggle between 2 and 4 columns. -->
                <div class="flex-1">
                    <div :class="['grid gap-8 transition-all duration-500 grid-cols-1', 
                        viewColumns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'
                    ]">
                        <div v-for="product in filteredProducts" :key="product.id" 
                            class="group cursor-pointer bg-white p-4 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500">

                            <!-- Image Container -->
                            <div class="relative aspect-square overflow-hidden rounded-[1.5rem] mb-6">
                                <span v-if="product.tag" class="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-wabi-moss">
                                    {{ product.tag }}
                                </span>
                                <img :src="product.image" :alt="product.name"
                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>

                            <!-- Product Info -->
                            <div class="space-y-2 px-2">
                                <div class="flex justify-between items-center">
                                    <h3 class="text-xl font-bold text-stone-800">{{ product.name }}</h3>
                                    <span class="text-wabi-moss font-bold">${{ product.price.toFixed(2) }}</span>
                                </div>
                                <p class="text-sm text-stone-500 leading-relaxed">
                                    {{ product.description }}
                                </p>

                                <button
                                    @click="addToCart(product)"
                                    class="w-full mt-4 py-3 rounded-full border border-stone-200 text-stone-700 font-bold text-sm hover:bg-wabi-moss hover:text-white hover:border-wabi-moss transition-all active:scale-95">
                                    Add to Order
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Empty State If No Product -->
                    <div v-if="productState.loading" class="text-center py-20">
                        <p class="text-stone-400 italic font-serif">Loading our bakery...</p>
                    </div>
                    <div v-else-if="productState.error" class="text-center py-20">
                        <p class="text-red-500 font-medium">{{ productState.error }}</p>
                    </div>
                    <div v-else-if="filteredProducts.length === 0" class="text-center py-20">
                        <p class="text-stone-400 italic font-serif">No items found in this category...</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>