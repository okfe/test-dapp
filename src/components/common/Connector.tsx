import {
  Network,
  NetworkSwitch,
  SWITCH_NETWORK_LIST,
} from '@/constants/network';
import type { NetworkType } from '@/models/NetworkModel';
import { DownOutlined } from '@ant-design/icons';
import { Address } from '@ant-design/web3';
import { OkxWalletColorful } from '@ant-design/web3-icons';
import { useModel } from '@umijs/max';
import { Button, Dropdown, MenuProps, Space, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';

interface ConnectorProps {
  networkSwitch?: NetworkSwitch;
  params?: any[];
  onError?: (err: any) => void;
}

type useNetworkModel = {
  network: NetworkType;
  connect: (network: Network, params?: any[]) => Promise<void>;
};

/**
 * Antd web3 connector has not callback on disconnect.
 * And just has mainnet. Not enough for business.
 */
const Connector: React.FC<ConnectorProps> = (props) => {
  const { networkSwitch = NetworkSwitch.BTC, params = [], onError } = props;
  const { switchNetworkName, setSwitchNetwork } = useModel(
    'SwitchNetworkModel',
    (model) => ({
      switchNetworkName: model.networkSwitches[networkSwitch],
      setSwitchNetwork: model.setSwitchNetwork,
    }),
  );

  const { network, connect } = useModel(
    'NetworkModel',
    (model): useNetworkModel => ({
      network: model.networks[switchNetworkName] || {},
      connect: model.connectNetwork,
    }),
  );

  const { address, error } = network;

  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error]);

  // auto connect once
  useEffect(() => {
    setSwitchNetwork(networkSwitch, switchNetworkName);
    connect(switchNetworkName, params);
  }, []);

  const connectedDetail = useMemo(() => {
    return (
      <>
        {`${switchNetworkName}: `}
        <Address
          ellipsis
          addressPrefix={false}
          address={address}
          tooltip={
            <Typography.Paragraph style={{ color: '#fff' }} copyable>
              {address}
            </Typography.Paragraph>
          }
        />
      </>
    );
  }, [address, switchNetworkName]);

  const dropdownItem = SWITCH_NETWORK_LIST[networkSwitch];
  const onMenuClick: MenuProps['onClick'] = useCallback((e: any) => {
    connect(e.key, params);
    setSwitchNetwork(networkSwitch, e.key);
  }, []);

  return (
    <Dropdown menu={{ items: dropdownItem, onClick: onMenuClick }}>
      <Button icon={<OkxWalletColorful />} iconPosition={'start'}>
        <Space>
          Connect to{!address ? '' : connectedDetail}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default Connector;
