<script setup>
import BiscuitForm from './Biscuit_Form.vue'
import Product_List from './Product_List.vue';

defineProps({
    images: Array
})
</script>

<template>
    <section id="home" class="relative pt-12 pb-20 sm:pt-24 sm:pb-32 px-6 overflow-hidden">
        <!-- Background Blob -->
        <div class="absolute w-[600px] h-[600px] bg-wabi-moss/10 rounded-full -top-[200px] -left-[100px] blur-3xl -z-10" />

        <div class="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h1 class="text-5xl sm:text-6xl md:text-8xl font-black text-stone-900 tracking-tight">
                Baked with <span class="text-wabi-moss italic font-serif font-medium">Heart.</span>
            </h1>
            <p class="text-lg sm:text-xl md:text-2xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
                Savor the beauty of the perfect crunch. Our artisanal biscuits are slow-baked in small batches using only the finest natural ingredients.
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4 sm:pt-8">
                <button class="w-full sm:w-auto bg-wabi-moss text-white px-10 py-4 rounded-full font-bold shadow-lg hover:-translate-y-1 transition-transform">
                Order Fresh Batch
                </button>
                <button class="w-full sm:w-auto bg-transparent text-stone-700 border-2 border-stone-700 px-10 py-4 rounded-full font-bold hover:bg-stone-100 transition-all">
                Explore
                </button>
            </div>
        </div>

        <!-- Form Integration -->
        <!-- <div class="mt-20 grid grid-cols-1 gap-8 max-w-6xl mx-auto px-4">
        <BiscuitForm />
        </div> -->

        <!-- Gallery -->
        <div class="mt-14 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            <div v-for="(img, i) in images" :key="i" 
                :class="`p-2 bg-stone-200 overflow-hidden shadow-md transition-all duration-700 ${img.border} ${img.rotate} ${img.offset || ''}`">
                <img :src="img.src" alt="Artisan goods" class="w-full h-64 sm:h-80 object-cover rounded-xl" />
            </div>
        </div>
    </section>

    <Product_List/>

    <section id="2nd_Section" class="relative pt-16 pb-16 sm:pt-32 sm:pb-20 px-6 overflow-hidden">
        <div class="absolute w-[500px] h-[500px] bg-wabi-moss/5 rounded-full -top-20 -left-20 blur-3xl -z-10" />
        <div class="absolute w-[300px] h-[300px] bg-orange-100/30 rounded-full bottom-0 right-0 blur-3xl -z-10" />

        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div class="text-left space-y-6">
            <span class="inline-block px-4 py-1.5 bg-wabi-moss/10 text-wabi-moss rounded-full text-sm font-bold tracking-wide uppercase">
                Freshly Baked Daily
            </span>
            
            <h1 class="text-4xl sm:text-5xl md:text-7xl font-black text-stone-900 leading-[1.1] tracking-tight">
                Handcrafted <br/> 
                <span class="text-wabi-moss italic font-serif font-medium">Moments.</span>
            </h1>
            
            <p class="text-lg md:text-xl text-stone-600 leading-relaxed max-w-lg">
                Experience the honest taste of traditional recipes. Our biscuits are made with organic ingredients and a dash of mindfulness, perfect for your daily ritual.
            </p>

            <div class="flex flex-wrap gap-4 pt-4">
                <a href="#form" class="bg-wabi-moss text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-stone-800 transition-all flex items-center gap-2">
                Start Your Order
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                </a>
                <button class="px-8 py-4 rounded-full font-bold text-stone-700 border-2 border-stone-200 hover:bg-stone-50 transition-all">
                View Flavors
                </button>
            </div>

            <div class="flex flex-wrap items-center gap-x-5 gap-y-4 sm:gap-6 pt-8 border-t border-stone-100">
                <div class="text-center">
                <p class="font-bold text-stone-800 text-xl">100%</p>
                <p class="text-xs text-stone-500 uppercase font-bold">Natural</p>
                </div>
                <div class="w-px h-8 bg-stone-200"></div>
                <div class="text-center">
                <p class="font-bold text-stone-800 text-xl">No</p>
                <p class="text-xs text-stone-500 uppercase font-bold">Preservatives</p>
                </div>
                <div class="w-px h-8 bg-stone-200"></div>
                <div class="text-center">
                <p class="font-bold text-stone-800 text-xl">24h</p>
                <p class="text-xs text-stone-500 uppercase font-bold">Fresh Delivery</p>
                </div>
            </div>
            </div>

            <div class="relative group">
            <div class="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-20 hidden md:block rotate-12">
                <p class="text-wabi-moss font-bold text-sm text-center">Best <br/> Seller</p>
            </div>
            
            <div class="relative rounded-[2rem_4rem_2rem_6rem] overflow-hidden shadow-2xl bg-stone-200 h-[320px] sm:h-[420px] lg:h-[500px] w-full">
                <img 
                src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1000&auto=format&fit=crop" 
                alt="Delicious artisanal biscuits" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
            </div>
            </div>
        </div>
    </section>
</template>