import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    readMyDiary: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      console.log('user.id : ', user.id);
      if (user.id) {
        const myDiaries = await prisma.user({ id: user.id }).diaries();

        if (myDiaries.length !== 0) {
          const descMyDiaries = await prisma
            .diaries({
              where: {
                user: {
                  id: user.id,
                },
              },
              orderBy: 'createdAt_DESC',
            })
            .catch(e => console.log(e));
          console.log('descMyDiaries : ', descMyDiaries);
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
