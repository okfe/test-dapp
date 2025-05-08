import SignPsbtsSmart from '@/container/WalletAPI/BTC/SignPsbtsSmart';
import { PageContainer } from '@ant-design/pro-components';

const SignPsbtsPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <SignPsbtsSmart />
    </PageContainer>
  );
};

export default SignPsbtsPage;
