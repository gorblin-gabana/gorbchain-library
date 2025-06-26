import { PublicKey } from '@solana/web3.js';

/** Address of the SPL Token program */
export const TOKEN_PROGRAM_ID = new PublicKey('8drSBwhdQQTQs68pAddfWyXPv8CA4JhFAY2QRAxwLmSS');

/** Address of the SPL Token 2022 program */
export const TOKEN_2022_PROGRAM_ID = new PublicKey('2dwpmEaGB8euNCirbwWdumWUZFH3V91mbPjoFbWT24An');

/** Address of the SPL Associated Token Account program */
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('4yJEEgLC3iWcz8Qpym7AAW8XFuoUUUMrCQnecrJQdnXc');

/** Address of the special mint for wrapped native SOL in spl-token */
export const NATIVE_MINT = new PublicKey('So11111111111111111111111111111111111111112');

/** Address of the special mint for wrapped native SOL in spl-token-2022 */
export const NATIVE_MINT_2022 = new PublicKey('9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP');

/** Check that the token program provided is not `Tokenkeg...`, useful when using extensions */
export function programSupportsExtensions(programId: PublicKey): boolean {
    if (programId.equals(TOKEN_PROGRAM_ID)) {
        return false;
    } else {
        return true;
    }
}
