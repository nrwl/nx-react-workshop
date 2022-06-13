const { getJestProjects } = require('@nrwl/jest');

export default {
  projects: [...getJestProjects(), '<rootDir>/apps/nx-workshop-e2e'],
};
