/* eslint-disable no-useless-concat */
export const myTronAddress = 'TNssWTZnEakY2fN2Aaa71k85yRqVcjcv69';
export const okWeb3Address = 'THRAE2VhGNAcvPKtT96AqyXtSQwhiU1XL8';
export const tronUSDTAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
export const tronUSDCAddress = 'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8';
export const tronNFTAddress = 'TDxkVPEaSNQkGb5HKmucMuLYbkZD3oWgUp';
// 备用 TW5HUaRp4bcor p9uhb3nNQ3rxYkdxwZxJJ
export const grayTronAddress = 'THoouS6UDEoGuZS1' + 'qJdf9x6nCmjMs4eZqV';
export const mySolAddress = '4mpBfqutcvpfsF1xt6SAnqfFJcE1aGC1EjhcNRyoLSM8';
export const solanaUSDTAddress = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB';
export const openSeaAddress = '0x1E0049783F008A0085193E00003D00cd54003c71';
export const myAddress = '0xfe8dc6394501a35ad1c4833f40f382e55dada4f3';
export const myTonAddress = 'UQDOc7wK8x2Avyet0tUQ0j-6KqbhdRN7yKQGYtI5uYMI0Gxc';
export const tonBlackAddress =
  'EQA7efHQCXHRzTYI8L9SAqtRj9kSUw6avDAEN2GJ33ryVMRN';

export const getEvmGrayAddress = (chainId = 1) => {
  const adderssMap = {
    1: '0xd422e603cad822de9' + 'ff2ec61a8491164f748585a',
    // 1: '0xe72f67c80629BA1Af83ce3035AA8e10cED7007A7',
    137: '0xd422e603cad822de9' + 'ff2ec61a8491164f748585a',
    66: '0xd422e603cad822de9' + 'ff2ec61a8491164f748585a',
  };

  return adderssMap[chainId];
};

/*
tron Black Address
  THoouS6UDEoGuZS1qJdf9x6nCmjMs4eZqV
  TMS551F6uo3dh2ogstwLvDjguhGHcXs8rs
  TQ4Je3Hs3zpsNnzGu6m37s9zsgXxdokaW3

okt Black Address
  0x1945115a277189fddc62765fd47b3dfddb43fa83
  0x1af2b5c8bd84ee795d49cd412e99ebcf7ddcd46b
  0x1d053096694e3cca67fcee933b18006fb8e7765a

polygon Black Address
  0x0369e0f0e17260c0da3cf53036de0d1bed119f92
  0x03c405bf35925dda35440eb60f773e41e3ace3bb
  0x048f6428845cfffe8a86921d1ab49f24dfef0e9c

eth Black Address
  0x0f78728f1e9b62ef03971c00127e0e5d0b6f386d
*/
