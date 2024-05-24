import translateDeepL from '../src/utils/translate-deepl.js';

export default async function (block) {
  await translateDeepL({
    block,
    fields: ['headline', 'subline'],
  });
}
