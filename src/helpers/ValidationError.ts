export type ValidationErrorsData = {
  email?: string[];
  username?: string[];
  password?: string[];
};

export default class ValidationError extends Error {
  errors: any = {};

  constructor(errors?: ValidationErrorsData) {
    super();
    if (errors) {
      this.errors = errors;
    }
  }
}
