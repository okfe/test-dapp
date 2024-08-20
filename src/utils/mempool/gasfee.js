import mempoolJS from '@mempool/mempool.js';
import { getMempoolConfig } from './config';

// 获取当前费用率
export async function getFeeRate() {
  const config = getMempoolConfig();
  const {
    bitcoin: { fees },
  } = mempoolJS(config);

  const feesRecommended = await fees.getFeesRecommended();
  return feesRecommended;
}
