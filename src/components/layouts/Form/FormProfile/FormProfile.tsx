import React from 'react';
import { useForm } from 'react-hook-form';

import styles from './FormProfile.module.scss';

import FormHeader from '../../../blocks/Form/FormHeader/FormHeader';
import FormInput from '../../../blocks/Form/FormInput/FormInput';
import FormButton from '../../../blocks/Form/FormButton/FormButton';
import settings from '../../../../settings.json';

type FormData = {
  username: string;
  email: string;
  password: string;
  imageUrl: string;
};

const FormProfile = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
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
        message: 'E-mail should be a valid address (myemail@gmail.com)',
      },
    },
    password: {
      required: 'Password is required',
    },
    imageUrl: {
      pattern: {
        value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
        message: 'Image url should be a valid url (https://google.com)',
      },
    },
  };
  const onSubmit = (...data: any) => console.log(data);

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.header}>
        <FormHeader tittle="Edit Profile" />
      </div>
      <div className={styles.field}>
        <FormInput
          label="Username"
          placeholder="Username"
          error={errors.username && errors.username.message}
          refValidation={register(validationRules.username)}
          name="username"
        />
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
          label="New password"
          type="password"
          placeholder="New password"
          refValidation={register(validationRules.password)}
          error={errors.password && errors.password.message}
          name="password"
        />
      </div>
      <div className={styles.field}>
        <FormInput
          label="Avatar image (url)"
          placeholder="Avatar image"
          error={errors.imageUrl && errors.imageUrl.message}
          refValidation={register(validationRules.imageUrl)}
          name="imageUrl"
        />
      </div>
      <div className={styles.button}>
        <FormButton type="submit" label="Save" />
      </div>
    </form>
  );
};

export default FormProfile;
