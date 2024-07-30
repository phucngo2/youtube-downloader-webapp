import { Worker, WorkerOptions } from "node:worker_threads";

/**
 * https://stackoverflow.com/a/72916776
 *
 * @param path
 * @param options
 * @returns
 */
export function importWorker(path: string, options: WorkerOptions) {
  const resolvedPath = require.resolve(path);
  return new Worker(resolvedPath, {
    ...options,
    execArgv: /\.ts$/.test(resolvedPath)
      ? ["--require", "ts-node/register"]
      : undefined,
  });
}
