import translateDeepL from '../src/utils/translate-deepl.js';
import translateOpenAI from '../src/utils/translate-openai.js';

export default async function (block) {
  await translateOpenAI(block, 'descriptionText');
  await translateDeepL({
    block,
    fields: ['descriptionHeadline', 'material', 'color', 'dimensions'],
  });
}
