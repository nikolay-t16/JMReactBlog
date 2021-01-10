import React from 'react';
import classNames from 'classnames';

import styles from './FormInput.module.scss';

type FormInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  type?: string;
  refValidation?: any;
};

const FormInput = ({ label, type, placeholder, error, refValidation, name }: FormInputProps) => (
  <label className={styles.root}>
    <span className={styles.label}>{label}</span>
    <input
      className={classNames(styles.input, { [styles.inputError]: error })}
      type={type}
      placeholder={placeholder}
      ref={refValidation}
      name={name}
    />
    {error && <span className={styles.error}>{error}</span>}
  </label>
);

FormInput.defaultProps = {
  placeholder: '',
  error: '',
  type: 'text',
  refValidation: null,
};

export default FormInput;
