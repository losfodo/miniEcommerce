export default function formatarCep(cep) { /**formatando cep com ponto e traços numeros */
  cep = cep.replace(/\D/g, '');//faz replace.. remove todos as letras e deixa vazio no lugar ''
  if (cep.length > 8) {//se cep for mais q 8 digitos...
    cep = cep.substring(0, 8);//apenas até 8 digitos.. substring() retorna a parte da string entre os índices inicial e final, ou até o final da string
  }
  if (cep.length > 5) {//se cep for + 5...
    cep = cep.replace(/(\d{5})(.*)/, '$1-$2');//$1-$2=divide em 2 blocos, \d{5}=pega os 5 primeiros numeros, (.*)=todo restante final de numeros
  }
  return cep;
}
