// FUNÇÃO CRIADA PARA SELECIONAR TODOS OS FILHOS DO ALVO
export function getAllTargetInputs(target) {
  return [...target.parentElement.parentElement.parentElement.querySelectorAll('input')]
    .filter(({ id }) => id !== target.id);
}

// FUNÇÃO CRIADA PARA SELECIONAR TODOS OS PAIS DO ALVO
export function getAllParents(target) {
  const parents = [];
  let parent = target.parentElement.parentElement.parentElement;

  while (!parent.parentElement.className.includes('application')) {
    parent = parent.parentElement;
    parents.push(parent.firstChild.lastChild.firstChild);
  }

  return parents;
}
