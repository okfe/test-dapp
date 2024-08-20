export const signPsbt = async (
  provider: any,
  psbtHex: string,
  options: any,
) => {
  const signedPsbt = await provider.signPsbt(psbtHex, options);
  return signedPsbt;
};
