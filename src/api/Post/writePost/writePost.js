import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    writePost: async (_, args, { request, isAuthenticated }) => {
      if(isAuthenticated(request)) return false;
      const { title, file } = args;
      const { user } = request;
      //const post = await prisma.$exists.post({ id, user: { id: user.id } });
      try {
        const createPost = prisma.createPost({
          user: user,
          title: title,
          file: file,
        });

        console.log(createPost);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
