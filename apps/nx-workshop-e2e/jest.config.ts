/* eslint-disable */
export default {
  displayName: 'nx-workshop-e2e',
  preset: '../../jest.preset.js',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/nx-workshop-e2e',
  globalSetup: '../../tools/scripts/start-local-registry.ts',
  globalTeardown: '../../tools/scripts/stop-local-registry.ts',
};
