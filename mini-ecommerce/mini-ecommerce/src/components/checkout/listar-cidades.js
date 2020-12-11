import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';//Axios é um cliente HTTP baseado em Promises para fazer requisições. Pode ser utilizado tanto no navegador quando no Node. js

function ListarCidades(props) {//função para a escolha da cidade no estado escolhido anteriormente no cadsatro

  const CIDADES_URL = 'http://localhost:3001/mini-ecommerce/estado/:estado/cidades';//coloca url pega no postman com :estado=estado escolhido como SP, RJ..
  const [cidades, setCidades] = useState([]);//armazena em um state informaçoes das cidades retornadas, [array vazio inicialmente]

  useEffect(() => {//usar useEffect para preencher array vazio de const cidades
    async function obterCidades() {//função assincrona:permitem que escrever código baseado em promessa como se fosse síncrono, mas sem bloquear o segmento principal
      try {
        let { data } = await axios.get(CIDADES_URL.replace(':estado', props.estado));//let para obter retorno, chamada axios, get pegar url de cidades, replace:estado escolhido, props
        setCidades(data);//setando no states
      } catch(err) {
        setCidades([]);//erro se for vazio cidades
      }
    }

    if (props.estado !== '') {//se props estado for diferente de vazio ou escolhido
      obterCidades();//obtem as cidades para escolher..
    }

  }, [props.estado]);//monitorando prop

  return cidades.map(cidade =>//map:para chamar algum array especifico no caso escolha de alguma cidade do estado
    <option
      key={cidade} //chava unica cidade
      value={cidade}
      data-testid={cidade}>
      {cidade} 
    </option>
  );

}

ListarCidades.propTypes = {//define prop types
  estado: PropTypes.string.isRequired //do tipo string e obrigatorio
}

export default ListarCidades;//exporta p fora..
