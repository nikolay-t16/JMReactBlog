import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import userHeaderDefault from '../../../../../assets/images/user_header_default.jpg';
import styles from './HeaderAuthUser.module.scss';

import { StateData, UserData } from '../../../../../redux/reducer';
import * as actions from '../../../../../redux/actions';

type HeaderAuthUserProps = {
  user: UserData | null;
  setUser: (params: { user: UserData | null }) => void;
};

const HeaderAuthUser = ({ user, setUser }: HeaderAuthUserProps) => {
  const onLogOut = () => {
    setUser({ user: null });
  };
  return (
    <div className={styles.root}>
      <Link to="/new-article" className={styles.newArticle}>
        Create article
      </Link>
      <Link to="/profile" className={styles.user}>
        <span>{user && user.username}</span>
        <img className={styles.userImg} width="46" src={user?.image || userHeaderDefault} alt="" />
      </Link>
      <button type="button" onClick={onLogOut} className={styles.logOut}>
        Log Out
      </button>
    </div>
  );
};

export default connect(
  ({ user }: StateData) => ({ user }),
  (dispatch) => {
    const { setUser } = bindActionCreators(actions, dispatch);
    return { setUser };
  },
)(HeaderAuthUser);
