import { Module } from './module'
import { moveInArray } from './util'

export class Course {
  private modules: Array<Module> = []
  public reference: string
  public description: string

  constructor (reference: string, description: string) {
    this.reference = reference
    this.description = description
  }

  get numberOfModules (): number {
    return this.modules.length
  }


  add (module: Module): void {
    if (!this.includesModuleWithSameName(module)) this.modules.push(module)
  }

  private includesModuleWithSameName (module: Module): boolean {
    return this.modules.find(mod => mod.name === module.name) !== undefined
  }

  includes (module: Module): boolean {
    return this.modules.includes(module)
  }

  move (module: Module, to: number): void {
    if (to > this.modules.length || to <= 0) {
      return
    }
    const from = this.position(module)
    moveInArray(this.modules, from - 1, to - 1)
  }

  position (module: Module): number {
    const moduleInCourse = this.modules.find(mod => mod.name === module.name)
    if (moduleInCourse === undefined) {
      return undefined
    }
    return this.modules.indexOf(moduleInCourse) + 1
  }
}

