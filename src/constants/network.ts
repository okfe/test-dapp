import type { Network } from '@/types/network';

export const BITCOIN: Network = 'bitcoin';
export const BITCOINTESTNET: Network = 'bitcointestnet';
export const BITCOINSIGNET: Network = 'bitcoinsignet';

export const SOLANA: Network = 'solana';

export const PROVIDER = {
  [BITCOIN]: 'bitcoin',
  [BITCOINTESTNET]: 'bitcoinTestnet',
  [BITCOINSIGNET]: 'bitcoinSignet',
  [SOLANA]: 'solana',
};
