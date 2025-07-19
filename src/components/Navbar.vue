<!-- components/Navbar.vue -->
<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <h1 class="text-xl font-semibold text-gray-900">Poultry Farm Management System</h1>
      <div class="text-gray-600">
        {{ currentDate }}
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    currentDate() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return new Date().toLocaleDateString('en-US', options)
    }
  }
}
</script>