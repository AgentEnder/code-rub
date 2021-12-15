import { CodeRubPlugin } from './plugin.interface';

export interface RawConfig {
  plugins: (string | CodeRubPlugin)[];
}

export interface ResolvedConfig {
  plugins: CodeRubPlugin[];
}
