import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createInterestBearingMint, updateRateInterestBearingMint, initialise, TOKEN_2022_PROGRAM_ID } from '../src';

(async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const payer = Keypair.generate();
    const airdropSignature = await connection.requestAirdrop(payer.publicKey, 2 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction({ signature: airdropSignature, ...(await connection.getLatestBlockhash()) });

    const mintAuthority = Keypair.generate();
    const freezeAuthority = Keypair.generate();
    const rateAuthority = Keypair.generate();
    const mintKeypair = Keypair.generate();
    const rate = 10;
    const decimals = 9;
    const mint = await createInterestBearingMint(
        connection,
        payer,
        mintAuthority.publicKey,
        freezeAuthority.publicKey,
        rateAuthority.publicKey,
        rate,
        decimals,
        mintKeypair,
        undefined,
        TOKEN_2022_PROGRAM_ID,
    );

    // Initialise token addresses (replace with your actual addresses if needed)
    const addresses = initialise({
        USDC: 'So11111111111111111111111111111111111111112',
        USDT: 'So11111111111111111111111111111111111111113',
    });

    const updateRate = 50;
    await updateRateInterestBearingMint(
        connection,
        payer,
        mint,
        rateAuthority,
        updateRate,
        [],
        undefined,
        TOKEN_2022_PROGRAM_ID,
    );
})();
