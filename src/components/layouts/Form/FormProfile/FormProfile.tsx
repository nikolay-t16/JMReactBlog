import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import styles from '../Form.module.scss';

import FormHeader from '../../../blocks/Form/FormHeader/FormHeader';
import FormInput from '../../../blocks/Form/FormInput/FormInput';
import FormButton from '../../../blocks/Form/FormButton/FormButton';
import settings from '../../../../settings.json';
import { UserData } from '../../../../redux/reducer';
import { ValidationErrorsData } from '../../../../helpers/ValidationError';

export type FormProfileData = {
  email: string;
  username: string;
  image: string;
  password: string;
};

type FormProfileProps = {
  user: UserData | null;
  onSubmit: (user: FormProfileData) => void;
  errors: ValidationErrorsData;
};

const FormProfile = ({ user, onSubmit, errors: fetchingErrors }: FormProfileProps) => {
  const { register, handleSubmit, errors } = useForm<FormProfileData>({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      image: user?.image || '',
    },
  });
  const history = useHistory();
  if (user === null) {
    history.push('/sign-in');
  }
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
      maxLength: {
        value: settings.validationForm.password.max,
        message: `Password needs to be not longer then ${settings.validationForm.username.max} characters`,
      },
      minLength: {
        value: settings.validationForm.password.min,
        message: `Password needs to be not longer then ${settings.validationForm.username.max} characters`,
      },
    },
    image: {
      pattern: {
        value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
        message: 'Image url should be a valid url (https://google.com)',
      },
    },
  };

  const getFieldError = (field: 'email', fieldLabel: string): string => {
    if (errors[field]?.message) {
      return errors[field]?.message || '';
    }

    if (fetchingErrors[field]) {
      return `${fieldLabel} ${fetchingErrors[field]?.join(', ')}`;
    }
    return '';
  };

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
          error={getFieldError('email', 'Email')}
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
          error={errors.image && errors.image.message}
          refValidation={register(validationRules.image)}
          name="image"
        />
      </div>
      <div className={styles.button}>
        <FormButton type="submit" label="Save" />
      </div>
    </form>
  );
};

export default FormProfile;
