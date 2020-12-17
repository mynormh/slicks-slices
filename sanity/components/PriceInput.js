import React from 'react';
import PropTypes from 'prop-types';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

function PriceInput({ type, value, onChange, inputComponent }) {
  return (
    <>
      <h2>
        {type.title} - {value ? formatMoney(value / 100) : ''}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent}
      />
    </>
  );
}

PriceInput.focus = function () {
  this._inputElement.focus();
};

PriceInput.propTypes = {
  type: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
  inputComponent: PropTypes.object,
};

export default PriceInput;
