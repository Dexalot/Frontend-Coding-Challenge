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
          <th>Balance</th>
        </tr>
      </thead>
      <tbody v-if="!isLoading">
        <tr v-for="token in tokens" :key="token.id">
          <td>{{ token.chain_id }}</td>
          <td>{{ token.symbol }}</td>
          <td>{{ token.name }}</td>
          <td>{{ balances[token.symbol] || 'Loading...' }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="tokens.length === 0" class="no-data">No tokens available for the selected network.</div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const tokens = computed(() => store.getters.tokens || store.state.tokens || []);
const selectedNetworkId = computed(() => store.getters.selectedNetworkId);
const isLoading = computed(() => store.getters.isLoading);
const balances = computed(() => store.getters.balances);

const walletAddress = '0x0B1d5f23d1c10708ac0e63AD1e4F104a912eeF6d';

const fetchTokensAndBalances = async (networkId) => {
  store.commit('setTokenBalances', []);
  await store.dispatch('fetchTokens', networkId);
  await store.dispatch('fetchTokenBalances', walletAddress);
};

watch(selectedNetworkId, (networkId) => {
  if (networkId) {
    fetchTokensAndBalances(networkId);
  }
});

onMounted(() => {
  if (selectedNetworkId.value) {
    fetchTokensAndBalances(selectedNetworkId.value);
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

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid blue;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@media screen and (max-width: 400px) {
  .table-container {
    padding: 0;
  }
  .token-table td {
    border: 1px solid #ddd;
    text-align: left;
    font-size: 10px;
    padding: 5px;
  }
  .token-table th {
    font-size: 10px;
    padding: 5px;
  }
}

@media screen and (min-width: 400px) and (max-width: 475px) {
  .table-container {
    padding: 0;
  }
  .token-table td {
    border: 1px solid #ddd;
    text-align: left;
    font-size: 12px;
  }
  .token-table th {
    font-size: 12px;
    padding: 5px;
  }
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
