<template>
  <main>
    <router-view />
  </main>
</template>

<script setup></script>

<style scoped>
#app {
  display: flex;
}

.nav-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.nav-link {
  margin: 0 10px;
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #1f78c1;
}
</style>
