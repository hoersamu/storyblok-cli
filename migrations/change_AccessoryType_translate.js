import translateOpenAI from '../src/utils/translate-openai.js';

export default async function (block) {
  await translateOpenAI(block, 'suitsTheFollowingProductsText');
  await translateOpenAI(block, 'dimensionsAndDeliveryText');
}
