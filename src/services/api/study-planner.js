import http from '../http';

export const GetSchedulerListForUserApiCall = () => {
  return http.get({
    url: '/v1/scheduler-service/schedules',
    messageSettings: { hideSuccessMessage: true, hideErrorMessage: true },
  });
};

export const UpdateStatusOfSchedulerApiCall = (body, schedulerId) => {
  return http.put({
    url: '/v1/scheduler-service/schedule/' + schedulerId,
    data: { update_with: body },
  });
};

export const CreateSchedulerApiCall = (body) => {
  return http.post({
    url: '/v1/scheduler-service/schedule',
    data: body,
  });
};

export const GetTaskBetweenRangeApiCall = (schedulerId, startDate, endDate) => {
  if (!schedulerId) {
    return http.get({
      url:
        '/v1/scheduler-service/get-tasks-by-range?start_date=' +
        startDate +
        '&end_date=' +
        endDate,
      messageSettings: { hideSuccessMessage: true },
    });
  }

  return http.get({
    url:
      '/v1/scheduler-service/get-tasks-by-range/?start_date=' +
      startDate +
      '&end_date=' +
      endDate +
      '&scheduler_id=' +
      schedulerId,
    messageSettings: { hideSuccessMessage: true },
  });
};

export const AddTaskApiCall = (body) => {
  return http.post({
    url: '/v1/scheduler-service/task',
    data: body,
  });
};

export const AddTaskByQueryApiCall = (body) => {
  return http.post({
    url: '/v1/scheduler-service/task/query',
    data: body,
    messageSettings: { hideSuccessMessage: true },
  });
};

export const RemoveTaskApiCall = (taskId) => {
  return http.delete({
    url: '/v1/scheduler-service/task/' + taskId,
  });
};

export const UpdateTaskApiCall = (body, scheduleId, taskId) => {
  const data = {
    update_with: {
      ...body,
    },
  };
  if (scheduleId) {
    data.schedule_id = scheduleId;
  }
  return http.post({
    url: '/v1/scheduler-service/task/' + taskId,
    data: {
      update_with: {
        ...body,
      },
    },
  });
};

export const AddExamScheduleApiCall = (body) => {
  return http.post({
    url: '/v1/scheduler-service/schedule',
    data: body,
  });
};

export const GetSchedulerListForExam = () => {
  return http.get({
    url: '/v1/scheduler-service/schedules',
  });
};
