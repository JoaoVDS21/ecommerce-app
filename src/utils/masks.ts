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

export const moneyMask = (value: string | number, {withMaskText = true, decimalConverter = true} = {}) => {
  if(!value) return withMaskText ? "R$ 0,00" : '0,00';
  
  if(typeof value === 'string') {
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '')
  }

  const options = { minimumFractionDigits: 2 }
  const result = new Intl.NumberFormat('pt-BR', options).format(
    decimalConverter ? +value / 100 : +value
  )

  return (withMaskText ? 'R$ ' : '') + result
}

export const creditCardMask = (cardNumber: string | number) => { 
  if(!cardNumber) return '';

  const cleanNumber = cardNumber.toString().replace(/\s/g, '');
  
  return cleanNumber.replace(/(.{4})/g, '$1 ').trim();
}