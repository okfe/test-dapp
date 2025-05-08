export const pushPsbt = async (provider: any, signedPsbt: string) => {
  const txId = await provider.pushPsbt(signedPsbt);
  return txId;
};
