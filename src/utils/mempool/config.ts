import { Network } from '@/constants/network';

export function getMempoolConfig(network: Network) {
  switch (network) {
    case Network.BITCOIN:
      return {
        hostname: 'mempool.space',
      };
    case Network.BITCOINSIGNET:
      return {
        hostname: 'mempool.space',
        network: 'signet',
      };
    case Network.BITCOINTESTNET:
      return {
        hostname: 'mempool.space',
        network: 'testnet',
      };
    case Network.BITCOINFRACTAL:
      return {
        hostname: 'mempool.fractalbitcoin.io',
      };
    default:
      return {
        hostname: 'mempool.space',
      };
  }
}
