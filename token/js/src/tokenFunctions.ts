import { createMint } from './actions/createMint.js';
import { getOrCreateAssociatedTokenAccount } from './actions/getOrCreateAssociatedTokenAccount.js';
import { mintTo } from './actions/mintTo.js';
import { transfer } from './actions/transfer.js';
import { PublicKey } from '@solana/web3.js';

export function initialise(addresses: {
    USDC: string | PublicKey,
    USDT: string | PublicKey,
    [key: string]: string | PublicKey,
}) {
    // Convert to PublicKey if needed
    const result: Record<string, PublicKey> = {};
    for (const [k, v] of Object.entries(addresses)) {
        result[k] = v instanceof PublicKey ? v : new PublicKey(v);
    }
    return result;
}

export {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    transfer,
};
