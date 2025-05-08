import { manifestUrl } from '@/constants/Ton';
import RestoreConnectionSmart from '@/container/WalletAPI/Ton/RestoreConnectionSmart';
import { PageContainer } from '@ant-design/pro-components';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const ConnectPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <RestoreConnectionSmart />
      </TonConnectUIProvider>
    </PageContainer>
  );
};

export default ConnectPage;
