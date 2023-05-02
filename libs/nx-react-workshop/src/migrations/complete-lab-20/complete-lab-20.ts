/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree } from '@nx/devkit';

function replaceInFile(
  host: Tree,
  path: string,
  find: string,
  replace: string
) {
  const newContent = host.read(path).toString().replace(find, replace);
  host.write(path, newContent);
}

export default function update(host: Tree) {
  replaceInFile(
    host,
    'apps/store/src/app/app.tsx',
    `fetch('/api/games')`,
    `fetch((process.env.NX_API_URL ?? '') + '/api/games')`
  );
  replaceInFile(
    host,
    `libs/store/feature-game-detail/src/lib/game-detail/game-detail.tsx`,
    'fetch(`/api/games/${gameId}`)',
    `fetch((process.env.NX_API_URL ?? '') + \`/api/games/\${gameId}\`)`
  );
}
