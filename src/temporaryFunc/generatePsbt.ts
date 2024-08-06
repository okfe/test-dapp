import { getTxDetail, getTxHex } from '@/utils/mempool/transaction';
import * as bitcoin from 'bitcoinjs-lib';

export const generatePsbt = async (
  inputs = [],
  outputs = [],
  network = bitcoin.networks.bitcoin,
) => {
  const psbt = new bitcoin.Psbt({
    network,
  });
  await Promise.all(
    inputs.map(async (input) => {
      const txDetail = await getTxDetail(input.txid);
      const txHex = await getTxHex(input.txid);
      const vout = txDetail.vout[input.vout];
      psbt.addInput({
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
  psbt.setVersion(2);
  outputs.forEach((output) => {
    psbt.addOutput({
      address: output.address,
      value: output.value,
    });
  });
  return psbt.toHex();
};

export default generatePsbt;
