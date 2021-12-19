export interface GenerateOptions {
  configFile: string;
}

/**
 * @description Call through to the @code-rub/core package to generate the next set of assignments
 * @param options
 */
export async function generate({ configFile }: GenerateOptions) {
  process.env.CODE_RUB_CONFIG = configFile;
  require('@code-rub/core/src/lib/main');
}
