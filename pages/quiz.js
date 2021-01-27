import React from 'react';

export default function QuizPage() {
  return (
    <div>
      Página de Quiz
      { ' '.concat(new URL(document.location).searchParams.get('name')) }
    </div>
  );
}
