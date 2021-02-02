import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import styles from '../Form.module.scss';

import FormHeader from '../../../blocks/Form/FormHeader/FormHeader';
import FormInput from '../../../blocks/Form/FormInput/FormInput';
import FormButton from '../../../blocks/Form/FormButton/FormButton';
import FormTextarea from '../../../blocks/Form/FormTextarea/FormTextarea';
import { ArticleData } from '../../../../redux/d';
import { EditArticleData } from '../../../../helpers/ProductionReady';
import FormTags from '../../../blocks/Form/FormTags/FormTags';

type FormArticleProps = {
  tittle: string;
  onSubmit: (article: EditArticleData) => void;
  article?: ArticleData | null;
};

const FormArticle = ({ tittle, onSubmit, article }: FormArticleProps) => {
  const makeTagsMap = (tagsArr: string[]) => {
    const tagsMap = new Map<string, string>();
    tagsArr.forEach((tag) => {
      tagsMap.set(nanoid(), tag);
    });
    return tagsMap;
  };

  const [tags, setTags] = useState<Map<string, string>>(makeTagsMap(article?.tagList || []));

  const { register, handleSubmit, errors } = useForm<EditArticleData>({
    defaultValues: {
      title: article?.title || '',
      description: article?.description || '',
      body: article?.body || '',
    },
  });
  const validationRules = {
    title: { required: 'title is required' },
    description: { required: 'short description is required' },
    body: { required: 'text is required' },
  };

  const addTag = () => {
    setTags((oldTags) => {
      const newTags = new Map([...oldTags]);
      newTags.set(nanoid(), '');
      return newTags;
    });
  };
  const removeTag = (key: string) => {
    setTags((oldTags) => {
      const newTags = new Map([...oldTags]);
      newTags.delete(key);
      return newTags;
    });
  };
  const editTag = (key: string, tag: string) => {
    setTags((oldTags) => {
      const newTags = new Map([...oldTags]);
      newTags.set(key, tag);
      return newTags;
    });
  };

  const submit = (submitArticle: EditArticleData) => {
    const newArticle = { ...submitArticle };
    const filteredTags = [...tags.values()].filter((tag) => !!tag);
    const uniqTags = new Set([...filteredTags]);
    newArticle.tagList = [...uniqTags];
    onSubmit(newArticle);
    setTags(makeTagsMap(newArticle.tagList));
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.root}>
      <div className={styles.header}>
        <FormHeader tittle={tittle} />
      </div>
      <div className={styles.field}>
        <FormInput
          label="Tittle"
          placeholder="Tittle"
          refValidation={register(validationRules.title)}
          error={errors?.title?.message}
          name="title"
        />
      </div>
      <div className={styles.field}>
        <FormInput
          label="Short description"
          placeholder="Short description"
          refValidation={register(validationRules.description)}
          error={errors?.description?.message}
          name="description"
        />
      </div>
      <div className={classNames(styles.textArea, styles.field)}>
        <FormTextarea
          label="Text"
          placeholder="Text"
          refValidation={register(validationRules.body)}
          error={errors?.body?.message}
          name="body"
        />
      </div>
      <div className={styles.field}>
        <FormTags tags={tags} add={addTag} remove={removeTag} edit={editTag} />
      </div>
      <div className={classNames(styles.button, styles.buttonMiddle)}>
        <FormButton type="submit" label="Send" />
      </div>
    </form>
  );
};

FormArticle.defaultProps = {
  article: null,
};

export default FormArticle;
