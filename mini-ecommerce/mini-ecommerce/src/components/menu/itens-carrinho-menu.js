import React from 'react';
import PropTypes from 'prop-types';
import { NavDropdown } from 'react-bootstrap';//navegação menu bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';//icones pego no site do font awesome importado para uso 
import { faSadTear } from '@fortawesome/free-solid-svg-icons';//icone de carinha trite quando carrinho estiver vazio

function ItensCarrinhoMenu(props) {

  function render() {
    // carrinho vazio
    if (props.produtos.length === 0) {//se o carrinho estiver vazio
      return (
        <NavDropdown.Item href="" data-testid="itens">
          <FontAwesomeIcon icon={faSadTear} />{/*coloca icone emoji triste */}
          &nbsp;
          Carrinho vazio...
        </NavDropdown.Item>
      );
    }
    // listagem dos Produtos, se o carrinho tiver produtos...
    const itens = props.produtos.map(produto =>//map() invoca a função callback passada por argumento para cada elemento do Array e devolve um novo Array como resultado.
      <NavDropdown.Item href="" key={produto.nome} data-testid={produto.nome}>{/*key=id para evitar duplicidade, */}
        {produto.nome} - {produto.quantidade} x {produto.preco} {/*nome do produto - quantidade * preço */}
      </NavDropdown.Item>
    );
    return itens;
  }

  return render();

}

ItensCarrinhoMenu.propTypes = {//apenas produtos no menu
  produtos: PropTypes.array.isRequired
}

export default ItensCarrinhoMenu;
