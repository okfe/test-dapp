import MintSmart from '@/container/WalletAPI/BTC/MintSmart';
import { PageContainer } from '@ant-design/pro-components';

const SignPsbtsPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <MintSmart />
    </PageContainer>
  );
};

export default SignPsbtsPage;
