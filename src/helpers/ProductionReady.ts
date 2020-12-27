import { ArticleData } from '../store/reducer';

class ProductionReady {
  protected readonly API_PATH = 'https://conduit.productionready.io/api/';

  protected readonly Paths = {
    API_FETCH_ARTICLES: 'articles',
    API_FETCH_ARTICLE: 'articles/',
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

  protected async fetch(
    path: string,
    getParams: object = {},
    method: string = 'GET',
    postParams: object = {},
  ): Promise<any> {
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
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    return response.json();
  }

  public async fetchArticles(
    page: number,
    perPage: number,
  ): Promise<{ articles: ArticleData[]; articlesCount: number }> {
    const offset = (page - 1) * perPage;
    return this.fetch(this.Paths.API_FETCH_ARTICLES, { offset, limit: perPage });
  }

  public async fetchArticle(slug: string): Promise<ArticleData> {
    return this.fetch(`${this.Paths.API_FETCH_ARTICLE}${slug}`).then(({ article }) => article);
  }
}

export default ProductionReady;
