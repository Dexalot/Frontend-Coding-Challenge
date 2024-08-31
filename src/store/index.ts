import { createStore } from 'vuex';
import axios from 'axios';

import { Tokens } from '@/types/fetch';

const store = createStore({
  state: {
    selectedNetwork: 0,
    networks: [],
    isLoading: false,
    error: null,
    tokens: [],
  },
  mutations: {
    setSelectedNetwork(state, network) {
      state.selectedNetwork = network;
    },
    setLoading(state, loading) {
      state.isLoading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
    setNetworks(state, networks) {
      state.networks = networks;
    },
    setTokens(state, tokens) {
      state.tokens = tokens;
    },
  },
  actions: {
    async fetchNetworks({ commit, state }) {
      if (state.networks.length === 0) {
        commit('setLoading', true);
        commit('setError', null);
        try {
          const response = await axios.get('/api/privapi/trading/environments', {
            headers: {
              Accept: 'application/json',
            },
          });
          commit('setNetworks', response.data);
        } catch (error) {
          commit('setError', 'Error fetching networks. Please try again.');
        } finally {
          commit('setLoading', false);
        }
      }
    },
    async fetchTokens({ commit }, networkId) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const response = await axios.get('/api/privapi/trading/tokens', {
          headers: {
            Accept: 'application/json',
          },
        });
        const filteredTokens = response.data.filter((token: Tokens) => token.chain_id === networkId);
        commit('setTokens', filteredTokens);
      } catch (error) {
        commit('setError', 'Error fetching tokens. Please try again.');
      } finally {
        commit('setLoading', false);
      }
    },
  },
  getters: {
    selectedNetwork: (state) => state.selectedNetwork,
    networks: (state) => state.networks,
    isLoading: (state) => state.isLoading,
    error: (state) => state.error,
    tokens: (state) => state.tokens,
  },
});

export default store;
