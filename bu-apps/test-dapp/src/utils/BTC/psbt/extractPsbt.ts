import * as bitcoin from 'bitcoinjs-lib';

export const extractPsbt = (
  signedPsbt: string,
  network = bitcoin.networks.bitcoin,
) => {
  const psbt = bitcoin.Psbt.fromHex(signedPsbt, {
    network,
  });
  const rawTx = psbt.extractTransaction().toHex();
  return rawTx;
};

export default extractPsbt;
