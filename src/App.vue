<template>
  <nav class="nav-bar">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/about" class="nav-link">About</router-link>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<script setup></script>

<style scoped>
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
