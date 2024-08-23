import type { Network, NetworkSwitch } from '@/types/network';

export const BITCOIN: Network = 'bitcoin';
export const BITCOINTESTNET: Network = 'bitcointestnet';
export const BITCOINSIGNET: Network = 'bitcoinsignet';
export const BITCOINFRACTAL: Network = 'bitcoinfractal';

export const SOLANA: Network = 'solana';
export const TON: Network = 'ton';

export const PROVIDER = {
  [BITCOIN]: 'bitcoin',
  [BITCOINTESTNET]: 'bitcoinTestnet',
  [BITCOINSIGNET]: 'bitcoinSignet',
  [BITCOINFRACTAL]: 'bitcoinFractal',
  [SOLANA]: 'solana',
  [TON]: 'okxTonWallet',
};

const providerNotInOkxWallet = [TON];

export const isProviderInOkxWallet = (network: any) => {
  return !providerNotInOkxWallet.includes(network);
};

export const getProvider = (network: Network) => {
  return isProviderInOkxWallet(network)
    ? window.okxwallet[PROVIDER[network]]
    : (window as any)[PROVIDER[network]];
};

export const getProviderCodeString = (network: Network) => {
  return isProviderInOkxWallet(network)
    ? `okxwallet.${PROVIDER[network]}`
    : `${PROVIDER[network]}`;
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
      label: BITCOINFRACTAL + ' (coming soon)',
      disabled: true,
    },
  ],
  [EVM_SWITCH]: [
    {
      key: SOLANA,
      label: SOLANA,
    },
  ],
};
