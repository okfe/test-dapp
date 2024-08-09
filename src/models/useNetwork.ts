import { PROVIDER } from '@/constants/network';
import type { Network } from '@/types/network';
import { notification } from 'antd';
import { useCallback, useState } from 'react';

export interface NetworkType<Provider = any> {
  network?: Network;
  provider?: Provider;
  address?: string; // sign for login or not
  error: any;
}
export type NetworkMapType = {
  [key in Network]: NetworkType;
};

// default network is bitcoin. if there is not provider, means no connected
const useNetwork = () => {
  const [networks, setNetwork] = useState<NetworkMapType>({} as NetworkMapType);

  const [api] = notification.useNotification();

  const connectNetwork = useCallback(
    async (network: Network) => {
      if (networks[network]?.address) {
        return;
      }
      try {
        const result = await window.okxwallet[PROVIDER[network]].connect();
        setNetwork({
          ...networks,
          [network]: {
            address: result.address,
            network,
            provider: window.okxwallet[PROVIDER[network]],
          },
        });
      } catch (error) {
        setNetwork({
          ...networks,
          [network]: {
            ...[networks[network]],
            error,
          },
        });
      }
    },
    [setNetwork, api],
  );

  console.log(networks);

  return {
    networks,
    connectNetwork,
  };
};

export default useNetwork;
