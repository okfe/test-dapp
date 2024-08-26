import BlackAddress from '@/components/BlackAddress';
import CodeBox from '@/components/common/CodeBox';
import PreviewLayout from '@/components/common/Layout/PreviewLayout';
import { blackAddress, strongBlackAddress } from '@/constants/Ton/const';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import { Space } from 'antd';
import { useMemo } from 'react';
import SignTransaction from './components/SignTransaction';

function Ton() {
  const wallet = useTonWallet();

  const demo = useMemo(() => {
    return `
      // connect with okxwallet
      // then useTonWallet() will get the wallet info
    `;
  }, []);

  return (
    <PreviewLayout previewData={wallet || {}}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <TonConnectButton />
        <CodeBox text={demo} />
        <SignTransaction />
        <BlackAddress type={BlackAddress.typeMap.eoa} address={blackAddress} />
        <BlackAddress
          type={BlackAddress.typeMap.strongEoa}
          address={strongBlackAddress}
        />
      </Space>
    </PreviewLayout>
  );
}

export default Ton;
