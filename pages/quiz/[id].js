import React from 'react';
import { useRouter } from 'next/router';

import QuizScreen from '../../src/screens/Quiz';
import { ThemeProvider } from 'styled-components';

export default function QuizDaGaleraPage({ dbExterno }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externBg={dbExterno.bg}
      />
      </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  // console.log('getServerSideProps context', context);
  const [projectName, user] = context.query.id.split('___');
  const dbExterno = await fetch(`https://${projectName}.${user}.vercel.app/api/db`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Falha ao pegar os dados');
      }
      return response.json();
    })
    .catch((error) => console.error(error));
  return {
    props: {
      id: context.query.id,
      username: context.query.name || null,
      dbExterno,
    },
  };
}
