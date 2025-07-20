<!-- components/Navbar.vue -->
<template>
 
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

</style>