import ConnectSmart from '@/container/WalletAPI/Ton/ConnectSmart';
import { PageContainer } from '@ant-design/pro-components';

const ConnectPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <ConnectSmart />
    </PageContainer>
  );
};

export default ConnectPage;
