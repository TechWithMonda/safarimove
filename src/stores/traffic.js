import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTrafficStore = defineStore('traffic', () => {
  const updates = ref([])
  
  const addUpdate = (newUpdate) => {
    updates.value.unshift(newUpdate)
  }
  
  const setUpdates = (newUpdates) => {
    updates.value = newUpdates
  }
  
  const recentUpdates = computed(() => updates.value)
  
  return { updates, addUpdate, setUpdates, recentUpdates }
})