export function formatarCpf(cpf) { //formatando cpf
  cpf = cpf.replace(/\D/g, '');//removendo todos os dados não numericos
  if (cpf.length > 11) {//se cpf for maior q 11 digitos
    cpf = cpf.substring(0, 11);//pega os primeiros 11 numeros e formata
  }
  switch (cpf.length) {//estrutura condicional switch permite executar um bloco de código diferente de acordo com cada opção (cada case) especificada
    case 4:
    case 5:
    case 6://3 casos de digito coloca um ponto.
      cpf = cpf.replace(/(\d{3})(.*)/, '$1.$2');//aplica regra do ponto.. para ficar como o cpf é
      break;//break padrão
    case 7:
    case 8:
    case 9:
      cpf = cpf.replace(/(\d{3})(\d{3})(.*)/, '$1.$2.$3');//\d{3}=123.\d{3}=456.7
      break;
    case 10:
    case 11:
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(.*)/, '$1.$2.$3-$4');
      break;
    default:
      break;
  }
  return cpf;
}

export function validarCpf(cpf) {//calculo para o cpf não sair de forma irregular no caso validar
	if (!cpf) {
		return false;
	}
	cpf = cpf.replace(/\D/g, '');//removendo todos os valores q não sejam numericos
	if (cpf.length < 11) {
		return false;
	}
	let soma = 0;
    let resto;
  	if (cpf === '00000000000') {
  		return false;
  	}
  	for (let i=1; i<=9; i++) {
  		soma = soma + parseInt(cpf.substring(i-1, i)) * (11-i);
  	}
  	resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
    	resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10)) ) {
    	return false;
    }
  	soma = 0;
    for (let i = 1; i <= 10; i++) {
    	soma = soma + parseInt(cpf.substring(i-1, i)) * (12-i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
    	resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11) )) {
    	return false;
    }
    return true;
}
