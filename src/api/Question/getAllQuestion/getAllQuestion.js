import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    getAllQuestion: async (_, __, { request }) => await prisma.questions(),
  },
};
