import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';//navbar:barra escura do menu,NavDropdown:balãozinho ao clicar no carrinho
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBasket, faCashRegister, faShoppingCart
} from '@fortawesome/free-solid-svg-icons';//icone carrinho, do checkout, carrinho de compras
import PropTypes from 'prop-types';
import ItensCarrinhoMenu from './itens-carrinho-menu';//importa o arquivo para gerar a conecção

function Menu(props) {//props função geral para passar na criação do componente

  function calcularTotal() {//função com calculo abaixo
    if (props.produtos.length === 0) {//se produtos for igual 0
      return '0,00';//retorna 0
    }
    let total = 0;//inicial total com 0
    props.produtos.forEach(produto => {//forEach:para cada produto executa uma ação
      let preco = produto.preco.replace(',', '.').replace('R$ ', '');//substituir , por . q é o aceito em codigos e remover replace R$
      total += parseFloat(preco) * produto.quantidade;//total é soma de parseFloat(preço)=analisa um argumento string e retorna um número de ponto flutuante *vezes produto quantidade se tiver mais de um no carrinho
    });
    return total.toFixed(2).toString().replace('.', ',');//formato legivel,toFixed(2)=valor duas casas 00.00,em string valor, replace para . virarem ,
  }

  return (//return sempre possui referencias junto html...
    <Navbar bg="dark" variant="dark">{/*icone importado acima e colocado topo menu escuro cor */}
      <Navbar.Brand href="">Mini Ecommerce</Navbar.Brand>{/*brand ou marca nome do menu */}
      <Navbar.Collapse className="justify-content-end">{/*manda dados para direita do carrinho, collapse:para agrupar e esconder conteúdos navbar, de acordo com o breakpoint do pai. */}
        <Nav>
          <NavDropdown //NavDropdown:abri menu de opçoes do carrinho de compras
            title={
              <div style={{ display: 'inline-block' }}>{/*deixar menu alinhado esquerda para direita ao carrinho icone */}
                <FontAwesomeIcon icon={faShoppingCart} />{/*coloca icone carrinho de compras */}
                &nbsp;{/*espaçamento com icone e carrinho  */}
                Carrinho
              </div>
            }
            drop="left">{/*abri a esquerda.. */}
            <NavDropdown.Item href=""//itens menu carrinho compras
              onClick={props.handleExibirProdutos}>{/*mostra os produtos */}
              <FontAwesomeIcon icon={faShoppingBasket} />{/*cesta de produtos icon, strong:negrito */}
              &nbsp;
              <strong>Produtos</strong>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <ItensCarrinhoMenu produtos={props.produtos} />{/*itens do carrinho aqui passado pdodutos q estão nos props */}
            <NavDropdown.Divider />{/*gera uma divisão linha fina abaixo espaçamento nas opçoes itens carrinho e total*/}
            <NavDropdown.Item href="" data-testid="total-carrinho">{/*preço total carrinho id */}
              Total: R$ {calcularTotal()}{/*função de calculo do total */}
            </NavDropdown.Item>
            <span className={props.produtos.length === 0 ? 'hidden' : null}>{/*span,se quantidade produtos for igual 0 mantem oculto hidden index.css ou aparece finalizar compra caso tenha produtos */}
              <NavDropdown.Divider />
              <NavDropdown.Item
                href=""
                style={{ color: 'green' }}
                onClick={() => props.handleExibirCheckout(calcularTotal())}>{/*cria botão para ir no checkout de finalizar compra com total calculado */}
                <FontAwesomeIcon icon={faCashRegister} />{/*icon caixa registradora finalizar compra */}
                &nbsp;
                Finalizar compra
              </NavDropdown.Item>
            </span>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

}

Menu.propTypes = {//props q serão colocados o q é necessario para carregar o componente
  produtos: PropTypes.array.isRequired,//primeiro produtos estarão no carrinho
  handleExibirProdutos: PropTypes.func.isRequired,//sera um click para ver os produtos q quer comprar
  handleExibirCheckout: PropTypes.func.isRequired //click para ir checkout finalizar compra do carrinho
}

export default Menu;//exporta para ser importado depois..
