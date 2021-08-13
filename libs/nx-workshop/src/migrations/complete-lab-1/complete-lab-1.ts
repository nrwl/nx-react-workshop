/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatFiles, Tree, updateJson, getProjects } from '@nrwl/devkit';
import { removeGenerator } from '@nrwl/workspace';

export default async function update(tree: Tree) {
  // npx create-nx-workspace bg-hoard --preset=empty --no-nx-cloud
  const projects = getProjects(tree);
  const projectsToRemove = [
    'store-e2e',
    'store',
    'api',
    'api-util-interface',
    'util-interface',
    'store-feature-game-detail',
    'store-ui-shared',
    'store-util-formatters',
  ].filter((removeProject) => projects.has(removeProject));
  projectsToRemove.forEach(
    async (projectName) =>
      await removeGenerator(tree, {
        projectName,
        skipFormat: true,
        forceRemove: true,
      })
  );
  // Set npmScope to bg-hoard
  updateJson(tree, 'nx.json', (json) => {
    json.npmScope = 'bg-hoard';
    return json;
  });
  await formatFiles(tree);
}
