import {
  el,
  setChildren
} from '../node_modules/redom/dist/redom.es.js';
import creditcard from './modules/creditcard.js';
import form from './modules/form.js';
import mask from './modules/mask.js';

const pageTitle = el('div.payment-title', el('h1', 'Payment Information'));
const container = el('div.container');

setChildren(container, creditcard);
setChildren(document.body, [pageTitle, container, form]);

const name = document.getElementById('name');
const cardnumber = document.getElementById('cardnumber');
const cardnumberMask = IMask(cardnumber, {
  mask: '0000 0000 0000 0000',
  lazy: true,
  maxLength: 16,
});
//cardnumberMask.on('complete');
const expirationdate = document.getElementById('expirationdate');
new IMask(expirationdate, {
  mask: 'MM/YY',
  lazy: true,

  blocks: {
    YY: {
      mask: '00',
    },

    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
  }
});

const securitycode = document.getElementById('securitycode');
const ccicon = document.getElementById('ccicon');
const svgname = document.getElementById('svgname');
const svgnumber = document.getElementById('svgnumber');
const svgnameback = document.getElementById('svgnameback');
const svgexpire = document.getElementById('svgexpire');
const svgsecurity = document.getElementById('svgsecurity');
const lightcolor = document.querySelectorAll('.lightcolor');
const darkcolor = document.querySelectorAll('.darkcolor');

name.addEventListener('input', () => {
  if (name.value !== '') {
    name.value = name.value.toUpperCase().replace(/[^A-Z\s]/g, '');
    svgname.textContent = name.value;
  } else svgname.textContent = 'YOUR NAME';
  svgnameback.textContent = svgname.textContent;
});

expirationdate.addEventListener('input', () => {
  svgexpire.textContent = expirationdate.value;
});

securitycode.addEventListener('input', () => {
  svgsecurity.textContent = securitycode.value;
});

const getCardOwner = value => {
  return mask.find(elem => value.match(elem.regex) ? elem : undefined);
};

export const swapColor = color => {
  lightcolor.forEach(elem => {
    elem.classList.remove('grey');
    elem.classList.add(color);
  });
  darkcolor.forEach(elem => {
    elem.classList.remove('greydark');
    elem.classList.add(color + 'dark');
  });
};

cardnumber.addEventListener('input', () => {
  const value = cardnumber.value;
  const cardOwner = getCardOwner(value);
  if (cardOwner.cardType !== '' && cardOwner.cardType !== 'Unknown') {
    ccicon.innerHTML = cardOwner.icon;
    cardnumberMask.updateOptions({
      mask: cardOwner.mask,
      maxLength: cardOwner.mask.length + 2,
    });
    swapColor(cardOwner.color);
  } else {
    swapColor('grey');
    cardnumberMask.updateOptions({
      mask: '0000 0000 0000 0000',
    });
    ccicon.innerHTML = '';
  }
  svgnumber.textContent = value;
});
