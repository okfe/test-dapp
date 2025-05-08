const okxWalletCoreAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'mainStorageImpl',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'name',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'version',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'fallback',
    stateMutability: 'payable',
  },
  {
    type: 'receive',
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'ADDRESS_THIS',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'MAIN_STORAGE_IMPL',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'SESSION_TYPEHASH',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'addValidator',
    inputs: [
      {
        name: 'validatorImpl',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'immutableArgs',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'computeValidatorAddress',
    inputs: [
      {
        name: 'validatorImpl',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'immutableArgs',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'eip712Domain',
    inputs: [],
    outputs: [
      {
        name: 'fields',
        type: 'bytes1',
        internalType: 'bytes1',
      },
      {
        name: 'name',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'version',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'chainId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'verifyingContract',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'salt',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'extensions',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'executeFromExecutor',
    inputs: [
      {
        name: 'calls',
        type: 'tuple[]',
        internalType: 'struct Call[]',
        components: [
          {
            name: 'target',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'data',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
      {
        name: 'session',
        type: 'tuple',
        internalType: 'struct Session',
        components: [
          {
            name: 'id',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'executor',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'validator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'validUntil',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'validAfter',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'preHook',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'postHook',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'signature',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'executeFromSelf',
    inputs: [
      {
        name: 'calls',
        type: 'tuple[]',
        internalType: 'struct Call[]',
        components: [
          {
            name: 'target',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'data',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'executeWithValidator',
    inputs: [
      {
        name: 'calls',
        type: 'tuple[]',
        internalType: 'struct Call[]',
        components: [
          {
            name: 'target',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'data',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
      {
        name: 'validator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'validationData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getMainStorage',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IStorage',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getSessionTypedHash',
    inputs: [
      {
        name: 'session',
        type: 'tuple',
        internalType: 'struct Session',
        components: [
          {
            name: 'id',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'executor',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'validator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'validUntil',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'validAfter',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'preHook',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'postHook',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'signature',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getValidationTypedHash',
    inputs: [
      {
        name: 'nonce',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'calls',
        type: 'tuple[]',
        internalType: 'struct Call[]',
        components: [
          {
            name: 'target',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'data',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'isValidSignature',
    inputs: [
      {
        name: '_hash',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: '_signature',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bytes4',
        internalType: 'bytes4',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [
      {
        name: 'interfaceId',
        type: 'bytes4',
        internalType: 'bytes4',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'validateSession',
    inputs: [
      {
        name: '_storage',
        type: 'address',
        internalType: 'contract IStorage',
      },
      {
        name: 'session',
        type: 'tuple',
        internalType: 'struct Session',
        components: [
          {
            name: 'id',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'executor',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'validator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'validUntil',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'validAfter',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'preHook',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'postHook',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'signature',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'EIP712DomainChanged',
    inputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'StorageCreated',
    inputs: [
      {
        name: 'storageAddress',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'StorageInitialized',
    inputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ValidatorAdded',
    inputs: [
      {
        name: 'validator',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'CallFailed',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'returnData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
  },
  {
    type: 'error',
    name: 'CloneArgumentsTooLong',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Create2EmptyBytecode',
    inputs: [],
  },
  {
    type: 'error',
    name: 'FailedDeployment',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InsufficientBalance',
    inputs: [
      {
        name: 'balance',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'needed',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'InvalidExecutor',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidSession',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidShortString',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidValidatorImpl',
    inputs: [
      {
        name: 'validatorImpl',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'NameTooLong',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotFromSelf',
    inputs: [],
  },
  {
    type: 'error',
    name: 'StringTooLong',
    inputs: [
      {
        name: 'str',
        type: 'string',
        internalType: 'string',
      },
    ],
  },
  {
    type: 'error',
    name: 'VersionTooLong',
    inputs: [],
  },
];

export default okxWalletCoreAbi;
