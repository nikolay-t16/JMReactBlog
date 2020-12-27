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

export type StateData = {
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
}

const defaultState: StateData = {
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
  };

  const action = actions[type];
  if (action) {
    return action(payload);
  }
  return state;
};

export default reducer;
