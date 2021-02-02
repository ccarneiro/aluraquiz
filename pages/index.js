import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import QuizContainer from '../src/components/QuizContainer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

/*
const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;
*/

export const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
`;

/*
const Input = styled.input`
  width: 100%;
  height: 38px;
  line-height: 38px;
  background-color: ${({ theme }) => theme.colors.mainBg};
  color: ${({ theme }) => theme.colors.contrastText};
  border: solid 1px ${({ theme }) => theme.colors.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
`;
*/

/*
const Button = styled.button`
  width: 100%;
  height: 36px;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.contrastText};
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  border-style: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
*/

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h2>Titulo</h2>
          </Widget.Header>
          <Widget.Content>
            <p>
              Teste os seus conhecimentos sobre o universoMarvel e
              divirta-se criando o seu AluraQuiz!
            </p>
            <form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Fazendo submissão por meio do React');
            }}
            >
              <Input
                name="nomeDoUsuario"
                placeholder="Entre com seu nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Button
                type="submit"
                disabled={!name}
              >
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h2>Quiz da galera</h2>
            <p>Dá uma olhada nesses quizes incríveis que o pessoal da Imersão Alguma coisa fez:</p>
            <ul>
              {db.external.map((link, idx) => {
                const [projectName, username] = link.replace(/https?:\/\//, '').replace(/.vercel.app\/?/, '').split('.');
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={`link__${idx}`}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${username}`}
                    >
                      {`${username}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 1, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="http://github.com/ccarneiro" />
    </QuizBackground>
  );
}
