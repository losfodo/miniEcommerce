const cidadesEstados = require('../cidades-estados.json');//importa arquivo json com todas cidades estados para o cadastro

function finalizarCompra(req, res) {//cria função..
  console.log(req.body);//sendo requisição post queremos pegar as informações do que será enviada através do body da requisição. Portanto, vamos ver o que temos no atributo body do parâmetro req.
  res.send('ok');//retornar simples ok padrão res resposta.. como enviar dados para uma api..
}

function obterCidadesPorEstado(req, res) {
  const siglaEstado = req.params['siglaEstado'].toUpperCase();//recebe sigla de estado, toUpperCase:independente maiusculo minusculo estados
  const dadosEstado = cidadesEstados.estados.filter(estado => estado.sigla === siglaEstado);//usar filter:para encontrar os dados cidades e estados e verifica se sigla igual sigla estado
  if (dadosEstado.length === 0) {//se tamanho array igual 0 ou se não escontro sigla de aquele estado
    res.status(404).json({erro: `${siglaEstado} não é um estado válido.`});//status 404 de erro notfound
  }
  res.json(dadosEstado[0].cidades);//retorna 200 ok feito[primeiro elemento lista]
}

module.exports = {//exports para importar..
  finalizarCompra, //importar finalizar compra..
  obterCidadesPorEstado 
}
