export class ExistingModuleError extends Error {
    constructor(){
        super('Module already exists in course.')
    }
}