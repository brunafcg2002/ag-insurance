/**
 * @typedef {Object} ContactEnquiry
 * @property {string} name
 * @property {string} email
 * @property {string} message
 * @property {string} solution
 * @property {string} language
 */

export const solutionNames = Object.freeze({
  auto: 'Seguro Automóvel',
  saude: 'Seguro de Saúde',
  casa: 'Seguro Habitação',
  vida: 'Seguro de Vida',
  trabalho: 'Seguro de Acidentes de Trabalho',
  poupanca: 'Poupança e Investimento',
  other: 'Outra questão',
});

export function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s<>@,;\r\n]+@[^\s<>@,;\r\n]+\.[^\s<>@,;\r\n]+$/.test(value);
}

/**
 * Return a normalised enquiry, or null when its business fields are invalid.
 * @returns {ContactEnquiry | null}
 */
export function createContactEnquiry(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const enquiry = {};
  const limits = { name: 100, email: 200, message: 2500, solution: 20, language: 2 };
  for (const [key, max] of Object.entries(limits)) {
    if (typeof input[key] !== 'string' || input[key].length > max) return null;
    enquiry[key] = input[key].trim();
  }
  if (!enquiry.name || /[\x00-\x1f\x7f]/.test(enquiry.name) || !isValidEmail(enquiry.email) ||
      !enquiry.message || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(enquiry.message) ||
      !Object.hasOwn(solutionNames, enquiry.solution) || !['pt', 'en'].includes(enquiry.language)) return null;
  return Object.freeze(enquiry);
}
