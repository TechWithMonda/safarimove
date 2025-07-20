<!-- components/StatsCard.vue -->
<template>
    <footer class="app-footer">
      <div class="container">
        <p>© 2023 Navigate Nairobi. All rights reserved.</p>
        <div class="footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
</template>

<script>

</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.app-footer {
  background: #1a5276;
  color: white;
  padding: 2rem 0;
  margin-top: 3rem;
  text-align: center;
}

.footer-links {
  margin-top: 1rem;
}

.footer-links a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

</style>