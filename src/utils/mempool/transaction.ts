import { Network } from '@/types/network';
import mempoolJS from '@mempool/mempool.js';

import { getMempoolConfig } from './config';

export const getTxDetail = async (network: Network, txid: any) => {
  const config = getMempoolConfig(network);
  const {
    bitcoin: { transactions },
  } = mempoolJS(config);

  const tx = await transactions.getTx({ txid });

  return tx;
};

export const getTxHex = async (network: Network, txid: any) => {
  const config = getMempoolConfig(network);
  const {
    bitcoin: { transactions },
  } = mempoolJS(config);

  const txHex = await transactions.getTxHex({ txid });

  return txHex;
};
