import { ActionsType, ArticleData } from './reducer';

export const setPage = (payload: { page: number }) => ({ type: ActionsType.SET_PAGE, payload });

export const setArticles = (payload: { articles: ArticleData[]; articlesCount: number }) => ({
  type: ActionsType.SET_ARTICLES,
  payload,
});

export const setArticle = (payload: { article: ArticleData }) => ({ type: ActionsType.SET_ARTICLE, payload });
