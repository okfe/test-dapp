import { PROVIDER } from '@/constants/network';
import type { Network } from '@/types/network';
import { notification } from 'antd';
import { useCallback, useState } from 'react';

export interface NetworkType<Provider = any> {
  network?: Network;
  provider?: Provider;
  address?: string; // sign for login or not
  error: any;
  onDisconnect?: () => void;
}
export type NetworkMapType = {
  [key in Network]: NetworkType;
};

// default network is bitcoin. if there is not provider, means no connected
const NetworkModel = () => {
  const [networks, setNetwork] = useState<NetworkMapType>({} as NetworkMapType);

  const [api] = notification.useNotification();

  const addDisconnectEvent = useCallback((network: Network) => {
    if (networks[network]?.onDisconnect) {
      return;
    }
    const onDisconnect = () => {
      setNetwork((networks) => ({
        ...networks,
        [network]: {
          ...[networks[network]],
          address: '',
        },
      }));
      // window.okxwallet has not removeEventListener disconnect
    };
    window.okxwallet[PROVIDER[network]].on('disconnect', onDisconnect);
    setNetwork((networks) => ({
      ...networks,
      [network]: {
        ...[networks[network]],
        onDisconnect,
      },
    }));
  }, []);

  const connectNetwork = useCallback(
    async (network: Network) => {
      if (networks[network]?.address) {
        return;
      }
      try {
        const result = await window.okxwallet[PROVIDER[network]].connect();
        addDisconnectEvent(network);
        setNetwork((networks) => ({
          ...networks,
          [network]: {
            address: result.address,
            network,
            provider: window.okxwallet[PROVIDER[network]],
          },
        }));
      } catch (error) {
        setNetwork((networks) => ({
          ...networks,
          [network]: {
            ...[networks[network]],
            error,
          },
        }));
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

export default NetworkModel;
