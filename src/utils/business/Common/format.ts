export const formatTxHash = (tx: string) => {
  // tx保留前四位后六位，中间替换成...
  return `${tx.slice(0, 4)}...${tx.slice(-6)}`;
};
