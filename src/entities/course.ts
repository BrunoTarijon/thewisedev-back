import { Module } from './module'

export class Course {
  private modules: Array<Module> = []
  public reference: string
  public description: string

  constructor (reference: string, description: string) {
    this.reference = reference
    this.description = description
  }

  add (module: Module): void {
    this.modules.push(module)
  }

  includes (module: Module): boolean {
    return this.modules.includes(module)
  }
}
