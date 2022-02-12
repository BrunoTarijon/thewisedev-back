export class UnexistingElementError extends Error {
  constructor () {
    super('Element does not exists.')
  }
}
