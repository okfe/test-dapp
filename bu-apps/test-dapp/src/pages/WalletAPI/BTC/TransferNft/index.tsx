import TransferNftSmart from '@/container/WalletAPI/BTC/TransferNftSmart';
import { PageContainer } from '@ant-design/pro-components';

const TransferNftPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <TransferNftSmart />
    </PageContainer>
  );
};

export default TransferNftPage;
