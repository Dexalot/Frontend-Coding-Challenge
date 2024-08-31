<template>
  <div class="dropdown-container">
    <select v-model="selectedNetwork" @change="onNetworkChange" class="network-dropdown">
      <option value="0" selected disabled>--Select Please--</option>
      <option v-for="network in networks" :key="network.chain_id" :value="network.chain_id">
        {{ network.chain_name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const selectedNetwork = computed({
  get: () => store.getters.selectedNetwork,
  set: (value) => store.commit('setSelectedNetwork', value),
});

const networks = computed(() => store.getters.networks);

const onNetworkChange = () => {
  store.commit('setSelectedNetwork', selectedNetwork.value);
};

onMounted(async () => {
  store.dispatch('fetchNetworks');
});
</script>

<style scoped>
.dropdown-container {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.network-dropdown {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 220px;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.network-dropdown:hover {
  border-color: #3498db;
}

.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: #3498db;
}

.error-message {
  color: red;
  margin-bottom: 16px;
  font-size: 14px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
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
