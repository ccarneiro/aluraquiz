import React, { useState, useEffect } from 'react';

import Widget from '../../components/Widget';
import Footer from '../../components/Footer';
import QuizContainer from '../../components/QuizContainer';
import GitHubCorner from '../../components/GitHubCorner';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import BackLinkArrow from '../../components/BackLinkArrow';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        <Spinner />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  // eslint-disable-next-line react/prop-types
  question, totalQuestions, questionIndex, onSubmit,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestSubmitted, setIsQuestSubmitted] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
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
        <AlternativesForm onSubmit={(event) => {
          event.preventDefault();
          setIsQuestSubmitted(true);
          setTimeout(() => {
            // onSubmit(event.target.elements[questionId].value);
            onSubmit(isCorrect);
            setIsQuestSubmitted(false);
            setSelectedAlternative(undefined);
          }, 3000);
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            // className={isSelected && 'checked'}
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestSubmitted && alternativeStatus}
              >
                <input
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button
            type="submit"
            disabled={!hasAlternativeSelected}
          >
            Confirmar
          </Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({results, name}) {
  return (
    <Widget>
      <Widget.Header>
        Resultado
      </Widget.Header>
      <Widget.Content>
        <p>
          {`Parabéns ${name}, acertou`}
          {` ${results.reduce((prev, curr) => (curr ? (prev + 1) : prev), 0)} `}
          perguntas
        </p>
        <ul>
          {results.map((result, idx) => (
            <li key={`resultado__${idx}`}>
              {`#${Number(idx + 1).toString().padStart(2, '0')} Resultado: ${result ? 'Correto' : 'Errado'}`}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizScreen({ externalQuestions, externBg }) {
  const [name, setName] = useState('');
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = externalQuestions.length;
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = externalQuestions[questionIndex];

  useEffect(() => {
    setName(new URL(document.location).searchParams.get('name'));
    setTimeout(() => setScreenState(screenStates.QUIZ), 2000);
  }, []);

  function handlerSubmitQuiz(value) {
    console.log('value', value);
    const nextQuestionIndex = questionIndex + 1;
    setResults([...results, value]);
    if (nextQuestionIndex < totalQuestions) {
      setQuestionIndex(nextQuestionIndex);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <>
      <QuizBackground backgroundImage={externBg}>
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
          {screenState === screenStates.RESULT && <ResultWidget results={results} name={name}/>}
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="http://github.com/ccarneiro" />
      </QuizBackground>
    </>
  );
}
