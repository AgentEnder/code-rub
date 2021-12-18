import { Ignore } from 'ignore';
import { ProvidedConfig, ResolvedConfig } from '.';

import { FileAssignment } from './file-assignment.interface';

type Awaitable<T> = Promise<T> | T;

export interface CodeRubPlugin<ConfigType> {
  name: string;
  processIgnore?: (ig: Ignore, config: ConfigType) => Ignore;
  processFileQueue?: (files: string[], config: ConfigType) => string[];
  processAssignments?: (
    assignments: FileAssignment[],
    config: ConfigType
  ) => Awaitable<void | FileAssignment[]>;
  saveFileMap?: (
    fileMap: Record<string, boolean>,
    config: ResolvedConfig
  ) => void;
  readFileMap?: (config: ResolvedConfig) => Record<string, boolean>;
  setup?: (config: ConfigType) => Awaitable<void>;
  initialConfiguration?:
    | Awaitable<ProvidedConfig>
    | (() => Awaitable<ProvidedConfig>);
}
