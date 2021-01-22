import React from 'react';
import classNames from 'classnames';

import styles from './FormTextarea.module.scss';

type FormTextareaProps = {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  refValidation?: any;
};

const FormTextarea = ({ label, placeholder, error, refValidation, name }: FormTextareaProps) => (
  <label className={styles.root}>
    <span className={styles.label}>{label}</span>
    <textarea
      className={classNames(styles.input, styles.textArea, { [styles.inputError]: error })}
      placeholder={placeholder}
      ref={refValidation}
      name={name}
    />
    {error && <span className={styles.error}>{error}</span>}
  </label>
);

FormTextarea.defaultProps = {
  placeholder: '',
  error: '',
  refValidation: null,
};

export default FormTextarea;
