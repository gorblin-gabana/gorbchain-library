# `@gorbchain-xyz/token`

A TypeScript library for interacting with the Gorbchain Token and Token-2022 programs.

## Links

- [TypeScript Docs](https://gorbchain.xyz/docs/token/js/)
- [FAQs (Frequently Asked Questions)](#faqs)
- [Install](#install)
- [Build from Source](#build-from-source)

## FAQs

### How can I get support?

Please ask questions in the Gorbchain Stack Exchange: https://stackexchange.gorbchain.xyz/

If you've found a bug or you'd like to request a feature, please
[open an issue](https://github.com/gorblin-gabana/gorbchain-library/issues/new).

### No export named Token

Please see [upgrading from 0.1.x](#upgrading-from-01x).

## Install

```shell
npm install --save @gorbchain-xyz/token @gorbchain-xyz/web3.js
```
_OR_
```shell
yarn add @gorbchain-xyz/token @gorbchain-xyz/web3.js
```

## Build from Source

0. Prerequisites

* Node 16+
* PNPM

If you have Node 16+, you can [activate PNPM with Corepack](https://pnpm.io/installation#using-corepack).

1. Clone the project:
```shell
git clone https://github.com/gorblin-gabana/gorbchain-library.git
```

2. Navigate to the root of the repository:
```shell
cd gorbchain-library
```

3. Install the dependencies:
```shell
pnpm install
```

4. Build the libraries in the repository:
```shell
pnpm run build
```

5. Navigate to the Token library:
```shell
cd token/js
```

6. Build the on-chain programs:
```shell
pnpm run test:build-programs
```

7. Run the tests:
```shell
pnpm run test
```

8. Run the example:
```shell
pnpm run example
```

## Dynamic Program Address Configuration

This library does not use hardcoded program addresses. You must set the program addresses at runtime before using any functionality:

```typescript
import { setTokenProgramConfig } from '@gorbchain-xyz/token';
import { PublicKey } from '@gorbchain-xyz/web3.js';

setTokenProgramConfig({
  TOKEN_PROGRAM_ID: new PublicKey('...'),
  TOKEN_2022_PROGRAM_ID: new PublicKey('...'),
  ASSOCIATED_TOKEN_PROGRAM_ID: new PublicKey('...'),
  NATIVE_MINT: new PublicKey('...'),
  NATIVE_MINT_2022: new PublicKey('...'),
});
```

You can now use the library and it will use your provided addresses everywhere.

## Upgrading

### Upgrading from 0.2.0

There are no breaking changes from 0.2.0, only new functionality for Token-2022.

### Upgrading from 0.1.x

When upgrading from spl-token 0.1.x, you may see the following error in your code:

```
import {TOKEN_PROGRAM_ID, Token, AccountLayout} from '@gorbchain-xyz/token';
                          ^^^^^
SyntaxError: The requested module '@gorbchain-xyz/token' does not provide an export named 'Token'
```

The `@gorbchain-xyz/token` library as of version 0.2.0 does not have the `Token`
class. Instead the actions are split up and exported separately.

To use the old version, install it with:

```
npm install @gorbchain-xyz/token@0.1.8
```

Otherwise you can find documentation on how to use new versions on the
[Gorbchain docs](https://gorbchain.xyz/docs/token) or
[Gorbchain Cookbook](https://cookbook.gorbchain.xyz/references/token.html).

# Usage Guide for Token Functions

## Installation

```sh
npm install --save @gorbchain-xyz/token @gorbchain-xyz/web3.js
```

## Importing and Initializing

```typescript
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
  initialise,
} from '@gorbchain-xyz/token';
import { PublicKey, Keypair, Connection, clusterApiUrl } from '@solana/web3.js';

// Example: Set up your token addresses (replace with your actual addresses)
const addresses = initialise({
  USDC: 'So11111111111111111111111111111111111111112',
  USDT: 'So11111111111111111111111111111111111111113',
});

// Now you can use addresses.USDC, addresses.USDT, etc.
```

## Example: Create Mint, Token Accounts, Mint Tokens, and Transfer

```typescript
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const payer = Keypair.generate();
const mintAuthority = payer;
const recipient = Keypair.generate();

// Create a new mint
const mint = await createMint(connection, payer, mintAuthority.publicKey, null, 9);

// Create or get associated token accounts
const fromTokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mint, payer.publicKey);
const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mint, recipient.publicKey);

// Mint tokens
await mintTo(connection, payer, mint, fromTokenAccount.address, mintAuthority.publicKey, 1000000000);

// Transfer tokens
await transfer(connection, payer, fromTokenAccount.address, toTokenAccount.address, payer.publicKey, 1000000000);
```

## Notes
- You can pass any token, ATA, or SPL Token addresses to the functions; they are not hardcoded.
- Use the `initialise` function to convert your addresses to `PublicKey` objects for convenience.
- See the `examples/` folder for more advanced usage, including transfer hooks and custom extensions.
