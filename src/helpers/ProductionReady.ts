import { ArticleData, UserData } from '../store/reducer';
import ValidationError from './ValidationError';

export type RegisterUserData = {
  username: string;
  email: string;
  password: string;
};

export type LoginUserData = {
  email: string;
  password: string;
};

export type FetchData = {
  path: string;
  getParams?: object;
  method?: 'GET' | 'POST';
  postParams?: object;
};

class ProductionReady {
  protected readonly API_PATH = 'https://conduit.productionready.io/api/';

  protected readonly Paths = {
    API_FETCH_ARTICLES: 'articles',
    API_FETCH_ARTICLE: 'articles/',
    API_REGISTRATION: 'users',
    API_LOGIN: 'users/login',
  };

  protected searchId: string | null = null;

  protected makeQueryString = (params: any): string => {
    if (Object.keys(params).length === 0) {
      return '';
    }
    return Object.keys(params)
      .map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  };

  protected async fetch({ path, getParams = {}, method = 'GET', postParams = {} }: FetchData): Promise<any> {
    const queryString = this.makeQueryString(getParams);
    const apiPath = `${this.API_PATH}${path}?${queryString}`;
    const params: any = { method };
    if (method !== 'GET') {
      params.body = JSON.stringify(postParams);
      params.headers = { 'Content-Type': 'application/json;charset=utf-8' };
    }
    const response = await fetch(apiPath, params).catch(() => {
      throw new Error('connection error');
    });
    if (!response.ok) {
      const body: any = await response.json().catch(() => {});
      if (body?.errors) {
        throw new ValidationError(body.errors);
      }
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    return response.json();
  }

  public async fetchArticles(
    page: number,
    perPage: number,
  ): Promise<{ articles: ArticleData[]; articlesCount: number }> {
    const offset = (page - 1) * perPage;
    return this.fetch({
      path: this.Paths.API_FETCH_ARTICLES,
      getParams: { offset, limit: perPage },
    });
  }

  public async fetchArticle(slug: string): Promise<ArticleData> {
    return this.fetch({
      path: `${this.Paths.API_FETCH_ARTICLE}${slug}`,
    }).then(({ article }) => article);
  }

  public async registerUser(regUser: RegisterUserData): Promise<UserData> {
    return this.fetch({ path: this.Paths.API_REGISTRATION, method: 'POST', postParams: { user: regUser } }).then(
      ({ user }) => user,
    );
  }

  public async loginUser(loginUser: LoginUserData): Promise<UserData> {
    return this.fetch({ path: this.Paths.API_LOGIN, method: 'POST', postParams: { user: loginUser } }).then(
      ({ user }) => user,
    );
  }
}

export default ProductionReady;
