import React from 'react';

import classNames from 'classnames';
import styles from './FormTags.module.scss';

type FormTagsProps = {
  tags: Map<string, string>;
  add: () => void;
  remove: (key: string) => void;
  edit: (key: string, tag: string) => void;
};

const FormTags = ({ tags, add, remove, edit }: FormTagsProps) => {
  const tagsNodes = [...tags.entries()].map(([key, tag]) => (
    <div className={styles.tag} key={key}>
      <input
        className={styles.input}
        value={tag}
        onChange={(event) => {
          edit(key, event.target.value);
        }}
        placeholder="Tag"
      />
      <button
        type="button"
        className={classNames(styles.button, styles.remove)}
        onClick={() => {
          remove(key);
        }}
      >
        Delete
      </button>
    </div>
  ));

  return (
    <div className={styles.root}>
      <div className={styles.tags}>{tagsNodes}</div>
      <button
        className={styles.button}
        type="button"
        onClick={() => {
          add();
        }}
      >
        add
      </button>
    </div>
  );
};

export default FormTags;
