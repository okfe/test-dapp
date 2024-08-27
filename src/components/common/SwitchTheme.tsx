import useIsDarkMode from '@/hooks/useIsDarkMode';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useAntdConfigSetter } from '@umijs/max';
import { Button, Flex, theme } from 'antd';
import { useCallback } from 'react';
const { darkAlgorithm, defaultAlgorithm } = theme;

export default function SwitchTheme() {
  const isDarkMode = useIsDarkMode();
  const setAntdConfig = useAntdConfigSetter();

  const switchTheme = useCallback(() => {
    setAntdConfig((config) => {
      if (isDarkMode) {
        config.theme!.algorithm = [defaultAlgorithm];
      } else {
        config.theme!.algorithm = [darkAlgorithm];
      }
      return config;
    });
  }, [isDarkMode, setAntdConfig]);

  return (
    <Flex justify="flex-end">
      <Button shape="circle" onClick={switchTheme}>
        {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
      </Button>
    </Flex>
  );
}
