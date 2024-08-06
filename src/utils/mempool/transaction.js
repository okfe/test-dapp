import mempoolJS from '@mempool/mempool.js';

export const getTxDetail = async (txid, network) => {
  const {
    bitcoin: { transactions },
  } = mempoolJS({
    hostname: 'mempool.space',
    network,
  });

  const tx = await transactions.getTx({ txid });

  return tx;
};

export const getTxHex = async (txid, network) => {
  const {
    bitcoin: { transactions },
  } = mempoolJS({
    hostname: 'mempool.space',
    network,
  });

  const txHex = await transactions.getTxHex({ txid });

  return txHex;
};
