import React from 'react';
import { connect } from 'react-redux';

import styles from './HeaderUser.module.scss';

import HeaderNotAuthUser from './HeaderNotAuthUser/HeaderNotAuthUser';
import { StateData, UserData } from '../../../../redux/d';
import HeaderAuthUser from './HeaderAuthUser/HeaderAuthUser';

type HeaderUserProps = {
  user: UserData | null;
};

const HeaderUser = ({ user }: HeaderUserProps) => (
  <div className={styles.root}>{user ? <HeaderAuthUser /> : <HeaderNotAuthUser />}</div>
);

export default connect(({ user }: StateData) => ({ user }))(HeaderUser);
