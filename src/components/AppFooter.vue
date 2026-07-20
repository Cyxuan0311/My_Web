<template>
  <footer class="site-footer container">
    <p>&copy; {{ year }} Frames</p>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  setup() {
    const year = new Date().getFullYear()
    return { year }
  }
}
</script>

<style scoped>
.site-footer {
  padding: 2rem 0;
  border-top: 1px solid var(--border);
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-mute);
}
</style>
