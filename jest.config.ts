import { getJestProjects } from '@nx/jest';

export default {
  projects: [...getJestProjects(), '<rootDir>/apps/nx-workshop-e2e'],
};
