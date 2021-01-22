import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from '../Form.module.scss';

import settings from '../../../../settings.json';
import FormHeader from '../../../blocks/Form/FormHeader/FormHeader';
import FormInput from '../../../blocks/Form/FormInput/FormInput';
import FormCheckbox from '../../../blocks/Form/FormCheckbox/FormCheckbox';
import FormButton from '../../../blocks/Form/FormButton/FormButton';
import { ValidationErrorsData } from '../../../../helpers/ValidationError';

export type FormSignUpData = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  agreement: boolean;
};

type FormSignUpProps = {
  onSubmit: (formData: FormSignUpData) => void;
  errors: ValidationErrorsData;
};

const FormSignUp = ({ onSubmit, errors: fetchingErrors }: FormSignUpProps) => {
  const { register, handleSubmit, watch, errors } = useForm<FormSignUpData>();
  const currentPassword: string = watch('password', '');
  const validationRules = {
    username: {
      required: 'Name is required',
      maxLength: {
        value: settings.validationForm.username.max,
        message: `Name needs to be not longer then ${settings.validationForm.username.max} characters`,
      },
      minLength: {
        value: settings.validationForm.username.min,
        message: `Name needs to be at least ${settings.validationForm.username.min} characters`,
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
        message: `Password needs to be not longer then ${settings.validationForm.username.max} characters`,
      },
      minLength: {
        value: settings.validationForm.password.min,
        message: `Password needs to be not longer then ${settings.validationForm.username.max} characters`,
      },
    },
    repeatPassword: {
      validate: (repeatPassword: string) => currentPassword === repeatPassword || 'The passwords do not match',
    },
    agreement: {
      required: 'You need to agree to the terms before you can sign up',
    },
  };

  const getFieldError = (field: 'email' | 'username', fieldLabel: string): string => {
    if (errors[field]?.message) {
      return errors[field]?.message || '';
    }

    if (fetchingErrors[field]) {
      return `${fieldLabel} ${fetchingErrors[field]?.join(', ')}`;
    }
    return '';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
      <div className={styles.header}>
        <FormHeader tittle="Create new account" />
      </div>
      <div className={styles.field}>
        <FormInput
          label="Username"
          placeholder="some-username"
          refValidation={register(validationRules.username)}
          error={getFieldError('username', 'Username')}
          name="username"
        />
      </div>
      <div className={styles.field}>
        <FormInput
          label="Email address"
          placeholder="alex@example.com"
          refValidation={register(validationRules.email)}
          error={getFieldError('email', 'Email')}
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
