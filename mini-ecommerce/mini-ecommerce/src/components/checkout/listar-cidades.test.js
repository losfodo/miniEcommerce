import React from 'react';
import { render } from '@testing-library/react';
import axiosMock from 'axios';//axios mock importado para teste apenas
import ListarCidades from './listar-cidades';

describe('Teste do componente de listagem de cidades', () => {

  it('deve gerar uma listagem de cidades', async () => {//função async pois precisara usar await
    axiosMock.get.mockResolvedValueOnce({ data: ['São Paulo', 'São Pedro']});
    const { findByTestId } = render(<ListarCidades estado="SP" />);
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(await findByTestId('São Paulo')).toHaveTextContent('São Paulo');
    expect(await findByTestId('São Pedro')).toHaveTextContent('São Pedro');
  });

});
