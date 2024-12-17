import http from 'services/http';

export const createChatTrackerId = async () => {
  return http.post({
    url: '/v1/chat-service/chat-tracker',
    messageSettings: { hideSuccessMessage: true },
  });
};

export const getChatByChatTrackerId = async (chatTrackerId: string) => {
  return http.get({
    url: '/v1/scheduler-service/task-chat-tracker/' + chatTrackerId,
    messageSettings: { hideSuccessMessage: true },
  });
};
