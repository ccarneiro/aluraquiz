import React, { useState, useEffect } from 'react';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import QuizContainer from '../src/components/QuizContainer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
// import Input from '../src/components/Input';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  // eslint-disable-next-line react/prop-types
  question, totalQuestions, questionIndex, onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <form onSubmit={(event) => {
          event.preventDefault();
          onSubmit(event.target.elements[questionId].value);
          return false;
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
              >
                <input
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  value={alternativeIndex}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit">Confirmar</Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [name, setName] = useState('');
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = db.questions[questionIndex];

  useEffect(() => {
    setName(new URL(document.location).searchParams.get('name'));
    setTimeout(() => setScreenState(screenStates.QUIZ), 2000);
  }, []);

  function handlerSubmitQuiz(value) {
    console.log('value', value);
    const nextQuestionIndex = questionIndex + 1;
    if (nextQuestionIndex < totalQuestions) {
      setQuestionIndex(nextQuestionIndex);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <>
      <div>
        Página de Quiz
        { ' '.concat(name) }
      </div>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              totalQuestions={totalQuestions}
              questionIndex={questionIndex}
              onSubmit={handlerSubmitQuiz}
            />
          )}
          {screenState === screenStates.LOADING && <LoadingWidget />}
          {screenState === screenStates.RESULT && <div>Você acertou tantas questões</div>}
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="http://github.com/ccarneiro" />
      </QuizBackground>
    </>
  );
}
