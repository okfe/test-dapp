import useIsDarkMode from '@/hooks/useIsDarkMode';
import { GithubOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useAntdConfigSetter } from '@umijs/max';
import { Button, Flex, theme } from 'antd';
import { useCallback, useEffect } from 'react';
const { darkAlgorithm, defaultAlgorithm } = theme;

export default function GlobalTools() {
  const isDarkMode = useIsDarkMode();
  const setAntdConfig = useAntdConfigSetter();

  // init theme from local storage
  useEffect(() => {
    setTimeout(() => {
      setAntdConfig((config) => {
        const localTheme = localStorage.getItem('theme');
        const isLocalDark = !localTheme || localTheme === 'dark';
        if (isLocalDark) {
          config.theme!.algorithm = [darkAlgorithm];
        } else {
          config.theme!.algorithm = [defaultAlgorithm];
        }
        return config;
      });
    }, 600); // 600ms for not looking like refreshing the page
  }, []);

  const switchTheme = useCallback(() => {
    setAntdConfig((config) => {
      if (isDarkMode) {
        config.theme!.algorithm = [defaultAlgorithm];
        localStorage.setItem('theme', 'light');
      } else {
        config.theme!.algorithm = [darkAlgorithm];
        localStorage.setItem('theme', 'dark');
      }
      return config;
    });
  }, [isDarkMode, setAntdConfig]);

  const goToGithub = useCallback(() => {
    window.open('https://github.com/okfe/test-dapp', '_blank');
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
