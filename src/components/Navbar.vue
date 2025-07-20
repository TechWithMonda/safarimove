<!-- components/Navbar.vue -->
<template>
  <header class="app-header">
      <div class="container">
        <h1 class="app-title">Navigate Nairobi</h1>
        <p class="app-subtitle">Your smart companion for traffic, matatus, and bodabodas</p>
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
<style scoped>
/* Base Styles */
.nairobi-navigator {
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header Styles */
.app-header {
  background-color: #1a5276;
  color: white;
  padding: 2rem 0;
  text-align: center;
  margin-bottom: 2rem;
}

.app-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.app-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}
</style>