import React from 'react';
import { useRouter } from 'next/router'

export default function QuizDaGaleraPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      Desafio da próxima aula junto com as animações
      {id}
    </div>
  );
}
