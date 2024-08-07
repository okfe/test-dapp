import GetBalanceSmart from '@/container/WalletAPI/getBalance';
import { PageContainer } from '@ant-design/pro-components';
import { BitcoinWeb3ConfigProvider, OkxWallet } from '@ant-design/web3-bitcoin';

const ConnectPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <BitcoinWeb3ConfigProvider autoConnect wallets={[OkxWallet()]}>
        <GetBalanceSmart />
      </BitcoinWeb3ConfigProvider>
    </PageContainer>
  );
};

export default ConnectPage;
