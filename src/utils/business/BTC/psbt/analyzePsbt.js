function _extractTx(psbt) {
  try {
    return psbt.extractTransaction(true);
  } catch (err) {}
}

function reverseBuffer(buffer) {
  if (buffer.length < 1) return buffer;
  let j = buffer.length - 1;
  let tmp = 0;
  for (let i = 0; i < buffer.length / 2; i++) {
    tmp = buffer[i];
    buffer[i] = buffer[j];
    buffer[j] = tmp;
    j--;
  }
  return buffer;
}

export const analyzePsbt = (psbt) => {
  if (!psbt) {
    return;
  }
  const tx = _extractTx(psbt);
  const inputs = (psbt.txInputs || []).map((input, index) => {
    const previousTx = (psbt.data.inputs[index] || {}).nonWitnessUtxo;
    const witnessScript = (psbt.data.inputs[index] || {}).witnessScript;
    const witnessUtxo = (psbt.data.inputs[index] || {}).witnessUtxo;
    const redeemScript = (psbt.data.inputs[index] || {}).redeemScript;
    const sighashType = (psbt.data.inputs[index] || {}).sighashType;
    const bip32Derivation = (psbt.data.inputs[index] || {}).bip32Derivation;

    const finalScriptSig = (psbt.data.inputs[index] || {}).finalScriptSig;
    const finalScriptWitness = (psbt.data.inputs[index] || {})
      .finalScriptWitness;

    const utxo = {};
    if (redeemScript) {
      utxo.redeem = {
        output: redeemScript,
      };
    }
    if (witnessUtxo) {
      utxo.value = witnessUtxo.value;
      utxo.script = witnessUtxo.script;
      utxo.witnessScript = witnessScript;
    }

    const witness = finalScriptWitness ? tx && tx.ins[index].witness : null;

    const publicKeysList = (bip32Derivation || []).map((derivation) => ({
      fingerprint: derivation.masterFingerprint
        ? derivation.masterFingerprint.toString('hex')
        : '',
      publicKey: derivation.pubkey ? derivation.pubkey.toString('hex') : '',
      path: derivation.path,
    }));

    return {
      sequence: input.sequence,
      index: input.index,
      hash: input.hash
        ? reverseBuffer(Buffer.from(input.hash, 'hex')).toString('hex')
        : '',
      previousTxHex: previousTx ? previousTx.toString('hex') : '',
      utxo,
      script: finalScriptSig,
      redeemScript,
      witnessScript,
      witness,
      sighashType,
      publicKeysList,
    };
  });
  const outputs = (psbt.txOutputs || []).map((output, index) => {
    const bip32Derivation = (psbt.data.outputs[index] || {}).bip32Derivation;

    const publicKeysList = (bip32Derivation || []).map((derivation) => ({
      fingerprint: derivation.masterFingerprint
        ? derivation.masterFingerprint.toString('hex')
        : '',
      publicKey: derivation.pubkey ? derivation.pubkey.toString('hex') : '',
      path: derivation.path,
    }));
    return {
      value: output.value,
      script: output.script,
      address: psbt.txOutputs[index].address || '',
      publicKeysList,
    };
  });
  return {
    inputs,
    outputs,
  };
};
