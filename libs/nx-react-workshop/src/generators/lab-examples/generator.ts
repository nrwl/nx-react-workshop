import {
  formatFiles,
  generateFiles,
  OverwriteStrategy,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { LabExamplesGeneratorSchema } from './schema';

export async function labExamplesGenerator(
  tree: Tree,
  { lab }: LabExamplesGeneratorSchema
) {
  generateFiles(
    tree,
    path.join(__dirname, `../../../examples/lab${lab}`),
    './',
    {},
    { overwriteStrategy: OverwriteStrategy.Overwrite }
  );

  await formatFiles(tree);
}

export default labExamplesGenerator;
