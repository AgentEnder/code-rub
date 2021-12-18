import { readJson } from '../../utils';
import { publishAll } from '../publish-all';

export function publishDev(all = false, specific?: string, local = false) {
  const rootPkg = readJson('package.json');

  const [prev, tagSpec] = rootPkg.version.split('-');
  let [tag, rev] = tagSpec ? tagSpec.split('.') : ['dev', '0'];
  rev = (parseInt(rev) + 1).toString();
  rev = rev === 'NaN' ? '0' : rev;
  const newVersion = `${prev}-${tag}.${rev}`;
  console.log('New Version: ', { newVersion, prev, tag, rev });

  publishAll(newVersion, tag, local);
}

if (require.main === module) {
  publishDev();
}
