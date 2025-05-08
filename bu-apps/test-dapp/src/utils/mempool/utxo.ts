import { Network } from '@/constants/network';
// Don't use cloudVpn to avoid timeout
import mempoolJS from '@mempool/mempool.js';
import { getMempoolConfig } from './config';

export const getUTXOsFrom = async (
  network: Network,
  address: any,
  after_txid: any,
  limit: number,
) => {
  const config = getMempoolConfig(network);

  try {
    const {
      bitcoin: { addresses },
    } = mempoolJS(config);

    // commitid d875bc250de0f110830042763554200fafcb0b41 上有第二个属性
    const addressTxsUtxo = await addresses.getAddressTxsUtxo({ address });
    if (limit) {
      return addressTxsUtxo.slice(0, limit);
    }
    return addressTxsUtxo;
  } catch (error) {
    console.log(error);
    return [];
  }
};
