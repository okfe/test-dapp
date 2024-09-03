import { Network } from '@/constants/network';
import { toUserFriendlyAddress } from '@tonconnect/ui-react';

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
): { address: string; friendlyAddress?: string } {
  if (network === Network.TON) {
    const friendlyAddress = toUserFriendlyAddress(
      connectResult.payload.items[0].address,
    );
    return {
      address: connectResult.payload.items[0].address,
      friendlyAddress,
    };
  }
  if (!connectResult) {
    throw { message: 'connect returns NULL OR EMPTY' };
  }
  // default return address
  return { address: connectResult.address };
}
