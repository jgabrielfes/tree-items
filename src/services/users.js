import defaultValues from '../utils/defaultValues';

// FUNÇÃO CRIADA PARA CHECAR SE USUÁRIO ESTÁ SALVO (JÁ TRATADO CASO NÃO HAJA A CHAVE NO STORAGE)
export function isUserStorageKey(userId, key) {
  return localStorage[key] ? JSON.parse(localStorage[key]).includes(userId) : defaultValues[key];
}

// FUNÇÃO CRIADA PARA ADICIONAR/REMOVER USUÁRIO DA LISTA DE SALVOS
export function setUserStorageKey(userId, value, key) {
  let userKey = localStorage[key] ? JSON.parse(localStorage[key]) : [];

  if (value) {
    if (!userKey.includes(userId)) userKey.push(userId);
  } else {
    userKey = userKey.filter((id) => id !== userId);
  }

  localStorage[key] = JSON.stringify(userKey);
}
