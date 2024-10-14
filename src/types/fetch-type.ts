export type Tokens = {
  address: string;
  auctionendtime: number | null;
  auctionmode: number;
  chain_id: number;
  env: string;
  evmdecimals: number;
  isnative: boolean;
  isvirtual: boolean;
  min_depositamnt: string;
  name: string;
  old_symbol: string | null;
  status: string;
  subnet_symbol: string;
  symbol: string;
};

export type Environments = {
  parentenv: string;
  env: string;
  type: string;
  chain_instance: string;
  chain_id: number;
  chain_name: string;
  chain_display_name: string;
  native_token_name: string;
  native_token_symbol: string;
  min_native_balance: string;
  lzchain_id: number;
  lzscanner_url: string;
  chain_wss: string;
  explorer: string;
  token_url: string;
};
