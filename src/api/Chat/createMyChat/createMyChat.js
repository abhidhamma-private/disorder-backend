export default {
  Mutation: {
    createMyChat: (
      _,
      args,
      { request, isAuthenticated, pubsub, NEW_CHAT, chattingLog }
    ) => {
      console.log('write');
      isAuthenticated(request);
      const { user } = request;

      const { description } = args;
      const id = chattingLog.length;
      const userid = user.id;
      const writer = user.userName;
      const avatar = user.avatar;
      const newChat = {
        id: userid + id,
        userid: userid,
        writer: writer,
        description: description,
        avatar: avatar,
      };
      chattingLog.push(newChat);
      pubsub.publish(NEW_CHAT, { newChat });
      return 'YES';
    },
  },
};
