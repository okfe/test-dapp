import SignMessageSmart from '@/container/WalletAPI/BTC/SignMessageSmart';
import { PageContainer } from '@ant-design/pro-components';

const SignMessagePage: React.FC = () => {
  return (
    <PageContainer ghost>
      <SignMessageSmart />
    </PageContainer>
  );
};

export default SignMessagePage;
