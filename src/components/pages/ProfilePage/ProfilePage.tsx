import React from 'react';

import styles from './ProfilePage.module.scss';
import FormProfile from '../../layouts/Form/FormProfile/FormProfile';

const ProfilePage = () => (
  <div className={styles.root}>
    <div className={styles.content}>
      <FormProfile />
    </div>
  </div>
);

export default ProfilePage;
