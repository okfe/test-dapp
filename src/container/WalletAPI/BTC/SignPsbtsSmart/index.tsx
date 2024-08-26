import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { getProviderCodeString, NetworkSwitch } from '@/constants/network';
import { useModel } from '@umijs/max';
import { Button, Input, Row, Space } from 'antd';
import React, { useMemo, useState } from 'react';

const PsbtItem = ({ index, onChange, psbts }) => {
  return (
    <Input
      value={psbts[index]}
      onChange={(e) => {
        onChange(e, index);
      }}
      placeholder="填写PSBT"
    />
  );
};

const SignPsbtsSmart: React.FC = () => {
  const [result, setResult] = useState({});
  const [psbts, setPsbts] = useState([]);

  const onCallback = async (result: object) => {
    setResult(result);
  };

  const onChange = (e, index) => {
    const newPsbts = [...psbts];
    newPsbts[index] = e.target.value;
    setPsbts(newPsbts);
  };

  const onAdd = () => {
    setPsbts([...psbts, '']);
  };
  const onSub = () => {
    setPsbts(psbts.slice(0, psbts.length - 1));
  };

  const { network } = useModel('SwitchNetworkModel', (model) => ({
    network: model.networkSwitches[NetworkSwitch.BTC],
  }));

  const demo = useMemo(() => {
    const needSignPsbts = psbts.length
      ? psbts
      : ['70736274ff01007d...', '70736274ff01007d...'];
    return `try {
      let res = await ${getProviderCodeString(network)}.signPsbts(
        ${JSON.stringify(needSignPsbts)}
      );
      console.log(res)
    } catch (e) {
      console.log(e);
    }`;
  }, [network, psbts]);

  return (
    <PreviewLayout previewData={result}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Connector onError={onCallback} />
        <Row>
          <Button onClick={onAdd}>添加</Button>
          <Button onClick={onSub}>减少</Button>
        </Row>
        {psbts.map((_, index) => {
          return (
            <PsbtItem
              key={index}
              index={index}
              onChange={onChange}
              psbts={psbts}
            />
          );
        })}
        <APIButton
          apiName="signPsbts"
          onCallback={onCallback}
          params={[psbts]}
        />
        <CodeBox text={demo} />
      </Space>
    </PreviewLayout>
  );
};

export default SignPsbtsSmart;
