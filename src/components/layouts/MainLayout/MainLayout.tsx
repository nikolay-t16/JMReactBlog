import React from 'react';

import style from './MainLayout.module.scss';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import RouterComponent from '../RouterComponent/RouterComponent';

const MainLayout = () => (
  <div className={style.mainLayout}>
    <div className={style.mainLayout__header}>
      <HeaderComponent />
    </div>
    <div className={style.mainLayout__content}>
      <RouterComponent />
    </div>
  </div>
);

export default MainLayout;
