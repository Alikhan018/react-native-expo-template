import constants from '../../app.config';

const extra = constants.expo.extra;

export const config = {
    apiUrl: extra.API_URL,
    authTokenKey: extra.AUTH_TOKEN_KEY,
    authUserKey: extra.AUTH_USER_KEY,
} as const;
