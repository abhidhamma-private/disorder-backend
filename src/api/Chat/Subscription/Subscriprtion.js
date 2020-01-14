export default {
  Subscription: {
    newChat: {
      subscribe: (_, __, { pubsub }) => {
        console.log('subscription');
        return pubsub.asyncIterator('NEW_CHAT');
      },
    },
  },
};
