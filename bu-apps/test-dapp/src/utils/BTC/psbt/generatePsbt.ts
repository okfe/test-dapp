import * as ecc from '@bitcoinerlab/secp256k1';
import * as bitcoin from 'bitcoinjs-lib';

export const generatePsbt = (
  inputs = [],
  outputs = [],
  network = bitcoin.networks.bitcoin,
) => {
  bitcoin.initEccLib(ecc);
  const psbt = new bitcoin.Psbt({
    network,
  });
  inputs.forEach((input) => {
    psbt.addInput(input);
  });
  psbt.setVersion(2);
  outputs.forEach((output: any) => {
    psbt.addOutput({
      address: output.address,
      value: output.value,
    });
  });
  return psbt.toHex();
};

export default generatePsbt;
