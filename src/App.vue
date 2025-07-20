<!-- App.vue -->
<template>
 
    <Navbar />

      <!-- <Sidebar /> -->
      <main >
        <router-view />
      </main>

      <Footer />
   
 
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>