import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    readAllDiary: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      return await prisma.diaries({
        orderBy: 'createdAt_DESC',
      });
    },
  },
};
