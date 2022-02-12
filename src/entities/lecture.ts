import { Container } from './container'
import { Material } from './material'
import { Element } from './element'
import { ExistingElementError } from './errors/existing-element-error'
import { Either } from '../shared/either'
import { UnexistingElementError } from './errors/unexisting-element-error'
import { InvalidPositionError } from './errors/invalid-position-error'

export class Lecture implements Element {
  private readonly materials: Container<Material> = new Container<Material>()
  readonly description: string
  readonly videoUrl: string

  constructor (description: string, videoUrl: string) {
    this.description = description
    this.videoUrl = videoUrl
  }

  add (material: Material): Either<ExistingElementError, void> {
    return this.materials.add(material)
  }

  includes (material: Material): boolean {
    return this.materials.includes(material)
  }

  remove (material: Material): Either<UnexistingElementError, void> {
    return this.materials.remove(material)
  }

  move (material: Material, to: number): Either<UnexistingElementError | InvalidPositionError, void> {
    return this.materials.move(material, to)
  }

  position (material: Material): Either<UnexistingElementError, number> {
    return this.materials.position(material)
  }

  equals (other: Lecture): boolean {
    return this.description === other.description
  }
}
