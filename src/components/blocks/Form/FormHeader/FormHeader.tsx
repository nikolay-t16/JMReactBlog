import React from 'react';

import styles from './FormHeader.module.scss';

type FormHeaderProps = {
  tittle: string;
};

const FormHeader = ({ tittle }: FormHeaderProps) => <h2 className={styles.root}>{tittle}</h2>;

export default FormHeader;
