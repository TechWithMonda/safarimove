<!-- components/StatsCard.vue -->
<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-500 text-sm font-medium">{{ title }}</p>
        <p class="text-2xl font-bold text-gray-900 mt-1">{{ value }}</p>
      </div>
      <div v-if="icon" class="p-3 rounded-full bg-blue-100 text-blue-600">
        <component :is="icon" class="w-6 h-6" />
      </div>
    </div>
    <div v-if="action" class="mt-4">
      <button 
        @click="$emit('action')"
        class="text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        {{ action }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: [String, Number],
    action: String,
    icon: Object
  },
  emits: ['action']
}
</script>