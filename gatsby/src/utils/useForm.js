import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // Check if it's a number and coerce
    const { value } = e.currentTarget;

    if (e.currentTarget.type === 'number') {
      parseInt(e.currentTarget.value);
    }

    setValues({
      // Copy the existing values into it
      ...values,
      // Update the new value that changed
      [e.currentTarget.name]: value,
    });
  }

  return { values, updateValue };
}
