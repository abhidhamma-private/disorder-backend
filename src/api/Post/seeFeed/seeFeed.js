import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      if (user.id) {
        const following = await prisma.user({ id: user.id }).following();
        if (following.length !== 0) {
          return prisma.posts({
            where: {
              user: {
                id_in: [...following.map(user => user.id), user.id],
              },
            },
            orderBy: 'createdAt_DESC',
          });
        } else {
          return prisma.posts({
            orderBy: 'createdAt_DESC',
          });
        }
      } else {
        return prisma.posts({
          orderBy: 'createdAt_DESC',
        });
      }
    },
  },
};
