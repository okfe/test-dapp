import SendBitcoinSmart from '@/container/WalletAPI/BTC/sendBitcoin';
import { PageContainer } from '@ant-design/pro-components';

const SendBitcoinPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <SendBitcoinSmart />
    </PageContainer>
  );
};

export default SendBitcoinPage;
