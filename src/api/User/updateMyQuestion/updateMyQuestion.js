import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    updateMyQuestion: async (_, args, { request, isAuthenticated }) => {
      console.log('updateMyQuestion');
      if (isAuthenticated(request)) return false;
      const { question } = args;
      const { user } = request;

      //질문의 아이디를 받아온다.
      const [{ id: idOfQuestion }] = await prisma.questions({
        where: {
          type: question,
        },
      });

      try {
        //유저의 포린키에 같은 질문이 있는지 확인한다.
        const checkQuestionExistence = await prisma.$exists.user({
          AND: [{ id: user.id }, { questions_some: { id: idOfQuestion } }],
        });
        if (checkQuestionExistence) {
          //갖고있는 질문이면 뺀다
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              questions: { disconnect: { id: idOfQuestion } },
            },
          });
        } else {
          //안갖고있는 질문이면 더한다.
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              questions: { connect: { id: idOfQuestion } },
            },
          });
        }
        return true;
      } catch {
        return false;
      }
    },
  },
};
// const diaryAllQuestions = await prisma.questions();
// //업데이트 할 질문을 만든다.
// const currentUserQuestion = diaryAllQuestions.filter(
//   diaryAllQuestion => questions.indexOf(diaryAllQuestion.type) > -1
// );
//console.log('업데이트 할 질문 : ', currentUserQuestion);

// const updatedUserQuestion = await prisma
//   .updateUser({
//     where: { id: user.id },
//     data: {
//       questions: {
//         update: {
//           data: {
//             currentUserQuestion,
//           },
//         },
//       },
//     },
//   })
//   .catch(e => console.log(e));
// console.log('업데이트된 유저질문 : ', updatedUserQuestion);
// //저장된 유저의 질문을 받아온다.
// const lastUserQuestion = await prisma
//   .user({ id: user.id })
//   .questions()
//   .catch(e => console.log('lastUserQuestionError : ', e));
// console.log('저장된 유저의 질문 : ', lastUserQuestion);

// //저장된 유저의 질문을 다 지운다.
// const removeResult = await lastUserQuestion.map(async question => {
//   console.log('remove');
//   await prisma
//     .updateUser({
//       where: { id: user.id },
//       data: {
//         questions: {
//           disconnect: {
//             id: question.id,
//           },
//         },
//       },
//     })
//     .catch(e => console.log(e));
// });
// console.log(
//   '지운결과',
//   removeResult.map(result => result.then(e => console.log(e)))
// );

// //업데이트 할 유저의 질문을 다 넣는다.
// const updateResult = await currentUserQuestion.map(async question => {
//   console.log('update');
//   prisma
//     .updateUser({
//       where: { id: user.id },
//       data: {
//         questions: {
//           connect: {
//             id: question.id,
//           },
//         },
//       },
//     })
//     .then(e => console.log(e))
//     .catch(e => console.log(e));
// });
// console.log(
//   '업데이트 한 결과',
//   updateResult.map(result => result.then(e => console.log(e)))
// );
