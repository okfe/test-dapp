import generatePsbt from '@/utils/BTC/psbt/generatePsbt';
import { getTxDetail, getTxHex } from '@/utils/mempool/transaction';
import * as bitcoin from 'bitcoinjs-lib';

export const getCurInputs = async (inputs) => {
  const curInputs = [];
  await Promise.all(
    inputs.map(async (input) => {
      const txDetail = await getTxDetail(input.txid);
      const txHex = await getTxHex(input.txid);
      const vout = txDetail.vout[input.vout];
      curInputs.push({
        hash: input.txid,
        index: input.vout,
        sequence: input.sequence,
        nonWitnessUtxo: Buffer.from(txHex, 'hex'),
        witnessUtxo: {
          script: Buffer.from(vout.scriptpubkey, 'hex'),
          value: vout.value,
        },
      });
    }),
  );
  return curInputs;
}

export const getPsbt = async (
  curInputs = [],
  outputs = [],
  network = bitcoin.networks.bitcoin,
) => {
  const psbt = generatePsbt(curInputs, outputs, network);
  return psbt;
};
