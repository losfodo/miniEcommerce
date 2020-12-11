import React from 'react';
import { render } from '@testing-library/react';
import Produtos from './produtos';

describe('Teste do componente produtos', () => {

  it('deve renderizar o componente quando visível', () => {
    const { getAllByText } = render(
      <Produtos visivel={true} adicionarProduto={() => false} />//função anonima não interfere no projeto
    );
    const botoes = getAllByText(/comprar/i);
    expect(botoes).toBeTruthy();//toBeTruthy: q estão presentes
  });

});
