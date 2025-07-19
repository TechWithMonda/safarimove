<!-- App.vue -->
<template>
 
    <!-- <Navbar /> -->

      <!-- <Sidebar /> -->
      <main >
        <router-view />
      </main>
   
 
</template>

<script>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  components: {
    Navbar,
    Sidebar
  }
}
</script>