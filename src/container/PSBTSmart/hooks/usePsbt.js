import generatePsbt from '@/utils/BTC/psbt/generatePsbt';
import {
  getCurInputs,
  pushPsbt,
  signPsbt,
} from '@/utils/business/BTC/psbt/index';
import { getUTXOsFrom } from '@/utils/mempool/utxo';
import { useBitcoinWallet } from '@ant-design/web3-bitcoin';
import { notification } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';

const usePsbt = () => {
  const { account } = useBitcoinWallet();
  const [utxoList, setUtxoList] = useState([]);
  const [selectedUtxo, setSelectedUtxo] = useState([]);
  const [addedInput, setAddedInput] = useState([]);
  const [outputList, setOutputList] = useState([]);
  const [curInputs, setCurInputs] = useState([]);
  const [signedPsbt, setSignedPsbt] = useState('');

  useEffect(() => {
    const getUtxoList = async () => {
      if (account) {
        const utxos = await getUTXOsFrom(account.address);
        setUtxoList(utxos);
      }
    };
    getUtxoList();
  }, [account]);

  useEffect(() => {
    getCurInputs(selectedUtxo.concat(addedInput)).then((inputs) => {
      setCurInputs(inputs);
    });
  }, [selectedUtxo, addedInput]);

  const addInput = (index) => {
    if (index) {
      //在index的下标后添加一个空对象
      const newAddedInput = [...addedInput];
      newAddedInput.splice(index, 0, {});
      setAddedInput(newAddedInput);
      return;
    }
    setAddedInput([...addedInput, {}]);
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
    if (index) {
      //在index的下标后添加一个空对象
      const newOutputList = [...outputList];
      newOutputList.splice(index, 0, {});
      setOutputList(newOutputList);
      return;
    }
    setOutputList([...outputList, {}]);
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
    const outputValid = outputList.every((output) => {
      return output.address && output.value;
    });
    const inputValid = curInputs.length > 0;
    if (outputValid && inputValid) {
      return generatePsbt(curInputs, outputList);
    } else {
      return '';
    }
  }, [curInputs, outputList]);

  useEffect(() => {
    setSignedPsbt('');
  }, [psbt]);

  const getSignedPsbt = useCallback(async () => {
    setSignedPsbt(await signPsbt(psbt));
    return;
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
  };
};
export default usePsbt;
