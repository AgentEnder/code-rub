import { Ignore } from 'ignore';

import { FileAssignment } from './file-assignment.interface';
import { Func } from './misc';

export interface CodeRubPlugin {
  processIgnoredFiles?: Func<[Ignore], Ignore>;
  processAssignments?: Func<[FileAssignment[]], void>;
}
