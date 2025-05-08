import { Network } from '@/constants/network';
import extractPsbt from '@/utils/BTC/psbt/extractPsbt';
import generatePsbt from '@/utils/BTC/psbt/generatePsbt';
import { getTxDetail, getTxHex } from '@/utils/mempool/transaction';
import * as bitcoin from 'bitcoinjs-lib';

/**
 * Asynchronously retrieves transaction details and parses them into input data required by PSBT.
 * @param inputs []
 */
export const getCurInputs = async (network: Network, inputs: Array<any>) => {
  try {
    const curInputs: Array<any> = [];
    await Promise.all(
      inputs.map(async (input) => {
        if (input.txid && input.vout !== undefined && input.vout !== '') {
          const txDetail = await getTxDetail(network, input.txid);
          const txHex = await getTxHex(network, input.txid);
          const output = txDetail.vout[input.vout];
          curInputs.push({
            hash: input.txid,
            index: input.vout,
            sequence: input.sequence,
            nonWitnessUtxo: Buffer.from(txHex, 'hex'),
            witnessUtxo: {
              script: Buffer.from(output.scriptpubkey, 'hex'),
              value: output.value,
            },
          });
        }
      }),
    );
    return curInputs;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getPsbt = (
  curInputs = [],
  outputs = [],
  network = bitcoin.networks.bitcoin,
) => {
  // manually added outputs, ignore invalid ones
  const curOutputs = outputs.filter((output: { address: any; value: any }) => {
    return output.address && output.value;
  });
  const psbt = generatePsbt(curInputs, curOutputs, network);
  return psbt;
};

export const getExtractTx = (psbt = '', network = bitcoin.networks.bitcoin) => {
  try {
    return extractPsbt(psbt, network);
  } catch (err) {
    return err;
  }
};
