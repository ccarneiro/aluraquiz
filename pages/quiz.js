import React from 'react';

export default function QuizPage() {
  return (
    <div>
      Página de Quiz
      { ' '.concat(new URL(window.location).searchParams.get('name')) }
    </div>
  );
}
