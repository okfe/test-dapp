import { BITCOIN } from '@/constants/network';
import type { NetworkType } from '@/models/useNetwork';
import type { Network } from '@/types/network';
import { Address } from '@ant-design/web3';
import { OkxWalletColorful } from '@ant-design/web3-icons';
import { useModel } from '@umijs/max';
import { Button, Typography } from 'antd';
import { useEffect, useMemo } from 'react';

interface ConnectorProps {
  networkName?: Network;
  onError?: (err: any) => void;
}

type useNetworkModel = {
  network: NetworkType;
  connect: (network: Network) => Promise<void>;
};

/**
 * Antd web3 connector has not callback on disconnect.
 * And just has mainnet. Not enough for business.
 */
const Connector: React.FC<ConnectorProps> = (props) => {
  const { networkName = BITCOIN, onError } = props;
  const { network, connect } = useModel(
    'useNetwork',
    (model): useNetworkModel => ({
      network: model.networks[networkName] || {},
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
    connect(networkName);
  }, []);

  const onClickConnector = () => {
    connect(networkName);
  };

  const buttonTitle = useMemo(() => {
    return !address ? (
      `Connect to ${networkName}`
    ) : (
      <>
        {`${networkName}: `}
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
  }, [address]);

  return (
    <Button
      icon={<OkxWalletColorful />}
      iconPosition={'start'}
      onClick={onClickConnector}
    >
      {buttonTitle}
    </Button>
  );
};

export default Connector;
