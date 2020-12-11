import React from 'react';
import { render } from '@testing-library/react';
import MiniEcommerce from './mini-ecommerce';//troca app padrão p MiniEcommerce

describe('Teste do componente mini-ecommerce', () => {//adicionando switch de testes

  it('deve renderizar o componente sem erros', () => {//test ou it nome q for ver os erros
    const { getByText } = render(<MiniEcommerce />);//troca app para não dar problema de compilação.. apenas componente de entrada
    const linkElement = getByText('Mini Ecommerce');//ferificar se ta rodando tudo certo exemplo checkout e outros do projeto unitariamente
    expect(linkElement).toBeInTheDocument();
  });

});//digitar no terminal mini-ecommerce.test.js    : ver se ta rodando corretamente
