import generatePsbt from '@/utils/BTC/psbt/generatePsbt';
import { getTxDetail, getTxHex } from '@/utils/mempool/transaction';
import * as bitcoin from 'bitcoinjs-lib';

export const getCurInputs = async (inputs) => {
  const curInputs = [];
  await Promise.all(
    inputs.map(async (input) => {
      if (input.txid && input.vout !== undefined && input.vout !== '') {
        const txDetail = await getTxDetail(input.txid);
        const txHex = await getTxHex(input.txid);
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
};

export const getPsbt = async (
  curInputs = [],
  outputs = [],
  network = bitcoin.networks.bitcoin,
) => {
  const psbt = generatePsbt(curInputs, outputs, network);
  return psbt;
};
