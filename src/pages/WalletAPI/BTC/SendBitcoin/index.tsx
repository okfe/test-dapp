import SendBitcoinSmart from '@/container/WalletAPI/BTC/SendBitcoinSmart';
import { PageContainer } from '@ant-design/pro-components';

const SendBitcoinPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <SendBitcoinSmart />
    </PageContainer>
  );
};

export default SendBitcoinPage;
