import WatchAssetSmart from '@/container/WalletAPI/BTC/WatchAssetSmart';
import { PageContainer } from '@ant-design/pro-components';

const WatchAssetPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <WatchAssetSmart />
    </PageContainer>
  );
};

export default WatchAssetPage;
