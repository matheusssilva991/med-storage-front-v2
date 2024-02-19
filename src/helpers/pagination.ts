export function nextPage(page: number, arrayLenght: number): number {
  return arrayLenght > 0 ? page + 1 : page;
}

export function prevPage(page: number): number {
  return page > 1 ? page - 1 : page;
}