import {
  BITCOIN,
  BITCOINFRACTAL,
  BITCOINSIGNET,
  BITCOINTESTNET,
} from '@/constants/network';
import { Network } from '@/types/network';
import * as bitcoin from 'bitcoinjs-lib';

export function convertBTCLibNetwork(network: Network) {
  switch (network) {
    case BITCOIN:
      return bitcoin.networks.bitcoin;
    case BITCOINTESTNET:
      return bitcoin.networks.testnet;
    case BITCOINSIGNET:
      return bitcoin.networks.testnet;
    case BITCOINFRACTAL:
      return bitcoin.networks.bitcoin;
    default:
      return bitcoin.networks.bitcoin;
  }
}
