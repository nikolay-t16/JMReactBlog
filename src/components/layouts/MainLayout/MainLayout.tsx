import React from 'react';

import style from './MainLayout.module.scss';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import RouterComponent from '../RouterComponent/RouterComponent';

const MainLayout = () => (
  <div>
    <div className={style.header}>
      <HeaderComponent />
    </div>
    <div>
      <RouterComponent />
    </div>
  </div>
);

export default MainLayout;
