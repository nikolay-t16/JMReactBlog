import settings from '../settings.json';

const getUserToken = (): string | null => {
  try {
    return localStorage.getItem(settings.userTokenParamName);
  } catch {
    return null;
  }
};

const setUserToken = (token: string | null): void => {
  try {
    if (token) {
      localStorage.setItem(settings.userTokenParamName, token);
    } else {
      localStorage.removeItem(settings.userTokenParamName);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export { getUserToken, setUserToken };
