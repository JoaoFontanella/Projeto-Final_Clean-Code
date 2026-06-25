export const parsePriceFromDescription = (description = '') => {
  if (typeof description !== 'string') return 0;
  const priceString = description.replace('R$', '').trim();
  const parsed = parseFloat(priceString.replace(',', '.'));
  return Number.isNaN(parsed) ? 0 : parsed;
};
