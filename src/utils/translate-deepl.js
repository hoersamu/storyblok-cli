import translate from 'deepl';

/**
 * @method translateDeepL
 * @param {Object} block
 * @param {string|string[]} fields: the fields to translate
 * @param {string} targetLanguage
 * @param {string} sourceLanguage
 */
const translateDeepL = async ({
  block,
  fields,
  targetLanguage = 'EN-US',
  sourceLanguage = 'DE',
}) => {
  const textToTranslate = Array.isArray(fields)
    ? fields.map((field) => block[field])
    : block[fields];

  await translate({
    text: textToTranslate,
    target_lang: targetLanguage,
    source_lang: sourceLanguage,
    auth_key: '', // TODO: add key
    glossary_id: '782aff30-6172-4c1e-8957-ffcb7b8902cd',
  })
  .then(result => {
      const fieldsToUpdate = Array.isArray(fields) ? fields : [fields];
      fieldsToUpdate.forEach((field, index) => {
        block[field] = result.data.translations[index].text
      });
  })
  .catch(error => {
      console.error(error)
  });
}

export default translateDeepL;
