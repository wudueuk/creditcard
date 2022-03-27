import { el, setChildren } from '../node_modules/redom/dist/redom.es.js';
import CreditCardSpace from './credit-card-space.js';

const wrapper = el('div.wrapper');

const card = el('div.card');
const cardNumber = el('span.card__number', 'xxxx xxxx xxxx xxxx');
const cardName = el('span.card__name', 'YOUR NAME');
const cardDate = el('span.card__date', 'DD/YY');

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
});
inputHolder.addEventListener('input', () => {
  if (inputHolder.value !== '') {
    cardName.textContent = inputHolder.value.toUpperCase();
  } else cardName.textContent = 'YOUR NAME';
});

const inputNumber = el('input.input.input__number', {
  type: 'text',
  id: 'cardNumber',
});
new CreditCardSpace(inputNumber);
inputNumber.addEventListener('input', () => {
  cardNumber.textContent = inputNumber.value;
});

const inputDate = el('input.input.input__date', {
  type: 'text',
  id: 'inputeDate',
});
inputDate.addEventListener('blur', () => {
  inputDate.value = inputDate.value.replace(
    /^([1-9]\/|[2-9])$/g, '0$1/'
  ).replace(
    /^(0[1-9]|1[0-2])$/g, '$1/'
  ).replace(
    /^([0-1])([3-9])$/g, '0$1/$2'
  ).replace(
    /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2'
  ).replace(
    /^([0]+)\/|[0]+$/g, '0'
  ).replace(
    /[^\d\/]|^[\/]*$/g, ''
  ).replace(
    /\/\//g, '/'
  );
  cardDate.textContent = inputDate.value;
});

const inputCvv = el('input.input.input__cvv', {
  type: 'text',
  id: 'inputCvv',
});

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
