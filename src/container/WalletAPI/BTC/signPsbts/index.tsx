import APIButton from '@/components/common/APIButton';
import CodeBox from '@/components/common/CodeBox';
import Connector from '@/components/common/Connector';
import PreviewBox from '@/components/common/PreviewBox';
import { Button, Col, Input, Row, Space } from 'antd';
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

  const demo = useMemo(() => {
    return `try {
      let res = await okxwallet.bitcoin.signPsbts(
        ${JSON.stringify(psbts)}
      );
      console.log(res)
    } catch (e) {
      console.log(e);
    }`;
  }, [psbts]);

  return (
    <Row justify="space-between">
      <Col span={10}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Row>
            <Connector onError={onCallback} />
          </Row>
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
      </Col>
      <Col span={12}>
        <PreviewBox value={result} />
      </Col>
    </Row>
  );
};

export default SignPsbtsSmart;
