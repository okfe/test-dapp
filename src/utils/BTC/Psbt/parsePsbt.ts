import * as bitcoin from 'bitcoinjs-lib';

export const parsePsbt = (psbt: string, network = bitcoin.networks.bitcoin) => {
  const parsedPsbt = bitcoin.Psbt.fromHex(psbt, {
    network,
  });
  return parsedPsbt;
};

export default parsePsbt;
