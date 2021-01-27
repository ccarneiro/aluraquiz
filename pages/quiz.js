import React, { useState, useEffect } from 'react';

export default function QuizPage() {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(new URL(document.location).searchParams.get('name'));
  }, []);

  return (
    <div>
      Página de Quiz
      { ' '.concat(name) }
    </div>
  );
}
