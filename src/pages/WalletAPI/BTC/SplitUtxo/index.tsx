import SplitUtxoSmart from '@/container/WalletAPI/BTC/SplitUtxoSmart';
import { PageContainer } from '@ant-design/pro-components';

const SplitUtxoPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <SplitUtxoSmart />
    </PageContainer>
  );
};

export default SplitUtxoPage;
