import * as argon2 from "argon2";

/**
 * Some talk before you touch **ANYTHING**:
 * ? Changing "timeCost" increases/decreases hash strength at the cost of time required to compute.
 * ? Changing parallelism changes the resulting hash.
 * ? https://github.com/ranisalt/node-argon2/issues/76#issuecomment-291553840
 * ? https://github.com/P-H-C/phc-winner-argon2/blob/4ac8640c2adc1257677d27d3f833c8d1ee68c7d2/../../encoding.c#L242-L252
 *
 * @param plainPassword the raw password that, most likely, the user gave.
 * @returns a string containing the hashed form of the raw password.
 */
export async function argon2Hash(plainPassword: string) {
  return argon2.hash(plainPassword, {
    hashLength: parseInt(process.env.PASSWORD_HASH_LENGTH),
    timeCost: parseInt(process.env.PASSWORD_HASH_ITERATIONS),
    memoryCost: parseInt(process.env.PASSWORD_HASH_EACH_THREAD_MEM),
    parallelism: parseInt(process.env.PASSWORD_HASH_PARALLELISM),
    type: argon2.argon2id,
  });
}

export async function argon2Verify(hash: string, plain: string) {
  return argon2.verify(hash, plain);
}
