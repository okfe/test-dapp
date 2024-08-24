import { Network } from '@/constants/network';
import * as bitcoin from 'bitcoinjs-lib';

export function convertBTCLibNetwork(network: Network) {
  switch (network) {
    case Network.BITCOIN:
      return bitcoin.networks.bitcoin;
    case Network.BITCOINTESTNET:
      return bitcoin.networks.testnet;
    case Network.BITCOINSIGNET:
      return bitcoin.networks.testnet;
    case Network.BITCOINFRACTAL:
      return bitcoin.networks.bitcoin;
    default:
      return bitcoin.networks.bitcoin;
  }
}
