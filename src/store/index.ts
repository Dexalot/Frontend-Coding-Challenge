import { createStore } from 'vuex';
import axios from 'axios';
import { BigNumber, ethers } from 'ethers';

import { Environments, Tokens } from '@/types/fetch';
import ERC20 from '../../ERC20';

interface State {
  selectedNetworkId: number;
  network: Environments;
  networks: Environments[];
  isLoading: boolean;
  isLoadingBalance: boolean;
  error: string | null;
  tokens: Tokens[];
  balances: Record<string, string>;
}

const store = createStore<State>({
  state: {
    selectedNetworkId: 0,
    network: {
      parentenv: '',
      env: '',
      type: '',
      chain_instance: '',
      chain_id: 0,
      chain_name: '',
      chain_display_name: '',
      native_token_name: '',
      native_token_symbol: '',
      min_native_balance: '',
      lzchain_id: 0,
      lzscanner_url: '',
      chain_wss: '',
      explorer: '',
      token_url: '',
    },
    networks: [],
    isLoadingBalance: false,
    isLoading: false,
    error: null,
    tokens: [],
    balances: {},
  },
  mutations: {
    setSelectedNetworkId(state, environmentId: number) {
      state.selectedNetworkId = environmentId;
      state.network = { ...state.networks.filter((env) => env.chain_id === environmentId)[0] };
    },
    setLoading(state, loading: boolean) {
      state.isLoading = loading;
    },
    setLoadingBalance(state, loading: boolean) {
      state.isLoadingBalance = loading;
    },
    setError(state, error: string | null) {
      state.error = error;
    },
    setNetworks(state, networks: Environments[]) {
      state.networks = networks;
    },
    setTokens(state, tokens: Tokens[]) {
      state.tokens = tokens;
    },
    setTokenBalances(state, balances: Record<string, string>) {
      state.balances = balances;
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
    async fetchTokenBalances({ commit, state }, walletAddress: string) {
      commit('setLoadingBalance', true);
      const balances: Record<string, string> = { ...state.balances };

      try {
        for (const token of state.tokens) {
          const chainReaderUrl = state.network.chain_instance;
          const provider = new ethers.providers.JsonRpcProvider(chainReaderUrl);

          let balance: BigNumber;
          if (token.isnative) {
            balance = await provider.getBalance(walletAddress);
          } else {
            const tokenERC20Contract = new ethers.Contract(token.address, ERC20.abi, provider);
            balance = await tokenERC20Contract.balanceOf(walletAddress);
          }

          const displayValue = ethers.utils.formatUnits(balance, token.evmdecimals);
          balances[token.symbol] = displayValue;

          commit('setTokenBalances', { ...balances });
        }
      } catch (error) {
        commit('setError', `Error fetching token balances. Please try again.`);
      } finally {
        commit('setLoadingBalance', false);
      }
    },
  },
  getters: {
    selectedNetworkId: (state) => state.selectedNetworkId,
    networks: (state) => state.networks,
    isLoading: (state) => state.isLoading,
    error: (state) => state.error,
    tokens: (state) => state.tokens,
    balances: (state) => state.balances,
  },
});

export default store;
