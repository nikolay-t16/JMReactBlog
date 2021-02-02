import React from 'react';
import classNames from 'classnames';

import styles from './FormCheckbox.module.scss';

type FormCheckboxProps = {
  name: string;
  label: string;
  refValidation: any;
  error?: string;
};

const FormCheckbox = ({ name, label, refValidation, error }: FormCheckboxProps) => (
  <div>
    <label className={styles.root}>
      <input className={styles.input} type="checkbox" name={name} ref={refValidation} value={1} />
      <span className={classNames(styles.checkbox, { [styles.checkboxError]: error })} />
      <span className={styles.label}>{label}</span>
    </label>
    {error && <p className={styles.error}>{error}</p>}
  </div>
);

FormCheckbox.defaultProps = {
  error: '',
};

export default FormCheckbox;
