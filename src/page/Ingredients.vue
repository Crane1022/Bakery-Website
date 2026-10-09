<script setup>
import IngredientCard from '../components/Ingredient_Card.vue'

const ingredients = [
  {
    id: 1,
    name: "Wild Honey",
    origin: "Local Apiaries",
    description: "Raw, unfiltered honey harvested by small family apiaries, giving every batch a gentle floral sweetness.",
    tags: ["Unrefined", "Natural Sweetener"],
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Rolled Oats",
    origin: "Organic Farms",
    description: "Whole-grain oats, slow-rolled to keep their fiber and nutty texture intact for a heartier bite.",
    tags: ["Whole Grain", "High Fiber"],
    image: "https://images.unsplash.com/photo-1517686748843-bb360cd1f909?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "70% Dark Cacao",
    origin: "Single-Origin",
    description: "Bean-to-bar dark chocolate sourced from a single-origin cooperative, rich and never overly sweet.",
    tags: ["Fair Trade", "Antioxidant Rich"],
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Hand-Harvested Sea Salt",
    origin: "Coastal Flats",
    description: "Flaky, mineral-rich salt hand-raked from shallow coastal flats to balance our sweeter recipes.",
    tags: ["Mineral Rich", "Unprocessed"],
    image: "https://images.unsplash.com/photo-1518110925495-7b73b4c00e8b?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "French Lavender",
    origin: "Sun-Dried Fields",
    description: "Culinary-grade lavender buds, sun-dried to preserve their delicate aroma for our seasonal flavors.",
    tags: ["Aromatic", "Seasonal"],
    image: "https://images.unsplash.com/photo-1498847335250-c30bd25c9d95?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Cultured European Butter",
    origin: "Small-Batch Dairy",
    description: "Slow-cultured butter with a higher fat content, giving our dough its signature flaky richness.",
    tags: ["Small Batch", "Grass-Fed"],
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=500&auto=format&fit=crop"
  }
]
</script>

<template>
  <div class="pt-10 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 min-h-screen bg-[#FDFCFB]">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-10 md:mb-16 space-y-4 max-w-2xl mx-auto">
        <span class="inline-block px-4 py-1.5 bg-wabi-moss/10 text-wabi-moss rounded-full text-sm font-bold tracking-wide uppercase">
          What Goes In
        </span>
        <h1 class="text-4xl md:text-6xl font-black text-stone-900 tracking-tight">
          Our <span class="text-wabi-moss italic font-serif font-medium">Ingredients.</span>
        </h1>
        <p class="text-lg text-stone-600 leading-relaxed">
          No shortcuts, no fillers. Every biscuit starts with a short list of honest, traceable ingredients.
        </p>
      </div>

      <!-- Responsive Ingredient Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <IngredientCard
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          :ingredient="ingredient"
        />
      </div>

      <!-- Sourcing Note -->
      <div class="mt-14 md:mt-20 p-6 md:p-12 bg-wabi-moss/5 border border-wabi-moss/10 rounded-[2.5rem] text-center max-w-3xl mx-auto">
        <p class="text-stone-600 leading-relaxed">
          We work directly with small farms and cooperatives whenever we can. If an ingredient isn't organic or
          fair-trade, it's because we haven't found a source we trust yet — not because we cut corners.
        </p>
      </div>

    </div>
  </div>
</template>