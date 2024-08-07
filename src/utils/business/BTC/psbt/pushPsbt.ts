export const pushPsbt = async (signedPsbt: string) => {
  //如果要支持多钱包就在这里传provider
  const provider = window.okxwallet.bitcoin;
  const txId = await provider.pushPsbt(signedPsbt);
  return txId;
};
