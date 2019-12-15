import { generateSecret, sendSecretMail } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        await sendSecretMail(email, loginSecret).catch(e => console.log(e));
        await prisma
          .updateUser({ data: { loginSecret }, where: { email } })
          .catch(e => console.log(e));
        return true;
      } catch {
        return false;
      }
    },
  },
};
