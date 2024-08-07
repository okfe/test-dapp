import extractPsbt from '@/utils/BTC/psbt/extractPsbt';
import { ConnectButton, Connector } from '@ant-design/web3';

import { WalletColorful } from '@ant-design/web3-icons';
import { Button, Input, InputNumber, Layout, Row, Select, Typography } from 'antd';
import React, { useMemo } from 'react';
import styles from './index.less';
import usePsbt from './hooks/usePsbt';
import { value } from 'valibot';

const OutputItem = ({ outputItem, updateOutput, index }) => {
  const onAddressChange = (e) => {
    const address = e.target.value;
    updateOutput(index, {
      ...outputItem,
      address
    });
  }
  const onValueChange = (value) => {
    updateOutput(index, {
      ...outputItem,
      value
    });
  }
  return <Row>
    <Input value={outputItem.address} onChange={onAddressChange} placeholder='填写地址' />
    <InputNumber value={outputItem.value} onChange={onValueChange} placeholder='填写value' />
  </Row>
}

// 脚手架示例组件
const PSBTSmart: React.FC = () => {
  const {
    utxoList,
    setSelectedUtxo,
    outputList,
    addOutput,
    subOutput,
    updateOutput,
    psbt,
  } = usePsbt();

  const utxoOptions = useMemo(() => {
    const options = utxoList.map((item, index) => {
      return {
        label: `${item.value}sats`,
        value: index,
      }
    })
    return options;
  }, [utxoList])

  const onSelect = (value: number[]) => {
    const selectedUtxo = value.map((index) => {
      return utxoList[index]
    })
    setSelectedUtxo(selectedUtxo);
  }

  return (
    <Layout>
      <Row>
        <Typography.Title level={3} className={styles.title}>
          快速构建 PSBT!
        </Typography.Title>
      </Row>
      <Row>
        <Connector
          modalProps={{
            group: false,
            mode: 'simple',
          }}
        >
          <ConnectButton icon={<WalletColorful />} />
        </Connector>
      </Row>
      <Row>
        <Typography.Title level={4} className={styles.subTitle}>
          1.选择UTXO
        </Typography.Title>
      </Row>
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select"
        onChange={onSelect}
        options={utxoOptions}
      />
      <Row>
        <Typography.Title level={4} className={styles.subTitle}>
          2.设置输出UTXO
        </Typography.Title>
        <Button onClick={addOutput}>添加</Button>
        <Button onClick={subOutput}>减少</Button>
      </Row>
      {outputList.map((outputItem, index) => {
        return <OutputItem outputItem={outputItem} updateOutput={updateOutput} index={index} key={index} />
      })}
      <Row>
        {`PSBT: ${psbt}`}
      </Row>
    </Layout>
  );
};

export default PSBTSmart;
