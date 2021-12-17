export interface GenerateOptions {
  configFile: string;
}

export async function generate({ configFile }: GenerateOptions) {
  process.env.CODE_RUB_CONFIG = configFile;
  require('@code-rub/core/src/lib/main');
}
