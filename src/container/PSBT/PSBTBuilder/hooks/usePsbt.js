import { BITCOIN } from '@/constants/network';

import {
  getCurInputs,
  getExtractTx,
  getPsbt,
  pushPsbt,
  signPsbt,
} from '@/utils/business/BTC/psbt/index';
import { getUTXOsFrom } from '@/utils/mempool/utxo';
import { useModel } from '@umijs/max';
import { useCallback, useEffect, useMemo, useState } from 'react';

const usePsbt = () => {
  const { network } = useModel('NetworkModel', (model) => ({
    network: model.networks[BITCOIN],
  }));
  const [utxoList, setUtxoList] = useState([]);
  const [selectedUtxo, setSelectedUtxo] = useState([]);
  const [addedInput, setAddedInput] = useState([]); // manually edit
  const [outputList, setOutputList] = useState([]);
  const [curInputs, setCurInputs] = useState([]); // all inputs with data that psbt needs
  const [signedPsbt, setSignedPsbt] = useState('');
  const [finalized, setFinalized] = useState(false);
  const [rawTx, setRawTx] = useState('');
  const [txId, setTxid] = useState('');

  useEffect(() => {
    const getUtxoList = async () => {
      if (network && network.address) {
        const utxos = await getUTXOsFrom(network.address);
        setUtxoList(utxos);
      }
    };
    getUtxoList();
  }, [network]);

  // addedInput: manually input, maybe other's input
  useEffect(() => {
    try {
      getCurInputs(selectedUtxo.concat(addedInput)).then((inputs) => {
        setCurInputs(inputs);
      });
    } catch (err) {
      console.error(err);
    }
  }, [selectedUtxo, addedInput]);

  const addInput = (index) => {
    const pointer = index === undefined ? addedInput.length : index + 1;
    const newAddedInput = [...addedInput];
    newAddedInput.splice(pointer, 0, {
      key: new Date().getTime(),
    });
    setAddedInput(newAddedInput);
  };

  const subInput = (index) => {
    const newAddedInput = [...addedInput];
    newAddedInput.splice(index, 1);
    setAddedInput(newAddedInput);
  };

  const updateInput = (index, input) => {
    const newAddedInput = [...addedInput];
    newAddedInput[index] = input;
    setAddedInput(newAddedInput);
  };

  const addOutput = (index) => {
    const pointer = index === undefined ? outputList.length - 1 : index;
    const newOutputList = [...outputList];
    newOutputList.splice(pointer + 1, 0, {
      key: new Date().getTime(),
    });
    setOutputList(newOutputList);
  };
  const subOutput = (index) => {
    const newOutputList = [...outputList];
    newOutputList.splice(index, 1);
    setOutputList(newOutputList);
  };
  const updateOutput = (index, output) => {
    const newOutputList = [...outputList];
    newOutputList[index] = output;
    setOutputList(newOutputList);
  };

  const psbt = useMemo(() => {
    const inputValid = curInputs.length > 0;
    if (inputValid) {
      try {
        return getPsbt(curInputs, outputList);
      } catch (err) {
        return err;
      }
    } else {
      return '';
    }
  }, [curInputs, outputList]);

  useEffect(() => {
    setSignedPsbt('');
  }, [psbt]);

  const getSignedPsbt = useCallback(async () => {
    setSignedPsbt(await signPsbt(psbt));
    setFinalized(true);
  }, [psbt]);

  const getSignedPsbtWithoutFinalize = useCallback(async () => {
    setSignedPsbt(
      await signPsbt(psbt, {
        autoFinalized: false,
      }),
    );
    setFinalized(false);
  }, [psbt]);

  const extractTx = useCallback(async () => {
    if (signPsbt) {
      const rawTx = await getExtractTx(signedPsbt);
      setRawTx(rawTx);
    }
  }, [signedPsbt]);

  const broadcastTx = useCallback(async () => {
    if (signPsbt) {
      const curTxId = await pushPsbt(signedPsbt);
      setTxid(curTxId);
    }
  }, [signedPsbt]);

  return {
    utxoList,
    selectedUtxo,
    setSelectedUtxo,
    outputList,
    addedInput,
    addInput,
    subInput,
    updateInput,
    addOutput,
    subOutput,
    updateOutput,
    psbt,
    signedPsbt,
    getSignedPsbt,
    rawTx,
    extractTx,
    broadcastTx,
    getSignedPsbtWithoutFinalize,
    finalized,
    txId,
  };
};
export default usePsbt;
