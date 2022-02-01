import React, { useState } from 'react';
import ListarProdutos from './listar-produtos';
import PropTypes from 'prop-types';//para gerar os props,certificar que os dados que você recebe são válidos,validadores,
import Alert from 'react-bootstrap/Alert';//alerts do bootstrap de cores sucess verde warning etc..

function Produtos(props) {//ao importar proptype add(props) na função construtora

  const [exibirMsg, setExibirMsg] = useState(false);//se alert sera exibido ou não do bootstrap inicia false
  const [produto, setProduto] = useState('');//padrão vazio produtos

  function visivel() {
    return props.visivel ? null : 'hidden';//se o props for visivel retorna null ou remove se não hidden se exibe em arquivo index.css q esconde oculta apenas o produto
  }

  function exibirMensagem(produto) {
    setExibirMsg(true);//aciona exibir mensagem q esta states inicialmente falso
    setProduto(produto.nome);//armazena produto nome apenas
    setTimeout(() => {//setTimeout:temporalizador de tempo
      setExibirMsg(false)//esconde mensagem apos um tempo
    }, 3000);//3 segundos
  }

  return (
    <div className={visivel()}>
      <Alert
        variant="success"//alerta sera verde
        style={{ margin: '10px' }}
        show={exibirMsg}>{/*show: comtrolar atributo */}
        <strong>{produto}</strong> adicionado com sucesso ao carrinho!{/*<b:negrito>add produto */}
      </Alert>
      <ListarProdutos
        exibirMensagem={exibirMensagem}//exibir mensagem de alerta
        adicionarProduto={props.adicionarProduto} />{/*chamado e importado listar produtos q vem do props */}
    </div>
  );
}

Produtos.propTypes = {
  visivel: PropTypes.bool.isRequired,//atributo visivel se for true ezibe produto visivel
  adicionarProduto: PropTypes.func.isRequired//atributo add produto.. miniEcomerce é componente pai é acionado e executara estas funcionalidades
}

export default Produtos;
