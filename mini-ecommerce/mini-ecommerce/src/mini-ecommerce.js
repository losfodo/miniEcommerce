import React, { useState } from 'react';//import padrão react.. arquivo principal.. /*useState é um Hook que te permite adicionar o state do React a um componente de função */
import './mini-ecommerce.css';
import Menu from './components/menu/menu';//import com caminho menu.js
import Produtos from './components/produtos/produtos';
import Checkout from './components/checkout/checkout';

function MiniEcommerce() {//muda função app padrão principal para MiniEcommerce
/*4 const states comtrolam app toda abaixo.. */
  const [carrinho, setCarrinho] = useState({ produtos: [] });//cria const para carrinhos para armazenar produtos comprados, inicialmente vazio[]
  const [exibirProdutos, setExibirProdutos] = useState(true);//exibir produtos
  const [exibirCheckout, setExibirCheckout] = useState(false);//quando finaliza compra checkout
  const [total, setTotal] = useState('0,00');//mantem valor total 

  function adicionarProduto(produto) {//adicionar produto de fato função
    const objCarrinho = Object.assign({}, carrinho);//Object.assign: cria uma copia ou faz junção de 2 objetos
    // atualizar a quantidade
    let novoProduto = true;//novo produto vdd
    objCarrinho.produtos.forEach((prod, indice) => {//forEach()= permite executar uma função para cada item de um array.(produto e indice de posição)
      if (prod.nome === produto.nome) {//se prod.nome igual produto nome
        objCarrinho.produtos[indice].quantidade++;//adiciona quantidade produto
        novoProduto = false;//novo produto falso pelo assing pois apenas atualiza
      }
    });
    // adicionar novo produto ao carrinho
    if (novoProduto) {//se for novo produto
      objCarrinho.produtos.push({//add novo produto a carrinho
        nome: produto.nome, preco: produto.preco, quantidade: 1//criando assim o produto novo e seus dados
      });
    }
    setCarrinho(objCarrinho);//finalizando add state
  }

  function handleExibirProdutos() {//cria função do click nos produtos exibidos no comprar do carrinho
    setExibirCheckout(false);//não vai checkout cadastro de comprar
    setExibirProdutos(true);//verdadeiro apenas para ver o produto
  }

  function handleExibirCheckout(total) {//total:passa soma total dos produtos
    setExibirCheckout(true);
    setExibirProdutos(false);
    setTotal(total);//passando total de tudo 
  }

  function handleLimparCarrinho() {//criando função q vai limpar carrinho apos cadastro feito
    setCarrinho({ produtos: [] });//produtos array vazio inicialmente.
  }

  return (//return das divs organizando menu produtos e checkout
    <div>
      <Menu
        produtos={carrinho.produtos}//Obs:todas possuem props.
        handleExibirProdutos={handleExibirProdutos}
        handleExibirCheckout={handleExibirCheckout} />{/*componente add menu.js importado no topo */}
      <Produtos
        visivel={exibirProdutos}//mostra produtos comprados
        adicionarProduto={adicionarProduto} />{/*segundo componente vai todos produtos */}
      <Checkout //tudo dentro checkout abaixo esta em proptypes is required no checkout.js
        visivel={exibirCheckout}
        handleExibirProdutos={handleExibirProdutos}
        total={total}
        produtos={carrinho}
        handleLimparCarrinho={handleLimparCarrinho} />{/*terceiro checkout da finalização da compra */}
    </div>
  );
}

export default MiniEcommerce;//exportando função
