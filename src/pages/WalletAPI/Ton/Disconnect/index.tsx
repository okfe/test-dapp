import { manifestUrl } from '@/constants/Ton';
import DisconnectSmart from '@/container/WalletAPI/Ton/DisconnectSmart';
import { PageContainer } from '@ant-design/pro-components';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const ConnectPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <DisconnectSmart />
      </TonConnectUIProvider>
    </PageContainer>
  );
};

export default ConnectPage;
