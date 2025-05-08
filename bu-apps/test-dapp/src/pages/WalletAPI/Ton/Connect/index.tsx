import { manifestUrl } from '@/constants/Ton';
import ConnectSmart from '@/container/WalletAPI/Ton/ConnectSmart';
import { PageContainer } from '@ant-design/pro-components';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const ConnectPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <ConnectSmart />
      </TonConnectUIProvider>
    </PageContainer>
  );
};

export default ConnectPage;
