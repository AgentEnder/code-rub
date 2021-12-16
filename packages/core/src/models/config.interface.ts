import { CodeRubPlugin } from './plugin.interface';

export type ProvidedConfig = Partial<RawConfig>;

export interface RawConfig {
  plugins: (string | CodeRubPlugin<unknown>)[];
  storagePath?: string;
  uids: string[];
  pluginConfiguration?: Record<string, unknown>;
  tasksPerDeveloper?: number;
}

export interface ResolvedConfig extends RawConfig {
  plugins: CodeRubPlugin<unknown>[];
}
