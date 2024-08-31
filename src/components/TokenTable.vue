<template>
  <div class="table-container">
    <div v-if="isLoading" class="spinner-container">
      <div class="spinner"></div>
      <span>Loading tokens...</span>
    </div>

    <table v-if="tokens.length !== 0" class="token-table">
      <thead>
        <tr>
          <th>Chain ID</th>
          <th>Symbol</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody v-if="!isLoading">
        <tr v-for="token in tokens" :key="token.id">
          <td>{{ token.chain_id }}</td>
          <td>{{ token.symbol }}</td>
          <td>{{ token.name }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="error">{{ error }}</div>
    <div v-if="tokens.length === 0" class="no-data">No tokens available for the selected network.</div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const tokens = computed(() => store.getters.tokens || store.state.tokens || []);
const selectedNetwork = computed(() => store.getters.selectedNetwork);
const isLoading = computed(() => store.getters.isLoading);
const error = computed(() => store.getters.error);

watch(selectedNetwork, (newNetwork) => {
  if (newNetwork) {
    store.dispatch('fetchTokens', newNetwork);
  }
});

onMounted(() => {
  if (selectedNetwork.value && store.getters.tokens.length === 0) {
    store.dispatch('fetchTokens', selectedNetwork.value);
  }
});
</script>

<style scoped>
.table-container {
  margin-top: 20px;
  text-align: center;
  padding: 20px;
}

.token-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 14px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
}

.token-table th,
.token-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.token-table th {
  background-color: #f2f2f2;
  color: #333;
  font-weight: bold;
}

.token-table tr:nth-child(even) {
  background-color: #fafafa;
}

.no-data {
  font-size: 16px;
  color: #888;
  margin-top: 10px;
}

.spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  left: 0;
  top: 0;
  opacity: 0.5;
  color: blue;
  background-color: gray;
}

.error-message {
  color: red;
  margin-bottom: 16px;
  font-size: 14px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid blue;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
