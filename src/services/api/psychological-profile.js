import http from '../http';

export const AskQuetionApiCall = (body) => {
  if (!body) {
    return http.post({
      url: '/v1/knowledge-base-service/psychological-profie/ask-question',
      messageSettings: { hideSuccessMessage: true },
    });
  }
  return http.post({
    url: '/v1/knowledge-base-service/psychological-profie/ask-question',
    data: body,
    messageSettings: { hideSuccessMessage: true },
  });
};

export const GetAllQuestionListApiCall = () => {
  return http.get({
    url: '/v1/knowledge-base-service/questions',
    messageSettings: { hideErrorMessage: true, hideSuccessMessage: true },
  });
};

export const CreateProfileApiCall = (userId) => {
  return http.post({
    url: '/v1/knowledge-base-service/psychological-profie',
    config: {
      headers: {
        'x-user-id': userId,
      },
    },
  });
};

export const GiveDescriptionApiCall = (body) => {
  return http.post({
    url: '/v1/knowledge-base-service/psychological-profie/description',
    data: body,
  });
};
