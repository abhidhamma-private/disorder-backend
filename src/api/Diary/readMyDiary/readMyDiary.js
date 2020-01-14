import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    readMyDiary: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;

      if (user.id) {
        const myDiaries = await prisma.user({ id: user.id }).diaries();

        if (myDiaries.length !== 0) {
          const descMyDiaries = await prisma
            .diaries({
              orderBy: 'createdAt_DESC',
            })
            .catch(e => console.log(e));
          console.log(descMyDiaries);
          return descMyDiaries;
        } else {
          return await prisma.diaries({
            orderBy: 'createdAt_DESC',
          });
        }
      } else {
        return await prisma.diaries({
          orderBy: 'createdAt_DESC',
        });
      }
    },
  },
};
