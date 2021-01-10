import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './FormSignIn.module.scss';

import FormHeader from '../../../blocks/Form/FormHeader/FormHeader';
import FormInput from '../../../blocks/Form/FormInput/FormInput';
import FormButton from '../../../blocks/Form/FormButton/FormButton';

type FormData = {
  email: string;
  password: string;
};

const FormSignIn = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const validationRules = {
    email: {
      required: 'E-mail is required',
      pattern: {
        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        message: 'E-mail should be a valid address',
      },
    },
    password: {
      required: 'Password is required',
    },
  };
  const onSubmit = (...data: any) => console.log(data);

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.header}>
        <FormHeader tittle="Sign In" />
      </div>
      <div className={styles.field}>
        <FormInput
          label="Email address"
          placeholder="Email address"
          error={errors.email && errors.email.message}
          refValidation={register(validationRules.email)}
          name="email"
        />
      </div>
      <div className={styles.field}>
        <FormInput
          label="Password"
          type="password"
          placeholder="Password"
          refValidation={register(validationRules.password)}
          error={errors.password && errors.password.message}
          name="password"
        />
      </div>
      <div className={styles.button}>
        <FormButton type="submit" label="Login" />
      </div>
      <p className={styles.text}>
        Don’t have an account?{' '}
        <Link className={styles.link} to="/sgin-up">
          Sign Up.
        </Link>
      </p>
    </form>
  );
};

export default FormSignIn;
