import { manifestUrl } from '@/constants/Ton';
import SendSmart from '@/container/WalletAPI/Ton/SendSmart';
import { PageContainer } from '@ant-design/pro-components';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const ConnectPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <SendSmart />
      </TonConnectUIProvider>
    </PageContainer>
  );
};

export default ConnectPage;
