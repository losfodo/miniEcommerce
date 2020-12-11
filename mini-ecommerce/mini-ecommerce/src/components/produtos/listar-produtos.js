import React from 'react';
import placeholder from '../../imagens/286x180.png';//..volta componentes,..volta raiz,importando imagem pode ser algum produto
import Card from 'react-bootstrap/Card';//importa react bootstrap
import Button from 'react-bootstrap/Button';//importa botão componente bootstrap
import PropTypes from 'prop-types';//exporta uma variedade de validadores que podem ser usados para certificar que os dados que você recebe são válidos. utilizamos PropTypes.até com string . Quando um valor inválido for fornecido a uma prop, um alerta será exibido no console JavaScript.

function ListarProdutos(props) {

  const produtos = [/*array statico msm com lista de produtos */
    { nome: 'Aprenda Java', preco: 'R$ 59,99' },
		{ nome: 'JavaScript em 24 horas', preco: 'R$ 19,99' },
		{ nome: 'React em 7 dias', preco: 'R$ 29,99' },
		{ nome: 'Algoritmos e Estrutura de Dados', preco: 'R$ 25,99' },
		{ nome: 'Start-Up', preco: 'R$ 29,99' },
		{ nome: 'Testes Unitários com Jasmine', preco: 'R$ 14,99' },
		{ nome: 'APIs RESTful com Spring e Java', preco: 'R$ 15,99' },
		{ nome: 'TypeScript na prática', preco: 'R$ 9,99' }
  ];

  function handleComprar(event, produto) {//função de clique de comprar produto(evento q serafeito, produto sera comprado)
    event.preventDefault();//para tela não ser atualizada
    props.adicionarProduto(produto);//add produto no carrinho com liberação propTypes, armazenado metodo exibirCarrinho
    props.exibirMensagem(produto);//mensagem de q foi adicionado carrinho
  }

  function render() {//função tera retorn da render
    let key = 1;
    const cards = produtos.map(produto =>//retorna array de todos cards alterados,map:map() invoca a função callback passada por argumento para cada elemento do Array e devolve um novo Array como resultado.
      <Card
        key={key}/*key:tipo id */
        data-testid={'card' + key++}//para cada card imclementa mais um id key++
        style={{ width: '18rem', margin: '10px', float: 'left' }}>{/*18rem proporciona tamanho de acordo com a tela, float:leaft para ser exibido esquerda */}
        <Card.Img variant="top" src={placeholder} />{/*exibe img referenciada placeholder  */}
        <Card.Body className="text-center">{/*corpo centraliza tela */}
          <Card.Title style={{ height: '40px' }}>{/*nome produtos */}
            {produto.nome}
          </Card.Title>
          <Card.Text>
            Descrição do produto aqui...
          </Card.Text>
          <Button
            variant="success"
            style={{ width: '100%' }}
            onClick={(event) => handleComprar(event, produto)}>{/*função dentro click.. linha20 */}
            Comprar ({produto.preco})
          </Button>{/*botão bootstrap com sucess cor verde, evento click com preço */}
        </Card.Body>
      </Card>
    );
    return cards;//return da função para ser retornado no render
  }

  return render();//vai retornar os dados da função render
}

ListarProdutos.propTypes = {//cria proptype de validação na lista produtos recebendo 2 funçoes..
  adicionarProduto: PropTypes.func.isRequired,//função adicionar produto
  exibirMensagem: PropTypes.func.isRequired //e gerar aviso mensagem... isRequired:em caso de erro mostra no console
}

export default ListarProdutos;
