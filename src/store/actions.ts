import { ActionsType, ArticleData, UserData } from './reducer';

export const setPage = (payload: { page: number }) => ({ type: ActionsType.SET_PAGE, payload });

export const setArticles = (payload: { articles: ArticleData[]; articlesCount: number }) => ({
  type: ActionsType.SET_ARTICLES,
  payload,
});

export const setArticle = (payload: { article: ArticleData }) => ({ type: ActionsType.SET_ARTICLE, payload });

export const setUser = (payload: { user: UserData | null }) => ({ type: ActionsType.SET_USER, payload });
