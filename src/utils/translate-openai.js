import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: '' }); // TODO: add key

/**
 * @method translateOpenAI
 * @param {Object} block
 * @param {string} field
 */
const translateOpenAI = async (block, field) => {
  await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to translate JSON objects to english. Return the complete input and only translate the fields with the key 'text' and try to keep the meaning intact over multiple fields. The text is split up into multiple parts. Move them around but keep the meaning and syntax intact",
      },
      { role: "user", content: JSON.stringify(block[field]) }
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
  })
  .then(result => {
    block[field] = JSON.parse(result.choices[0].message.content);
  })
  .catch(error => {
      console.error(error)
  });
};

export default translateOpenAI;
