import { BITCOIN, BITCOINTESTNET } from '@/constants/network';
import { Network } from '@/types/network';
import * as bitcoin from 'bitcoinjs-lib';

export function convertBTCLibNetwork(network: Network) {
  switch (network) {
    case BITCOIN:
      return bitcoin.networks.bitcoin;
    case BITCOINTESTNET:
      return bitcoin.networks.testnet;
    default:
      return bitcoin.networks.bitcoin;
  }
}
