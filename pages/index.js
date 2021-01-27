import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';

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

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    text-align: justify;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 38px;
  line-height: 38px;
  background-color: ${({ theme }) => theme.colors.mainBg};
  color: ${({ theme }) => theme.colors.contrastText};
  border: solid 1px ${({ theme }) => theme.colors.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

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

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h2>Titulo</h2>
          </Widget.Header>
          <Widget.Content>
            <p>
              Teste os seus conhecimentos sobre o universoMarvel e
              divirta-se criando o seu AluraQuiz!
            </p>
            <form onSubmit={function submitQuiz(event) {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Fazendo submissão por meio do React');
            }}
            >
              <Input
                placeholder="Entre com seu nome"
                value={name}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={function onInputChange(event) {
                  setName(event.target.value);
                }}
              />
              <Button
                type="submit"
                disabled={!name}
              >
                Jogar [
                {name}
                ]
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h2>Quiz da galera</h2>
            <p>Dá uma olhada nesses quizes incríveis que o pessoal da Imersão Alguma coisa fez:</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="http://github.com/ccarneiro" />
    </QuizBackground>
  );
}
