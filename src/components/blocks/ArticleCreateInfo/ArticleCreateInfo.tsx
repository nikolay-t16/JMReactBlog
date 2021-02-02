import React from 'react';
import { format } from 'date-fns';

import styles from './ArticleCreateInfo.module.scss';
import userIconDefoult from '../../../assets/images/user_default.svg';
import settings from '../../../settings.json';
import { subStringWithWords } from '../../../helpers/StringHelper';

type ArticleCreateInfoProps = {
  name: string;
  date: Date;
  image: string | null;
};

const ArticleCreateInfo = ({ name, date, image }: ArticleCreateInfoProps) => (
  <div className={styles.root}>
    <img className={styles.image} src={image || userIconDefoult} alt="user icon" />
    <div className={styles.content}>
      <p className={styles.contentName} title={name.length < settings.articleNameMaxLength ? name : ''}>
        {subStringWithWords(name, settings.articleNameMaxLength)}
      </p>
      <p className={styles.contentDate}>{format(new Date(date), 'MMM d, yyyy')}</p>
    </div>
  </div>
);

export default ArticleCreateInfo;
