import translateDeepL from '../src/utils/translate-deepl.js';
import translateOpenAI from '../src/utils/translate-openai.js';

export default async function (block) {
  await translateDeepL({
    block,
    fields: ['headline', 'moreInfoText', 'labelText', 'ctaText'],
  });
  await translateOpenAI(block, 'text');
}