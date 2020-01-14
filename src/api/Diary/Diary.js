import { prisma } from '../../../generated/prisma-client';

export default {
  Diary: {
    user: ({ id }) => prisma.diary({ id }).user(),
    question: ({ id }) => prisma.diary({ id }).question(),
  },
};
