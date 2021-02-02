import React from 'react';

import classNames from 'classnames';
import styles from './FormButton.module.scss';

type FormButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  label: string;
  disabled?: boolean;
};

const FormButton = ({ type, label, disabled }: FormButtonProps) => (
  // eslint-disable-next-line react/button-has-type
  <button className={classNames(styles.root, { [styles.disabled]: disabled })} type={type} disabled={disabled}>
    {label}
  </button>
);

FormButton.defaultProps = {
  type: 'submit',
  disabled: false,
};

export default FormButton;
