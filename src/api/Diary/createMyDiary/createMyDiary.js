import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createMyDiary: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { content, good, score, questionId } = args;
      const { user } = request;
      try {
        const fact = prisma
          .createDiary({
            content: content,
            good: good,
            question: { connect: { id: questionId } },
            user: { connect: { id: user.id } },
            score: score,
          })
          .catch(e => console.log(e));

        fact.then(e => console.log('팩트는 : ', e));

        return true;
      } catch {
        return false;
      }
    },
  },
};
