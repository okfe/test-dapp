import ConnectSmart from '@/container/WalletAPI/connect';
import { PageContainer } from '@ant-design/pro-components';
import { BitcoinWeb3ConfigProvider, OkxWallet } from '@ant-design/web3-bitcoin';

const ConnectPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <BitcoinWeb3ConfigProvider autoConnect wallets={[OkxWallet()]}>
        <ConnectSmart />
      </BitcoinWeb3ConfigProvider>
    </PageContainer>
  );
};

export default ConnectPage;
