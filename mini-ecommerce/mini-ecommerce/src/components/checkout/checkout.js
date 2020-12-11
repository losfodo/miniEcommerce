import React, { useState } from 'react';  /*quando finaliza compra checkout ou seja formulario ou cadastro */
import { Form, Row, Col, Button, Jumbotron, Modal } from 'react-bootstrap';//importando o que sera usado com bootstrap
import 'react-datepicker/dist/react-datepicker.css';//css do calendario
import DatePicker, { registerLocale } from 'react-datepicker';//importar o calendario em si, registerLocale: calendario em portugues
import pt from 'date-fns/locale/pt';//importa para o portugues a localização
import PropTypes from 'prop-types';
import ListarEstados from './listar-estados';//importa arquivo com todos estados
import ListarCidades from './listar-cidades';
import { Formik } from 'formik'; //formik para dar vida ao formulario ou cadastro
import * as yup from 'yup';//Yup faz validações de dados como string , integer , boolean , array , object e date o que torna muito simples mesmo para os que acabaram de conhecer a ferramenta
import { validarCpf, formatarCpf } from '../../utils/cpf-util';//validação do cpf
import formatarCep from '../../utils/cep-util';//formato correto cep import arquivo
import axios from 'axios';//Axios é um cliente HTTP baseado em Promises para fazer requisições.

registerLocale('pt', pt);//colocando localização em portugues

function Checkout(props) {

  const CHECKOUT_URL = 'http://localhost:3001/mini-ecommerce/checkout/finalizar-compra';//url do backend onde vai enviar os dados

  const [dataNascimento, setDataNascimento] = useState(null);//data nascimento inicialmente nulo
  const [formEnviado, setFormEnviado] = useState(false);//confirmação se foi enviado formulario ou não, inicia falso
  const [showModal, setShowModal] = useState(false);//2 controles modal sucesso..
  const [showErroModal, setShowErroModal] = useState(false);//modal de erro

  const schema = yup.object({//usando yup.. especificando todas as validaçoes do formulario
    email: yup.string().email().required(), //required:obrigatorio
    nomeCompleto: yup.string().required().min(5),//min(5)=tamanho minimo de 5
    cpf: yup.string().required().min(14).max(14)//min e max maximo tamanho 14
          .test('cpf-valido', 'CPF inválido', (cpf) => validarCpf(cpf)),//cria função test(1validar,2erro,3regra faz validação colocando import)
    endereco: yup.string().min(5).required(),
    cidade: yup.string().required(),
    estado: yup.string().required(),
    cep: yup.string().required().min(9).max(9),
    emailPromocional: yup.string().required(),
    termosCondicoes: yup.bool().oneOf([true])//oneOf vai procurar pelo valor true q seria obrigatorio para o termos
  });

  function visivel() {//para não aparecer a tela de checkout na tela inicial e sim ao clicar no finalizar compra
    return props.visivel ? null : 'hidden';//se estiver visivel não retorna nenhuma classe se não add classe hidden p não ser exibido
  }

  async function finalizarCompra(dados) {//ao enviar formulario o formik chama função finalizarCompra
    if (!dataNascimento) {//se não tem data nascimento
      setFormEnviado(true);//formulario foi enviado
      return;//retorna pois sem data de nascimento a compra não é feita
    }/**colocando data de nascimento q não possuem em formik */
    dados.dataNascimento = dataNascimento;//concatenando data em dados
    dados.produtos = JSON.stringify(props.produtos);//stringify() converte valores em javascript para uma String JSON
    dados.total = `R$ ${props.total}`;//coloca total comprado
    try {
      await axios.post(CHECKOUT_URL, dados);//envio para o formulario com post e axios http e url do backend passando os dados
      setShowModal(true);//exibindo modal de sucesso
      props.handleLimparCarrinho();//limpar o carrinho
    } catch(err) {//caso erro
      setShowErroModal(true);//modal de error
    }
  }

  function handleDataNascimento(data) {
    setDataNascimento(data);//recebe a data e armazena no state dados da data
  }

  function datePickerCss() {//para organizar o formato da barra de data com form-control
    if (!formEnviado) {//se não for enviado..
      return "form-control"; //retorna formControl
    }
    if (dataNascimento) {
      return "form-control is-valid";
    } else {
      return "form-control is-invalid";
    }
  }

  function handleContinuar() {//finalizado compra com sucesso modal clicou em continuar
    setShowModal(false);//fecha a janela
    props.handleExibirProdutos();//voltando para pagina de produtos
  }

  function handleFecharErroModal() {//erro na compra no cadastro
    setShowErroModal(false);
  }

  return (
    <Jumbotron //Componente leve e flexível para exibir conteúdo do bootstrap
      fluid //jumbotron modificado que ocupa todo o espaço horizontal de seu elemento pai
      style={{margin: '10px'}}
      className={visivel()}>{/*cha,a função visivel */}
      <h3 className="text-center">Finalizar compra</h3>

      <Formik //coloca formik com todo o form dentro, pois form é como corpo o corpo do formik
        onSubmit={(values) => finalizarCompra(values)}//onSubmit: o q ocorre ao enviar dados.. formik chama função finalizarCompra
        initialValues={{//valores iniciais do formulario são enviado..
          email: '',
          nomeCompleto: '',
          cpf: '',
          endereco: '',
          cidade: '',
          estado: '',
          cep: '',
          termosCondicoes: false, //inicia falso usuario deve clicar a aceitar termos
          emailPromocional: 'S' //inicia s valor padrão tbm
        }}
        validationSchema={schema}>{/*passa validation schema passando assim o yup */}
        {({//colocando objstos abaixo q serão usados da função anonima ou eventos do formik
          handleSubmit,//enviar form
          handleChange,//quando modificar alguns dados formulario
          values,//valores do formulario armazena internamente
          touched,//validação se foi modificado
          errors//auxilia a exibição
        }) => ( //cria uma função anonima entre formik form
          <Form //formulario
            noValidate //desabilita validaçoes padroes do html5 pois usaremos formik
            style={{margin: '10px'}}
            onSubmit={handleSubmit}>{/*colocando formulario o enviar compra, evento do formik */}
            <Form.Group as={Row} controlId="email">{/*row:tipo linha, criando email formulario */}
              <Form.Label column sm={3}>{/*tamanho de 12 total tela sera 3 apenas label */}
                Email
              </Form.Label>
              <Col sm={9}>{/*coluna para campo de texto sm:small + para mobile */}
                <Form.Control //campo de texto fica aqui
                  type="email" //tipo q é, 
                  placeholder="Digite o seu email"//placehold: escrito em cinza na barra de digitação
                  name="email"
                  data-testid="txt-email"//apenas para test
                  value={values.email}//value do formik
                  onChange={handleChange}//onChange: para sincronizar os valores formik
                  isValid={touched.email && !errors.email}//isValid:validação de sucesso{valor ja modificado ou não & não existir erro retorna verdadeiro}
                  isInvalid={touched.email && !!errors.email} />{/*isInvalid: erro validação, !!troca valor 2 vezes ou não possue erro se nega o valor ou erro é verdadeiro  */}
                <Form.Control.Feedback type="invalid">{/*mensagem de erro caso ele falhe email */}
                  Digite um email válido.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>{/*fim da parte email do formulario */}

            <Form.Group as={Row} controlId="nomeCompleto">{/*parte do nome completo... */}
              <Form.Label column sm={3}>
                Nome completo
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu nome completo"
                  name="nomeCompleto"
                  data-testid="txt-nome-completo"
                  value={values.nomeCompleto}
                  onChange={handleChange}
                  isValid={touched.nomeCompleto && !errors.nomeCompleto}
                  isInvalid={touched.nomeCompleto && !!errors.nomeCompleto} />
                <Form.Control.Feedback type="invalid">
                  Digite o seu nome completo (mínimo 5 caracteres).
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="dataNascimento">
              <Form.Label column sm={3}>
                Data de nascimento
              </Form.Label>
              <Col sm={9}>
                <DatePicker //usa DatePicker do bootstrap
                  locale="pt" //em portugues
                  peekNextMonth //proximos meses
                  showMonthDropdown //para exibir meses
                  showYearDropdown
                  dropdownMode="select" //tipo select
                  dateFormat="dd/MM/yyyy" //formato como sera
                  placeholderText="Selecione a data"
                  withPortal //withPortal: faz a abertura do tipo não modal
                  selected={dataNascimento}//saleciona data
                  onChange={handleDataNascimento}//handle proprio para data
                  className={datePickerCss()} />{/*arrumar estilo da data com css e esta função */}
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="cpf">
              <Form.Label column sm={3}>
                CPF
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu CPF"
                  name="cpf"
                  data-testid="txt-cpf"
                  values={values.cpf}
                  onChange={e => {//função anonima
                    e.currentTarget.value = formatarCpf(e.currentTarget.value);//e=evento,currentTarget:intercepta numero cpf e faz a formatação
                    handleChange(e);//chama handlechange para finalizar resto
                  }}
                  isValid={touched.cpf && !errors.cpf}
                  isInvalid={touched.cpf && !!errors.cpf} />
                <Form.Control.Feedback type="invalid">
                  Digite um CPF válido
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="endereco">
              <Form.Label column sm={3}>
                Endereço
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu endereço completo"
                  name="endereco"
                  data-testid="txt-endereco"
                  value={values.endereco}
                  onChange={handleChange}
                  isValid={touched.endereco && !errors.endereco}
                  isInvalid={touched.endereco && !!errors.endereco} />
                <Form.Control.Feedback type="invalid">
                  Digite o seu endereço.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="estado">
              <Form.Label column sm={3}>
                Estado
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="select" //tipo selecionavel combobox
                  name="estado"
                  data-testid="estado"
                  value={values.estado}
                  onChange={handleChange}
                  isValid={touched.estado && !errors.estado}
                  isInvalid={touched.estado && !!errors.estado}>
                  <ListarEstados />{/*lista dos estados arquivo com todos os estados */}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Selecione o seu estado.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="cidade">
              <Form.Label column sm={3}>
                Cidade
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="select"
                  name="cidade"
                  data-testid="cidade"
                  value={values.cidade}
                  onChange={handleChange}
                  isValid={touched.cidade && !errors.cidade}
                  isInvalid={touched.cidade && !!errors.cidade}>
                  <option value="">Selecione a cidade</option>{/*apenas option com valor */}
                  <ListarCidades estado={values.estado} />{/*ao selecionar estado recebe chamado servidor e recebera todas as cidades daquele estado */}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Selecione a sua cidade
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="cep">
              <Form.Label column sm={3}>
                CEP
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu CEP"
                  name="cep"
                  data-testid="txt-cep"
                  value={values.cep}
                  onChange={e => {//função anonima
                    e.currentTarget.value = formatarCep(e.currentTarget.value);//coloca formatação do arquivo cep-util.js
                    handleChange(e);
                  }}
                  isValid={touched.cep && !errors.cep}
                  isInvalid={touched.cep && !!errors.cep} />
                <Form.Control.Feedback type="invalid">
                  Digite o seu CEP.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="emailPromocional">
              <Form.Label column sm={12}>{/*12 pois ocupara a linha inteira total da tela é 12 */}
                Deseja receber email com promoções?
              </Form.Label>
              <Form.Check //primeiro check pois opção de clique
                inline //na mesma linha com inline
                name="emailPromocional"
                type="radio" //tipo radio de escolher ao clique
                id="promocaoSim"
                value="S" //valor do click s de sim
                label="Sim" //primeira opção escrita 
                style={{marginLeft: '15px'}}
                checked={values.emailPromocional === 'S'}//verifica se esta selecionado ou não com formik
                onChange={handleChange} />
              <Form.Check //segundo check criando dentro do formGroup
                inline
                name="emailPromocional"//name tem q ser igual de ambos do form.check para se conectarem
                id="promocaoNao"
                value="N" //valor de não no caso
                type="radio"
                label="Não"
                checked={values.emailPromocional === 'N'}//formik valor não no caso
                onChange={handleChange} />
            </Form.Group>{/*não necessita validação Form.Control.Feedback type="invalid" pois um sera selecionado de qualquer forma ou não é obrigato escolha */}

            <Form.Group as={Row} controlId="termosCondicoes">
              <Form.Check //checkbox dos termos tbm check só q um só
                name="termosCondicoes"
                label="Concordo com os termos e condições"
                style={{marginLeft: '15px'}}
                data-testid="check-termos-condicoes"
                value={values.termosCondicoes}
                onChange={handleChange}
                isValid={touched.termosCondicoes && !errors.termosCondicoes}
                isInvalid={touched.termosCondicoes && !!errors.termosCondicoes} />
            </Form.Group>

            <Form.Group as={Row} controlId="finalizarCompra">
              <Col className="text-center" sm={12}>{/*centraliza texto e ocupa 12 toda a linha */}
                <Button //botão
                  type="submit" //tipo de botão.. onsubmit do formik ja é selecionado
                  variant="success" //verde bootstrap cor botão
                  data-testid="btn-finalizar-compra">
                  Finalizar compra
                </Button>
              </Col>
            </Form.Group>
          </Form>
        )}
      </Formik>

      <Modal //modal: uma janela exibido quando a compra for sucesso ou erro.. no caso sucesso
        show={showModal}//mostra o modal
        data-testid="modal-compra-sucesso"
        onHide={handleContinuar}>{/*para tratar questão de quando é fechado ou não */}
        <Modal.Header closeButton>
          <Modal.Title>Compra realizada com sucesso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Um email de confirmação foi enviado com os detalhes da transação.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleContinuar}>{/*botão para continuar fechando janela pois tudo certo */}
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal //modal caso tenha dado erro no cadastro
        show={showErroModal}//erro ao mostrar modal
        data-testid="modal-erro-comprar"
        onHide={handleFecharErroModal}>
        <Modal.Header closeButton>
          <Modal.Title>Erro ao processar pedido.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tente novamente em instantes.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleFecharErroModal}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>

    </Jumbotron>
  );

}

Checkout.propTypes = {//opçoes q serão obrigatorias para checkout
  visivel: PropTypes.bool.isRequired,//visivel para controle tela checkout
  handleExibirProdutos: PropTypes.func.isRequired,//ao terminar a compra voltar para tela inicial
  total: PropTypes.string.isRequired, //total em fotmato texto dos preços
  produtos: PropTypes.object.isRequired,//produtos q vão para api tbm
  handleLimparCarrinho: PropTypes.func.isRequired//função para limpar o carrinho
}

export default Checkout;
