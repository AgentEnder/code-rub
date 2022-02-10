import { StatusUpdate } from '@code-rub/core';
import ora from 'ora';
import { Subject } from 'rxjs';

export interface GenerateOptions {
  configFile: string;
}

/**
 * @description Call through to the @code-rub/core package to generate the next set of assignments
 * @param options
 */
export async function generate({ configFile }: GenerateOptions) {
  process.env.CODE_RUB_CONFIG = configFile;
  const { worker } = await import('@code-rub/core');
  return new Promise<void>((res, rej) => {
    const observer = new Subject<StatusUpdate>()
    const spinner = ora();
    worker(observer);
    observer.subscribe({
      next: (s) => {
        if (spinner.isSpinning) {
          spinner.text = s.message;
        } else {
          spinner.start(s.message);
        }
        
        if (s.complete) {
          spinner.stopAndPersist({
            symbol: '✔️'
          });
        } else if (s.messageOnly) {
          spinner.stopAndPersist({
            text: s.message,
            symbol:'-'
          })
        }
      },
      error: (e) => {
        spinner.fail();
        console.error(e);
        rej()
      },
      complete: () => {
        spinner.succeed();
        res();
      }
    })
  })
}
