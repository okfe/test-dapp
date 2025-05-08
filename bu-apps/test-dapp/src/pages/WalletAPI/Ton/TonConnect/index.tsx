import { manifestUrl } from '@/constants/Ton';
import TonConnectSmart from '@/container/WalletAPI/Ton/TonConnectSmart';
import { PageContainer } from '@ant-design/pro-components';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const ConnectPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <TonConnectSmart />
      </TonConnectUIProvider>
    </PageContainer>
  );
};

export default ConnectPage;
