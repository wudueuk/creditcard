import { el, setChildren } from '../node_modules/redom/dist/redom.es.js';
import CreditCardSpace from './credit-card-space.js';

const wrapper = el('div.wrapper');

const card = el('div.card');
const cardNumber = el('span.card__number', 'xxxx xxxx xxxx xxxx');
const cardName = el('span.card__name', 'YOUR NAME');
const cardDate = el('span.card__date', 'MM/YY');

const form = el('form.form', {
  action: '#',
  id: 'form',
});
form.addEventListener('submit', e => {
  e.preventDefault();
})

const inputHolder = el('input.input.input__holder', {
  type: 'text',
  id: 'inputHolder',
  maxLength: '25',
});
new IMask(inputHolder, {
  mask: /\w+/,
});
inputHolder.addEventListener('input', () => {
  if (inputHolder.value !== '') {
    inputHolder.value = inputHolder.value.toUpperCase().replace(/[^A-Z\s]/g, '');
    cardName.textContent = inputHolder.value;
  } else cardName.textContent = 'YOUR NAME';
});

const inputNumber = el('input.input.input__number', {
  type: 'text',
  id: 'cardNumber',
});
new IMask(inputNumber, {
  mask: '0000 0000 0000 0000',
  lazy: true,
  maxLength: 16,
});

inputNumber.addEventListener('input', () => {
  cardNumber.textContent = inputNumber.value;
});

const inputDate = el('input.input.input__date', {
  type: 'text',
  id: 'inputDate',
});
new IMask(inputDate, {
  mask: 'MM/YY',
  lazy: true,  // make placeholder always visible

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
inputDate.addEventListener('input', () => {
  cardDate.textContent = inputDate.value;
});

const inputCvv = el('input.input.input__cvv', {
  type: 'text',
  id: 'inputCvv',
});
new IMask(inputCvv, { mask: '000' });

setChildren(form, [
  el('div.form__input-wrap.form__input-wrap_holder', [
    el('label.form__label.form__holder-label', 'Card Holder', {
      for: 'inputHolder',
    }),
    inputHolder
  ]),
  el('div.form__input-wrap.form__input-wrap_number', [
    el('label.form__label.form__number-label', 'Card Number', {
      for: 'cardNumber',
    }),
    inputNumber
  ]),
  el('div.form__input-wrap.form__input-wrap_date', [
    el('label.form__label.form__date-label', 'Card Expiry', {
      for: 'inputDate',
    }),
    inputDate
  ]),
  el('div.form__input-wrap.form__input-wrap_cvv', [
    el('label.form__label.form__cvv-label', 'CVV', {
      for: 'inputCvv',
    }),
    inputCvv
  ]),
  el('button.form__button', 'CHECK OUT')
]);

setChildren(card, [
  el('p.secure', 'Secure Checkout'),
  el('div.credit-card', [
    cardNumber,
    el('div.card__personal', [
      cardName,
      cardDate
    ])
  ]),
  form
]);

setChildren(wrapper, card);
setChildren(document.body, wrapper);
