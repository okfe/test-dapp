import { Network, NetworkSwitch } from '@/constants/network';
import { useCallback, useState } from 'react';

export type SwitchNetworkType = Network;

export type SwitchNetworkMapType = {
  [key in NetworkSwitch]: SwitchNetworkType;
};

/**
 * SwitchNetworkModel is for controlling only one of the same series of networks on different pages is interacted with.
 * If you switch to signet for btc, you will interacted with all api in signet.
 */
const SwitchNetworkModel = () => {
  const [networkSwitches, setSwitchNetworks] = useState<SwitchNetworkMapType>({
    [NetworkSwitch.BTC]: Network.BITCOIN,
    [NetworkSwitch.EVM]: Network.SOLANA,
    [NetworkSwitch.TON]: Network.TON,
  } as SwitchNetworkMapType);

  const setSwitchNetwork = useCallback(
    (networkSwitch: NetworkSwitch, network: SwitchNetworkType) => {
      setSwitchNetworks((networkSwitches) => ({
        ...networkSwitches,
        [networkSwitch]: network,
      }));
    },
    [setSwitchNetworks],
  );

  console.log('networkSwitches: ', networkSwitches);

  return {
    networkSwitches,
    setSwitchNetwork,
  };
};

export default SwitchNetworkModel;
