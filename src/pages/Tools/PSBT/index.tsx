import PSBTSmart from '@/container/PSBTSmart';
import { PageContainer } from '@ant-design/pro-components';
import {
  BitcoinWeb3ConfigProvider,
  OkxWallet,
  UnisatWallet,
  XverseWallet,
} from '@ant-design/web3-bitcoin';

const HomePage: React.FC = () => {
  return (
    <PageContainer ghost>
      <BitcoinWeb3ConfigProvider
        autoConnect
        wallets={[OkxWallet(), XverseWallet(), UnisatWallet()]}
      >
        <PSBTSmart />
      </BitcoinWeb3ConfigProvider>
    </PageContainer>
  );
};

export default HomePage;
