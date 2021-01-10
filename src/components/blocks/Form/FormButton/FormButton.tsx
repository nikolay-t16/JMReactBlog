import React from 'react';

import styles from './FormButton.module.scss';

type FormButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  label: string;
};

const FormButton = ({ type, label }: FormButtonProps) => (
  // eslint-disable-next-line react/button-has-type
  <button className={styles.root} type={type}>
    {label}
  </button>
);

FormButton.defaultProps = {
  type: 'submit',
};

export default FormButton;
