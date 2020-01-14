export default {
  Query: {
    chatting: (_, args, { request, isAuthenticated, chattingLog }) => {
      console.log('chatting');
      isAuthenticated(request);
      return chattingLog;
    },
  },
};
