import {
  BITCOIN,
  BITCOINFRACTAL,
  BITCOINSIGNET,
  BITCOINTESTNET,
} from '@/constants/network';
import type { Network } from '@/types/network';

export function getMempoolConfig(network: Network) {
  switch (network) {
    case BITCOIN:
      return {
        hostname: 'mempool.space',
      };
    case BITCOINSIGNET:
      return {
        hostname: 'mempool.space',
        network: 'signet',
      };
    case BITCOINTESTNET:
      return {
        hostname: 'mempool.space',
        network: 'testnet',
      };
    case BITCOINFRACTAL:
      return {
        hostname: 'mempool.fractalbitcoin.io',
      };
    default:
      return {
        hostname: 'mempool.space',
      };
  }
}
