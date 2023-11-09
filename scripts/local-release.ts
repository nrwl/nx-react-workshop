#!/usr/bin/env node
import { execSync } from 'child_process';

const LARGE_BUFFER = 1024 * 1000000;

(async () => {
  execSync(`yarn nx build nx-react-workshop`, {
    stdio: [0, 1, 2],
    maxBuffer: LARGE_BUFFER,
  });
})();

function getRegistry() {
  return new URL(execSync('npm config get registry').toString().trim());
}
