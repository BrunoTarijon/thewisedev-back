export class ExistingElementError extends Error {
    constructor (){
        super('Element already exists.')
    }
}
