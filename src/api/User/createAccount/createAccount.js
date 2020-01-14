import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    createAccount: async (_, args) => {
      //if(isAuthenticated(request)) return false;
      const { userName } = args;
      const user = await prisma.createUser({ userName });
      return generateToken(user.id);
    },
  },
};
