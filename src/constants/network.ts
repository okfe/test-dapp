import type { Network, NetworkSwitch } from '@/types/network';

export const BITCOIN: Network = 'bitcoin';
export const BITCOINTESTNET: Network = 'bitcointestnet';
export const BITCOINSIGNET: Network = 'bitcoinsignet';
export const BITCOINFRACTAL: Network = 'bitcoinfractal';

export const SOLANA: Network = 'solana';

export const PROVIDER = {
  [BITCOIN]: 'bitcoin',
  [BITCOINTESTNET]: 'bitcoinTestnet',
  [BITCOINSIGNET]: 'bitcoinSignet',
  [BITCOINFRACTAL]: 'bitcoin', // todo: 'bitcoinFractal'
  [SOLANA]: 'solana',
};

// classify network for switch
export const BTC_SWITCH: NetworkSwitch = 'btc';
export const EVM_SWITCH: NetworkSwitch = 'evm';

export const SWITCH_NETWORK_LIST = {
  [BTC_SWITCH]: [
    {
      key: BITCOIN,
      label: BITCOIN,
    },
    {
      key: BITCOINTESTNET,
      label: BITCOINTESTNET,
    },
    {
      key: BITCOINSIGNET,
      label: BITCOINSIGNET,
    },
    {
      key: BITCOINFRACTAL,
      label: BITCOINFRACTAL,
    },
  ],
  [EVM_SWITCH]: [
    {
      key: SOLANA,
      label: SOLANA,
    },
  ],
};
