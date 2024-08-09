import { BITCOIN, PROVIDER } from '@/constants/network';
import type { Network } from '@/types/network';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { useCallback } from 'react';

// import { monokaiTheme } from '@uiw/react-json-view/monokai';
interface APIButtonProps {
  network?: Network;
  apiName: string;
  title?: string;
  onClick?: () => void;
  onCallback: (result: object) => any;
}

const APIButton: React.FC<APIButtonProps> = (props) => {
  const { network = BITCOIN, apiName, title, onClick, onCallback } = props;

  const onClickBtn = useCallback(async () => {
    if (onClick) {
      onClick();
      return;
    }
    try {
      const result = await window.okxwallet[PROVIDER[network]][apiName]();
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
      <Typography.Title level={4}>{title}</Typography.Title>
      <Button title={apiName} onClick={onClickBtn} icon={<SmileOutlined />}>
        Test {apiName}
      </Button>
    </>
  );
};

export default APIButton;
