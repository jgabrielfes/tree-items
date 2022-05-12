// FUNÇÕES CRIADAS PARA CHECAR SE USUÁRIO ESTÁ SALVO (JÁ TRATADO CASO NÃO HAJA A CHAVE NO STORAGE)
export function isSavedUser(userId) {
  return localStorage.savedUsers ? JSON.parse(localStorage.savedUsers).includes(userId) : false;
}

export function isIndeterminateUser(userId) {
  return localStorage.indeterminateUsers ? JSON.parse(localStorage.indeterminateUsers).includes(userId) : false;
}

export function isHiddenUser(userId) {
  return localStorage.hiddenUsers ? JSON.parse(localStorage.hiddenUsers).includes(userId) : false;
}

// FUNÇÕES CRIADAS PARA ADICIONAR/REMOVER USUÁRIO DA LISTA DE SALVOS
export function setSavedUser(userId, saved) {
  let savedUsers = localStorage.savedUsers ? JSON.parse(localStorage.savedUsers) : [];

  if (saved) {
    if (!savedUsers.includes(userId)) savedUsers.push(userId);
  } else {
    savedUsers = savedUsers.filter((id) => id !== userId);
  }

  localStorage.savedUsers = JSON.stringify(savedUsers);
}

export function setIndeterminateUser(userId, indeterminate) {
  let indeterminateUsers = localStorage.indeterminateUsers ? JSON.parse(localStorage.indeterminateUsers) : [];

  if (indeterminate) {
    if (!indeterminateUsers.includes(userId)) indeterminateUsers.push(userId);
  } else {
    indeterminateUsers = indeterminateUsers.filter((id) => id !== userId);
  }

  localStorage.indeterminateUsers = JSON.stringify(indeterminateUsers);
}

export function setHiddenUser(userId, hidden) {
  let hiddenUsers = localStorage.hiddenUsers ? JSON.parse(localStorage.hiddenUsers) : [];

  if (hidden) {
    if (!hiddenUsers.includes(userId)) hiddenUsers.push(userId);
  } else {
    hiddenUsers = hiddenUsers.filter((id) => id !== userId);
  }

  localStorage.hiddenUsers = JSON.stringify(hiddenUsers);
}
