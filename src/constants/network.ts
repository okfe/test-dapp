export type BTCNetwork = 'mainnet' | 'testnet' | 'signet';

export const MAINNET: BTCNetwork = 'mainnet';
export const TESTNET: BTCNetwork = 'testnet';
export const SIGNET: BTCNetwork = 'signet';

export const PROVIDER = {
  [MAINNET]: 'bitcoin',
  [TESTNET]: 'bitcoinTestnet',
  [SIGNET]: 'bitcoinSignet',
};
