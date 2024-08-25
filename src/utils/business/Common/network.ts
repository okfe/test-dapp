import { Network } from '@/constants/network';
/**
 * get instance from connectResult. ConnectResult is different for different chain, some is object, some is array.
 *
 * @export
 * @param {*} connectResult
 * @return {*}  {{ address: string }}
 */
export function formatConnectResult(
  network: Network,
  connectResult: any,
): { address: string } {
  if (network === Network.TON) {
    return { address: connectResult.payload.items[0].address };
  }
  // default return address
  return { address: connectResult.address };
}
