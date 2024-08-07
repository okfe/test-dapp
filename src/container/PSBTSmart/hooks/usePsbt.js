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
    getCurInputs(selectedUtxo).then((inputs) => {
      setCurInputs(inputs);
    });
  }, [selectedUtxo]);

  const addOutput = () => {
    setOutputList([...outputList, {}]);
  };
  const subOutput = () => {
    const newOutputList = [...outputList];
    newOutputList.pop();
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

  const boardcastTx = useCallback(async () => {
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
    addOutput,
    subOutput,
    updateOutput,
    psbt,
    signedPsbt,
    getSignedPsbt,
    boardcastTx,
  };
};
export default usePsbt;
