import React from 'react';

import style from './MainLayout.module.scss';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import RouterComponent from '../RouterComponent/RouterComponent';

const MainLayout = () => (
  <div className={style.root}>
    <header className={style.header}>
      <HeaderComponent />
    </header>
    <main className={style.content}>
      <RouterComponent />
    </main>
  </div>
);

export default MainLayout;
