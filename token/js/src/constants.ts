import { PublicKey } from '@solana/web3.js';

/**
 * Dynamic configuration for SPL Token program addresses.
 * Set these at runtime using `setTokenProgramConfig`.
 */
export interface TokenProgramConfig {
    TOKEN_PROGRAM_ID: PublicKey;
    TOKEN_2022_PROGRAM_ID: PublicKey;
    ASSOCIATED_TOKEN_PROGRAM_ID: PublicKey;
    NATIVE_MINT: PublicKey;
    NATIVE_MINT_2022: PublicKey;
}

// Default config is intentionally undefined. User must set it.
let tokenProgramConfig: TokenProgramConfig | null = null;

/** Set the SPL Token program configuration. Must be called before using the library. */
export function setTokenProgramConfig(config: TokenProgramConfig) {
    tokenProgramConfig = config;
}

/** Get the SPL Token program configuration. Throws if not set. */
export function getTokenProgramConfig(): TokenProgramConfig {
    if (!tokenProgramConfig) {
        throw new Error('Token program configuration not set. Call setTokenProgramConfig first.');
    }
    return tokenProgramConfig;
}

/** Check that the token program provided is not the default Token program, useful when using extensions */
export function programSupportsExtensions(programId: PublicKey): boolean {
    const { TOKEN_PROGRAM_ID } = getTokenProgramConfig();
    return !programId.equals(TOKEN_PROGRAM_ID);
}
