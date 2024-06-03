import translateDeepL from '../src/utils/translate-deepl.js';
import translateOpenAI from '../src/utils/translate-openai.js';

export default async function (block) {
  await translateOpenAI(block, 'headline');
  await translateOpenAI(block, 'newsletterText');
  await translateDeepL({
    block,
    fields: ['inputPlaceholder', 'ctaText'],
  });
}
