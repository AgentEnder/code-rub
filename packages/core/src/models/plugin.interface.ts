import { Ignore } from 'ignore';

import { ProvidedConfig, ResolvedConfig } from './config.interface';
import { FileAssignment } from './file-assignment.interface';

export type Awaitable<T> = Promise<T> | T;

/**
 * @description A plugin should export this using either `module.exports = {...}` or `export = {...}`
 * @param ConfigType A type parameter, representing the typing for the plugin's configuration object
 */
export interface CodeRubPlugin<ConfigType> {
  /**
   * @description Used for labeling the plugin in handled error messages
   */
  name: string;

  /**
   * @description This is controls the generation file queue during crawling. It is more performant to filter during this by updating the `Ignore` object, but may not be suitable in multi-team environments since this affects which files are saved in the file-map. If using a different set of Ignore processing plugins, it is recommended to also change the storage output directory to something like `.code-rub/{teamName}`, and maintain that list separately across teams.
   * @param ig This represents the current `Ignore` instance, it should be used during implementation to update the files being ignored.
   * @param config This is the config for the currently executing plugin
   * @returns `Ignore` This is the modified `Ignore` instance, which will be fed into the next executed plugin or used directly.
   */
  processIgnore?: (ig: Ignore, config: ConfigType) => Ignore;

  /**
   * @description This list is used to filter **after** the file list has been read. It can be used to check file types, file names etc and filter things down.
   * @param files This is the lst of files being for your plugin. It should be used to generate the next list or directly modified.
   * @param config This is the config for the currently executing plugin
   * @returns A list of file paths that will be used in the next plugin or to generate assignments directly.
   */
  processFileQueue?: (files: string[], config: ConfigType) => string[];

  /**
   * @description This function is multipurpose. It can be used in plugins like `@code-rub/jira` to submit tickets to a service, or can modify the assignments to before other plugins are called.
   * @param assignments This is the current list of assignments. They can be modified or used directly.
   * @param config This is the config for the currently executing plugin
   * @returns Either a list of file assignments to use in further plugin execution, or nothing.
   */
  processAssignments?: (
    assignments: FileAssignment[],
    config: ConfigType
  ) => Awaitable<void | FileAssignment[]>;

  /**
   * @description This function is used to save the fileMap for ensuring that the same files are not picked sequentially. Only 1 plugin should implement this. If none do, we default to saving to a CSV file in the storage location.
   * @param fileMap This is a Map between file path and a boolean representing if the file has been seen. This should be saved inside this function.
   * @param config This is the config for the instance of @code-rub core that is executing. See {@link ResolvedConfig}
   */
  saveFileMap?: (
    fileMap: Record<string, boolean>,
    config: ResolvedConfig
  ) => void;

  /**
   * @description This function is used to read the fileMap before generating assignments. Only 1 plugin should implement this. If none do, we default to read from a CSV file in the storage location.
   * @param config This is the config for the instance of @code-rub core that is executing. See {@link ResolvedConfig}
   * @returns A Map between file path and a boolean representing if the file has been seen. This should be read inside this function.
   */
  readFileMap?: (config: ResolvedConfig) => Record<string, boolean>;

  /**
   * @description This is a setup function that is called while resolving plugins. You can use it to prompt for user inputs, or any miscellaneous actions that need to happen for your specific plugin to work.
   * @param config This is the config for the instance of @code-rub core that is executing. See {@link ResolvedConfig}
   */
  setup?: (config: ConfigType) => Awaitable<void>;

  /**
   * @description This is either a configuration object that is used during `npx code-rub init --preset {my-plugin}` or a function to create that object.
   */
  initialConfiguration?:
    | Awaitable<ProvidedConfig>
    | (() => Awaitable<ProvidedConfig>);
}
