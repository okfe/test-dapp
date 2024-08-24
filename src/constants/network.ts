export enum Network {
  BITCOIN = 'bitcoin',
  BITCOINTESTNET = 'bitcointestnet',
  BITCOINSIGNET = 'bitcoinsignet',
  BITCOINFRACTAL = 'bitcoinfractal',
  SOLANA = 'solana',
  TON = 'ton',
}

export const PROVIDER = {
  [Network.BITCOIN]: 'bitcoin',
  [Network.BITCOINTESTNET]: 'bitcoinTestnet',
  [Network.BITCOINSIGNET]: 'bitcoinSignet',
  [Network.BITCOINFRACTAL]: 'bitcoinFractal',
  [Network.SOLANA]: 'solana',
  [Network.TON]: 'okxTonWallet',
};

const providerNotInOkxWallet = [Network.TON];

export const isProviderInOkxWallet = (network: any) => {
  return !providerNotInOkxWallet.includes(network);
};

export const getProvider = (network: Network) => {
  return isProviderInOkxWallet(network)
    ? window.okxwallet[PROVIDER[network]]
    : (window as any)[PROVIDER[network]];
};

export const getProviderCodeString = (network: Network) => {
  return isProviderInOkxWallet(network)
    ? `okxwallet.${PROVIDER[network]}`
    : `${PROVIDER[network]}`;
};

// classify network for switch
export enum NetworkSwitch {
  BTC = 'btc',
  EVM = 'evm',
}

export const SWITCH_NETWORK_LIST = {
  [NetworkSwitch.BTC]: [
    {
      key: Network.BITCOIN,
      label: Network.BITCOIN,
    },
    {
      key: Network.BITCOINTESTNET,
      label: Network.BITCOINTESTNET,
    },
    {
      key: Network.BITCOINSIGNET,
      label: Network.BITCOINSIGNET,
    },
    {
      key: Network.BITCOINFRACTAL,
      label: Network.BITCOINFRACTAL + ' (coming soon)',
      disabled: true,
    },
  ],
  [NetworkSwitch.EVM]: [
    {
      key: Network.SOLANA,
      label: Network.SOLANA,
    },
  ],
};
