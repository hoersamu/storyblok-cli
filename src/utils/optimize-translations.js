import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: '' }); // TODO: add key

/**
 * @method optimizeTranslations
 * @param {Object} block
 * @param {string} field
 */
const optimizeTranslations = async (block, field) => {
  await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to review text on an ecommerce website and improve sentences where the current English doesn't sound natural for an US-American and suggest one alternative wording that sounds more natural. The input is a JSON object, the fields with the key text contain the content we want to optimize. Return the complete input with these fields updated.",
      },
      { role: "user", content: JSON.stringify(block[field]) }
    ],
    model: "gpt-4-turbo",
    response_format: { type: "json_object" },
  })
  .then(result => {
    block[field] = JSON.parse(result.choices[0].message.content);
  })
  .catch(error => {
      console.error(error);
  });
};

export default optimizeTranslations;
