export type ActionData = {
  type: string;
  payload?: any;
};

export type ArticleData = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};

export type UserData = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string | null;
};

export type StateData = {
  user: UserData | null;
  articles: ArticleData[];
  article: ArticleData | null;
  page: number;
  articlesCount: number;
  articleFetchError: string;
  isAuth: boolean;
};

export enum ActionsType {
  SET_PAGE = 'SET_PAGE',
  SET_ARTICLES = 'SET_ARTICLES',
  SET_ARTICLE = 'SET_ARTICLE',
  SET_FAVORITE_ARTICLE = 'SET_FAVORITE_ARTICLE',
  SET_FAVORITE_ARTICLE_LIST = 'SET_FAVORITE_ARTICLE_LIST',
  SET_USER = 'SET_USER',
}
