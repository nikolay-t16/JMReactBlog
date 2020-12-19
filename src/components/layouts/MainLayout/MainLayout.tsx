import React from 'react';

import style from './MainLayout.module.scss';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import RouterComponent from '../RouterComponent/RouterComponent';

const MainLayout = () => (
  <div className={style.root}>
    <div className={style.header}>
      <HeaderComponent />
    </div>
    <div className={style.content}>
      <RouterComponent />
    </div>
  </div>
);

export default MainLayout;
