import optimizeTranslations from '../src/utils/optimize-translations.js';

export default async function (block) {
  await optimizeTranslations(block, 'text');
}
