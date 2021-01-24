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

const defaultState: StateData = {
  user: null,
  articles: [],
  article: null,
  page: 1,
  articlesCount: 0,
  articleFetchError: '',
  isAuth: false,
};

type SetArticlesProps = { page: number; articlesCount: number; articles: ArticleData[] };

const reducer = (state: StateData = defaultState, { type, payload }: ActionData) => {
  const actions: any = {
    [ActionsType.SET_PAGE]: ({ page }: { page: number }): StateData => ({ ...state, page }),
    [ActionsType.SET_ARTICLES]: ({ articlesCount, articles }: SetArticlesProps): StateData => ({
      ...state,
      articlesCount,
      articles,
    }),
    [ActionsType.SET_ARTICLE]: ({ article }: { article: ArticleData }) => ({ ...state, article }),
    [ActionsType.SET_FAVORITE_ARTICLE]: () => {
      if (!state.article || state.article.favorited) {
        return state;
      }
      const article = { ...state.article };
      article.favorited = true;
      article.favoritesCount += 1;
      return { ...state, article };
    },
    [ActionsType.SET_FAVORITE_ARTICLE_LIST]: ({ slug }: { slug: string }) => {
      const articleIndex = state.articles.findIndex((item) => item.slug === slug && !item.favorited);
      if (articleIndex === -1) {
        return state;
      }
      const articles = [...state.articles];
      const article = { ...articles[articleIndex] };
      articles[articleIndex] = article;
      article.favorited = true;
      article.favoritesCount += 1;
      return { ...state, articles };
    },
    [ActionsType.SET_USER]: ({ user }: { user: UserData | null }) => ({ ...state, user }),
  };

  const action = actions[type];
  if (action) {
    return action(payload);
  }
  return state;
};

export default reducer;
