import { useBitcoinWallet } from "@ant-design/web3-bitcoin";
import { useEffect, useMemo, useState } from "react";
import { getUTXOsFrom } from '@/utils/mempool/utxo';
import { getCurInputs } from '@/utils/business/BTC/psbt/index'
import generatePsbt from "@/utils/BTC/psbt/generatePsbt";

const usePsbt = () => {
  const { account } = useBitcoinWallet();
  const [utxoList, setUtxoList] = useState([]);
  const [selectedUtxo, setSelectedUtxo] = useState([]);
  const [outputList, setOutputList] = useState([]);
  const [curInputs, setCurInputs] = useState([]);

  useEffect(() => {
    const getUtxoList = async () => {
      if (account) {
        const utxos = await getUTXOsFrom(account.address)
        setUtxoList(utxos);
      }
    }
    getUtxoList();
  }, [account])

  useEffect(() => {
    getCurInputs(selectedUtxo).then((inputs) => {
      setCurInputs(inputs)
    })
  }, [selectedUtxo])

  const addOutput = () => {
    setOutputList([...outputList, {}]);
  }
  const subOutput = () => {
    const newOutputList = [...outputList];
    newOutputList.pop();
    setOutputList(newOutputList);
  }
  const updateOutput = (index, output) => {
    const newOutputList = [...outputList];
    newOutputList[index] = output;
    setOutputList(newOutputList);
  }


  const psbt = useMemo(() => {
    const outputValid = outputList.every((output) => {
      return output.address && output.value
    })
    const inputValid = curInputs.length > 0;
    if (outputValid && inputValid) {
      return generatePsbt(curInputs, outputList);
    } else {
      return ''
    }
  }, [curInputs, outputList])

  return {
    utxoList,
    selectedUtxo,
    setSelectedUtxo,
    outputList,
    addOutput,
    subOutput,
    updateOutput,
    psbt,
  }
}
export default usePsbt;