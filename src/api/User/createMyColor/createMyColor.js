import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    createMyColor: async (_, args, { request, isAuthenticated }) => {
      console.log('createMyColor');
      isAuthenticated(request);
      const { user } = request;
      const { avatar } = args;
      await prisma
        .updateUser({
          where: { id: user.id },
          data: {
            avatar: avatar,
          },
        })
        .catch(e => {
          console.log(e);
          return false;
        });
      return true;
    },
  },
};
