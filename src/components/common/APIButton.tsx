import { BTC_SWITCH, PROVIDER } from '@/constants/network';
import type { NetworkSwitch } from '@/types/network';
import { SmileOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Typography } from 'antd';
import { useCallback } from 'react';

// import { monokaiTheme } from '@uiw/react-json-view/monokai';
interface APIButtonProps {
  networkSwitch?: NetworkSwitch;
  apiName: string;
  title?: string;
  onClick?: () => void;
  onCallback: (result: object) => any;
  params?: any[];
}

const APIButton: React.FC<APIButtonProps> = (props) => {
  const {
    networkSwitch = BTC_SWITCH,
    apiName,
    title,
    onClick,
    onCallback,
    params = [],
  } = props;

  const { network } = useModel('SwitchNetworkModel', (model) => ({
    network: model.networkSwitches[networkSwitch],
  }));

  const onClickBtn = useCallback(async () => {
    if (onClick) {
      onClick();
      return;
    }
    try {
      const result = await window.okxwallet[PROVIDER[network]][apiName](
        ...params,
      );
      if (Object.prototype.toString.call(result) === '[object Object]') {
        onCallback(result);
      } else {
        onCallback({ 'API method only returns': result });
      }
    } catch (error) {
      onCallback({ error });
    }
  }, [onCallback, onClick]);

  return (
    <>
      {title ? <Typography.Title level={4}>{title}</Typography.Title> : null}
      <Button title={apiName} onClick={onClickBtn} icon={<SmileOutlined />}>
        Test {apiName}
      </Button>
    </>
  );
};

export default APIButton;
