export type FetchingErrorsData = {
  email?: string[];
  username?: string[];
};

export default class FetchingError extends Error {
  errors: any = {};

  constructor(errors?: FetchingErrorsData) {
    super();
    if (errors) {
      this.errors = errors;
    }
  }
}
