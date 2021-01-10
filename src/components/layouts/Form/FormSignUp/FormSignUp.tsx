import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './FormSignUp.module.scss';

import settings from '../../../../settings.json';
import FormHeader from '../../../blocks/Form/FormHeader/FormHeader';
import FormInput from '../../../blocks/Form/FormInput/FormInput';
import FormCheckbox from '../../../blocks/Form/FormCheckbox/FormCheckbox';
import FormButton from '../../../blocks/Form/FormButton/FormButton';

type FormData = {
  userName: string;
  email: string;
  password: string;
  repeatPassword: string;
  agreement: string;
};

const FormSignUp = () => {
  const { register, handleSubmit, watch, errors } = useForm<FormData>();
  const currentPassword: string = watch('password', '');
  const validationRules = {
    userName: {
      required: 'Name is required',
      maxLength: {
        value: settings.validationForm.userName.max,
        message: `Name needs to be not longer then ${settings.validationForm.userName.max} characters`,
      },
      minLength: {
        value: settings.validationForm.userName.min,
        message: `Name needs to be at least ${settings.validationForm.userName.min} characters`,
      },
    },
    email: {
      required: 'E-mail is required',
      pattern: {
        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        message: 'E-mail should be a valid address',
      },
    },
    password: {
      required: 'Password is required',
      maxLength: {
        value: settings.validationForm.password.max,
        message: `Password needs to be not longer then ${settings.validationForm.userName.max} characters`,
      },
      minLength: {
        value: settings.validationForm.password.min,
        message: `Password needs to be not longer then ${settings.validationForm.userName.max} characters`,
      },
    },
    repeatPassword: {
      validate: (repeatPassword: string) => currentPassword === repeatPassword || 'The passwords do not match',
    },
    agreement: {
      required: 'You need to agree to the terms before you can sign up',
    },
  };
  const onSubmit = (...data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
      <div className={styles.header}>
        <FormHeader tittle="Create new account" />
      </div>
      <div className={styles.field}>
        <FormInput
          label="Username"
          placeholder="some-username"
          refValidation={register(validationRules.userName)}
          error={errors.userName && errors.userName.message}
          name="userName"
        />
      </div>
      <div className={styles.field}>
        <FormInput
          label="Email address"
          placeholder="alex@example.com"
          refValidation={register(validationRules.email)}
          error={errors.email && errors.email.message}
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
      <div className={styles.field}>
        <FormInput
          label="Repeat Password"
          type="password"
          placeholder="Repeat Password"
          refValidation={register(validationRules.repeatPassword)}
          error={errors.repeatPassword && errors.repeatPassword.message}
          name="repeatPassword"
        />
      </div>
      <div className={styles.line} />
      <div className={styles.checkbox}>
        <FormCheckbox
          label="I agree to the processing of my personal information"
          name="agreement"
          refValidation={register(validationRules.agreement)}
          error={errors.agreement && errors.agreement.message}
        />
      </div>
      <div className={styles.button}>
        <FormButton type="submit" label="Create" />
      </div>
      <p className={styles.text}>
        Already have an account?{' '}
        <Link className={styles.link} to="/sgin-in">
          Sign In.
        </Link>
      </p>
    </form>
  );
};

export default FormSignUp;
