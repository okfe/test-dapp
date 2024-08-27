import { useAntdConfig } from '@umijs/max';
import { ConfigProviderProps, MappingAlgorithm, theme } from 'antd';
import { useMemo } from 'react';
const { darkAlgorithm } = theme;

export default function useIsDarkMode() {
  const antdConfig: ConfigProviderProps = useAntdConfig();
  const algorithm = antdConfig?.theme?.algorithm as MappingAlgorithm[];

  return useMemo(() => {
    return algorithm.includes(darkAlgorithm);
  }, [algorithm]);
}
