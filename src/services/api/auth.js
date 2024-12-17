import http from '../http';

export const LoginApiCall = (body: any) => {
  return http.post({
    url: '/v1/user-service/login',
    data: body,
    messageSettings: { successMessage: 'Login Successfully' },
  });
};

export const RegisterApiCall = (body: any) => {
  return http.post({
    url: '/v1/user-service/user',
    data: body,
    messageSettings: { successMessage: 'Register Successfully' },
  });
};

export const GetOAuthUrlApiCall = () => {
  return http.get({
    url: '/v1/user-service/get-oauth-url',
    messageSettings: { hideSuccessMessage: true },
  });
};
