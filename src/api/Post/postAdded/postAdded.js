const POST_ADDED = 'POST_ADDED';
export default {
  Subscription: {
    postAdded: {
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator(POST_ADDED);
      },
    },
  },
};
