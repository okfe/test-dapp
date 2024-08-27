import useIsDarkMode from '@/hooks/useIsDarkMode';
import { GithubOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useAntdConfigSetter } from '@umijs/max';
import { Button, Flex, theme } from 'antd';
import { useCallback } from 'react';
const { darkAlgorithm, defaultAlgorithm } = theme;

export default function GlobalTools() {
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

  const goToGithub = useCallback(() => {
    window.open('https://github.com/okxwallet/test-dapp', '_blank');
  }, []);

  return (
    <Flex justify="flex-end" gap="small">
      <Button shape="circle" onClick={switchTheme}>
        {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
      </Button>
      <Button shape="circle" onClick={goToGithub}>
        <GithubOutlined />
      </Button>
    </Flex>
  );
}
