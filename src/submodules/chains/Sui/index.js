import { Space } from 'antd-mobile';

import {
  ConnectButton,
  SuiClientProvider,
  WalletProvider,
} from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BlackAddress from '../../components/BlackAddress';
import SignTransaction from './components/SignTransaction';
import { blackAddress, strongBlackAddress } from './const';
import { networkConfig } from './networkConfig';

import '@mysten/dapp-kit/dist/index.css';
import '@radix-ui/themes/styles.css';

const queryClient = new QueryClient();

function Sui() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
        <WalletProvider autoConnect>
          <Space direction="vertical" style={{ width: '100%' }}>
            <ConnectButton />

            <SignTransaction />

            <BlackAddress
              type={BlackAddress.typeMap.eoa}
              address={blackAddress}
            />
            <BlackAddress
              type={BlackAddress.typeMap.strongEoa}
              address={strongBlackAddress}
            />
          </Space>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

const key = 'Sui';
export default {
  key,
  children: <Sui />,
};
