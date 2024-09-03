import { getAPIHandle, getProvider, Network } from '@/constants/network';
import { formatConnectResult } from '@/utils/business/Common/network';
import { notification } from 'antd';
import { useCallback, useState } from 'react';

export interface NetworkType<Provider = any> {
  network?: Network;
  provider?: Provider;
  connectResult?: object | null;
  address?: string; // sign for login or not
  friendlyAddress?: string;
  error?: any;
  onDisconnect?: () => void;
}
export type NetworkMapType = {
  [key in Network]: NetworkType;
};

// default network from caller is bitcoin. if there is not provider, means no connected
const NetworkModel = () => {
  const [networks, setNetwork] = useState<NetworkMapType>({} as NetworkMapType);

  const [api] = notification.useNotification();

  /**
   * add disconnect event to provider, connect event may not on provider like Ton, so we use providerConnect
   * */
  const addDisconnectEvent = useCallback((network: Network) => {
    const providerConnect = getAPIHandle(network);
    if (networks[network]?.onDisconnect) {
      return;
    }
    const onDisconnect = () => {
      setNetwork((networks) => ({
        ...networks,
        [network]: {
          ...networks[network],
          address: '',
          friendlyAddress: '',
        },
      }));
      // window.okxwallet has not removeEventListener disconnect
    };
    providerConnect.on('disconnect', onDisconnect);
    setNetwork((networks) => ({
      ...networks,
      [network]: {
        ...networks[network],
        onDisconnect,
      },
    }));
  }, []);

  const connectNetwork = useCallback(
    async (network: Network, params: any[] = []) => {
      const provider = getProvider(network);
      const providerConnect = getAPIHandle(network);

      if (networks[network]?.address) {
        return;
      }
      try {
        const result = await providerConnect.connect(...params);
        const formatResult = formatConnectResult(network, result);
        addDisconnectEvent(network);
        setNetwork((networks) => ({
          ...networks,
          [network]: {
            address: formatResult.address,
            friendlyAddress: formatResult.friendlyAddress,
            network,
            provider: provider,
          },
        }));
      } catch (error) {
        setNetwork((networks) => ({
          ...networks,
          [network]: {
            ...networks[network],
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
