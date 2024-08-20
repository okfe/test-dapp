import { BITCOIN, BTC_SWITCH, EVM_SWITCH, SOLANA } from '@/constants/network';
import type { Network, NetworkSwitch } from '@/types/network';
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
    [BTC_SWITCH]: BITCOIN,
    [EVM_SWITCH]: SOLANA,
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
