import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { formatTxHash } from '@/utils/business/Common';
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { Button, Col, Flex, Input, InputNumber, Row, Select } from 'antd';
import { debounce } from 'lodash-es';
import React, { useCallback, useMemo } from 'react';
import usePsbt from './hooks/usePsbt';
import styles from './index.less';

const InputItem = ({
  inputItem,
  updateInput,
  addInput,
  subInput,
  index,
}: {
  inputItem: any;
  updateInput: (index: any, input: any) => void;
  addInput: (index: any) => void;
  subInput: (index: any) => void;
  index: any;
}) => {
  const onTxidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const txid = e.target.value;
    updateInput(index, {
      ...inputItem,
      txid,
    });
  };

  const onVoutChange = (vout: any) => {
    updateInput(index, {
      ...inputItem,
      vout,
    });
  };
  return (
    <div>
      <Flex gap="small" align="center">
        {/* {index + 1}. */}
        <Col flex="auto">
          <Input
            value={inputItem.txid}
            onChange={onTxidChange}
            placeholder="填写 txid"
            className={styles.input}
            status={txIdCheckStatus()}
          />
        </Col>
        <Col flex="30%">
          <InputNumber
            value={inputItem.vout}
            onChange={onVoutChange}
            placeholder="填写 vout"
            controls={false}
            className={styles.input}
          />
        </Col>
        <PlusCircleTwoTone
          className={styles.action}
          onClick={() => {
            addInput(index);
          }}
        />
        <MinusCircleTwoTone
          className={styles.action}
          onClick={() => {
            subInput(index);
          }}
        />
      </Flex>
      {txIdCheckStatus() === 'error' && (
        <div className={styles.error}>txid 长度不正确</div>
      )}
    </div>
  );
};

const OutputItem = ({
  outputItem,
  updateOutput,
  index,
  addOutput,
  subOutput,
}: {
  outputItem: any;
  updateOutput: (index: any, output: any) => void;
  index: any;
  addOutput: (index: any) => void;
  subOutput: (index: any) => void;
}) => {
  const onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    updateOutput(index, {
      ...outputItem,
      address,
    });
  };
  const onValueChange = (value: any) => {
    updateOutput(index, {
      ...outputItem,
      value,
    });
  };
  return (
    <Flex gap="small">
      <Col flex="auto">
        <Input
          value={outputItem.address}
          onChange={onAddressChange}
          placeholder="填写地址"
          className={styles.input}
        />
      </Col>
      <Col flex="30%">
        <InputNumber
          value={outputItem.value}
          onChange={onValueChange}
          placeholder="填写数量 sats"
          controls={false}
          className={styles.input}
        />
      </Col>
      <PlusCircleTwoTone
        className={styles.action}
        onClick={() => {
          addOutput(index);
        }}
      />
      <MinusCircleTwoTone
        className={styles.action}
        onClick={() => {
          subOutput(index);
        }}
      />
    </Flex>
  );
};

// 脚手架示例组件
const PSBTSmart: React.FC = () => {
  const {
    utxoList,
    setSelectedUtxo,
    addedInput,
    addInput,
    subInput,
    updateInput,
    outputList,
    addOutput,
    subOutput,
    updateOutput,
    signedPsbt,
    getSignedPsbt,
    getSignedPsbtWithoutFinalize,
    finalized,
    psbt,
    broadcastTx,
  } = usePsbt();

  const utxoOptions = useMemo(() => {
    const options = utxoList.map((item: any, index) => {
      return {
        label: `${formatTxHash(item.txid)} index${item.vout} ${item.value}sats`,
        value: index,
        current: item,
      };
    });
    return options;
  }, [utxoList]);

  const searchUtxo = (input: any, option: any) => {
    const included =
      option.current.txid.includes(input) ||
      option.current.value.toString().includes(input);
    return included;
  };

  const onSelect = (value: number[]) => {
    const selectedUtxo = value.map((index) => {
      return utxoList[index];
    });
    setSelectedUtxo(selectedUtxo);
  };

  const debounceUpdateInput = useCallback(debounce(updateInput, 300), []);

  const debounceUpdateOutput = useCallback(debounce(updateOutput, 300), []);

  const signAble = !!psbt;

  const broadcastAble = !!signedPsbt && finalized;

  const previewData = useMemo(() => {
    return {
      psbt,
      signedPsbt,
    };
  }, [psbt, signedPsbt]);

  return (
    <Row justify="space-between">
      <Col span={10}>
        <Flex gap="large" vertical>
          <Flex>
            <Connector />
          </Flex>
          <Flex gap="middle" vertical>
            <div className={styles.subTitle}>1. 选择 UTXO</div>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              onChange={onSelect}
              options={utxoOptions}
              filterOption={searchUtxo}
            />
          </Flex>
          <Flex gap="middle" vertical>
            <Flex gap="small">
              <div className={styles.subTitle}>2. 手动选择输入(可选)</div>
              <PlusCircleTwoTone className={styles.action} onClick={addInput} />
            </Flex>

            {addedInput.map((inputItem: any, index) => {
              return (
                <InputItem
                  inputItem={inputItem}
                  updateInput={debounceUpdateInput}
                  index={index}
                  key={inputItem.key}
                  addInput={addInput}
                  subInput={subInput}
                />
              );
            })}
          </Flex>
          <Flex gap="middle" vertical>
            <Flex gap="small">
              <div className={styles.subTitle}>3. 设置输出 UTXO</div>
              <PlusCircleTwoTone
                className={styles.action}
                onClick={addOutput}
              />
            </Flex>
            {outputList.map((outputItem: any, index) => {
              return (
                <OutputItem
                  outputItem={outputItem}
                  updateOutput={debounceUpdateOutput}
                  addOutput={addOutput}
                  subOutput={subOutput}
                  index={index}
                  key={outputItem.key}
                />
              );
            })}
          </Flex>
          <Flex gap="middle" vertical>
            <div className={styles.subTitle}>4. 签名 PSBT</div>
            <div>
              <Button onClick={getSignedPsbt} disabled={!signAble}>
                签名
              </Button>
              <Button
                onClick={getSignedPsbtWithoutFinalize}
                disabled={!signAble}
                className={styles.btnGap}
              >
                签名(no finalized)
              </Button>
            </div>
          </Flex>
          <Flex gap="middle" vertical>
            <div className={styles.subTitle}>5. 广播 PSBT</div>
            <div>
              <Button onClick={broadcastTx} disabled={!broadcastAble}>
                广播
              </Button>
            </div>
          </Flex>
        </Flex>
      </Col>
      <Col span={12}>
        <PreviewBox value={previewData} />
      </Col>
    </Row>
  );
};

export default PSBTSmart;
