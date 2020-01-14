import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    getQuestionsOfMe: async (_, __, { request, isAuthenticated }) => {
      //if(isAuthenticated(request)) return false;
      const { user } = request;
      console.log('getQUestionsOfMe : ', user.id);
      try {
        const UserQuestion = await prisma
          .user({ id: user.id })
          .questions()
          .catch(e => console.log(e));
        return UserQuestion;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
