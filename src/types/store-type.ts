import { Environments, Tokens } from './fetch-type';

export type NetworkStoreState = {
  selectedNetworkId: number;
  network: Environments;
  networks: Environments[];
  isLoading: boolean;
  tokens: Tokens[];
  balances: Record<string, string>;
};
