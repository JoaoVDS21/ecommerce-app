export const phoneMask = (value: string) => {
  if (!value) return "";

  value = value.replace(/\D/g,'');
  value = value.replace(/(\d{2})(\d)/,"($1) $2");
  value = value.replace(/(\d)(\d{4})$/,"$1-$2");

  return value
}

export const cnpjMask = (value: string) => {;
  if (!value) return "";

  value = value.replace(/\D/g,"");
  value = value.replace(/^(\d{2})(\d)/,"$1.$2");
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
  value = value.replace(/\.(\d{3})(\d)/,".$1/$2");
  value = value.replace(/(\d{4})(\d)/,"$1-$2");

  return value
}

export const cpfMask = (value: string | undefined) => {
  if (!value) return "";
  
  value = value.replace(/\D/g,"");
  value = value.replace(/(\d{3})(\d)/,"$1.$2");
  value = value.replace(/(\d{3})(\d)/,"$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/,"$1-$2");

  return value
}

export const zipCodeMask = (value: string) => {
  if (!value) return "";

  value = value.replace(/\D/g,'');
  value = value.replace(/(\d{5})(\d)/,'$1-$2');
  
  return value;
}

/**
 * Função para formatar números para moeda brasileira (R$)
 * @param value - O valor a ser formatado (pode ser número ou string)
 * @returns String formatada no padrão brasileiro de moeda
 */
export function moneyMask(value: number | string, {withMaskText = true} = {}): string {
  // Converte para número se for string
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
  // Verifica se é um número válido
  if (isNaN(numericValue)) {
    throw new Error('Valor inválido para formatação de moeda');
  }
  
  // Formata para duas casas decimais
  const formattedValue = numericValue.toFixed(2);
  
  // Substitui o ponto por vírgula
  const withComma = formattedValue.replace('.', ',');

  if(!withMaskText){
    return withComma;
  }
  
  // Adiciona o prefixo R$
  return `R$ ${withComma}`;
}

export const creditCardMask = (cardNumber: string | number) => { 
  if(!cardNumber) return '';

  const cleanNumber = cardNumber.toString().replace(/\s/g, '');
  
  return cleanNumber.replace(/(.{4})/g, '$1 ').trim();
}