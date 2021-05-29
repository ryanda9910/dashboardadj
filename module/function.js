/* For Convert Number to Rupiah */
export const convertToRupiah = price => {
  let money = '';
  const pricerev = price
    .toString()
    .split('')
    .reverse()
    .join('');
  for (let i = 0; i < pricerev.length; i++)
    if (i % 3 == 0) money += `${pricerev.substr(i, 3)}.`;
  return `Rp. ${money
    .split('', money.length - 1)
    .reverse()
    .join('')}`;
};
