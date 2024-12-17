import http from '../http';

export const BasicInfoApiCall = (body: any) => {
  return http.put({
    url: '/v1/user-service/user',
    data: {
      update_with: body,
    },
  });
};
