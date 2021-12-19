import { CodeRubPlugin } from './plugin.interface';

/**
 * @description An interface representing that any config option may be missing when provided by the user
 */
export type ProvidedConfig = Partial<RawConfig>;

/**
 * @description The configuration as provided by the user, with expeced properties
 */
export interface RawConfig {
  /**
   * @description A list of strings and inline plugins. The strings are resolved to plugins during execution. See {@link CodeRubPlugin}
   */
  plugins: (string | CodeRubPlugin<unknown>)[];

  /**
   * @description Where should artifacts such as the fileMap be stored and read from during execution?
   */
  storagePath?: string;

  /**
   * @description A list of user id's for use when generating assignments.
   */
  uids: string[];

  /**
   * @description A map between plugin name and the configuration object for that plugin.
   */
  pluginConfiguration?: Record<string, unknown>;

  /**
   * @description How many tasks should be generated per developer?
   * @type number
   */
  tasksPerDeveloper: number;
}

export interface ResolvedConfig extends RawConfig {
  plugins: CodeRubPlugin<unknown>[];
}
