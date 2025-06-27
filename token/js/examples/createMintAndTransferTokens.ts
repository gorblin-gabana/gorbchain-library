import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
  initialise,
} from '../src/tokenFunctions.js';
import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';

(async () => {
    // Connect to cluster
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // Generate wallets
    const fromWallet = Keypair.generate();
    const toWallet = Keypair.generate();

    // Initialise token addresses (replace with your actual addresses if needed)
    const addresses = initialise({
        USDC: 'So11111111111111111111111111111111111111112',
        USDT: 'So11111111111111111111111111111111111111113',
    });

    // Create new token mint
    const mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 9);

    // Get or create token accounts
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        fromWallet.publicKey,
    );
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        toWallet.publicKey,
    );

    // Mint tokens
    await mintTo(
        connection,
        fromWallet,
        mint,
        fromTokenAccount.address,
        fromWallet.publicKey,
        1000000000,
    );

    // Transfer tokens
    await transfer(
        connection,
        fromWallet,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        1000000000,
    );
})();
