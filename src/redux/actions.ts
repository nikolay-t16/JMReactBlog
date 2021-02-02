import { Dispatch } from 'redux';
import { ActionsType, ArticleData, UserData } from './d';
import { setUserToken } from '../helpers/storage';
import { productionReady } from '../helpers/ProductionReady';

export const setPage = (payload: { page: number }) => ({ type: ActionsType.SET_PAGE, payload } as const);

export const setArticles = (payload: { articles: ArticleData[]; articlesCount: number }) =>
  ({
    type: ActionsType.SET_ARTICLES,
    payload,
  } as const);

export const setArticle = (payload: { article: ArticleData }) => ({ type: ActionsType.SET_ARTICLE, payload } as const);

export const setUser = (payload: { user: UserData | null }) => {
  const { user } = payload;
  setUserToken(user?.token || null);
  return { type: ActionsType.SET_USER, payload } as const;
};

export const setFavoriteArticle = (payload: { slug: string }) =>
  ({ type: ActionsType.SET_FAVORITE_ARTICLE, payload } as const);
export const setFavoriteArticleInList = (payload: { slug: string }) =>
  ({
    type: ActionsType.SET_FAVORITE_ARTICLE_LIST,
    payload,
  } as const);

export const makeFavoriteArticle = ({
  token,
  slug,
  setInList,
}: {
  token: string;
  slug: string;
  setInList: boolean;
}) => (dispatch: Dispatch) => {
  if (setInList) {
    dispatch(setFavoriteArticleInList({ slug }));
  } else {
    dispatch(setFavoriteArticle({ slug }));
  }
  productionReady.makeFavoriteArticle(token, slug).catch();
};
