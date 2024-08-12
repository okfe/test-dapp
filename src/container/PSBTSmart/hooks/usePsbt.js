import { BITCOIN } from '@/constants/network';

import {
  getCurInputs,
  getPsbt,
  pushPsbt,
  signPsbt,
} from '@/utils/business/BTC/psbt/index';
import { getUTXOsFrom } from '@/utils/mempool/utxo';
import { useModel } from '@umijs/max';
import { notification } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';

const usePsbt = () => {
  const { network } = useModel('useNetwork', (model) => ({
    network: model.networks[BITCOIN],
  }));
  const [utxoList, setUtxoList] = useState([]);
  const [selectedUtxo, setSelectedUtxo] = useState([]);
  const [addedInput, setAddedInput] = useState([]);
  const [outputList, setOutputList] = useState([]);
  const [curInputs, setCurInputs] = useState([]);
  const [signedPsbt, setSignedPsbt] = useState('');
  const [finalized, setFinalized] = useState(false);

  useEffect(() => {
    const getUtxoList = async () => {
      if (network && network.address) {
        const utxos = await getUTXOsFrom(network.address);
        setUtxoList(utxos);
      }
    };
    getUtxoList();
  }, [network]);

  useEffect(() => {
    getCurInputs(selectedUtxo.concat(addedInput)).then((inputs) => {
      setCurInputs(inputs);
    });
  }, [selectedUtxo, addedInput]);

  const addInput = (index) => {
    const pointer = index === undefined ? addedInput.length - 1 : index;
    const newAddedInput = [...addedInput];
    newAddedInput.splice(pointer + 1, 0, {
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
      return getPsbt(curInputs, outputList);
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

  const broadcastTx = useCallback(async () => {
    if (signPsbt) {
      const txId = await pushPsbt(signedPsbt);
      notification.success({
        message: '广播成功',
        description: txId,
      });
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
    broadcastTx,
    getSignedPsbtWithoutFinalize,
    finalized,
  };
};
export default usePsbt;
