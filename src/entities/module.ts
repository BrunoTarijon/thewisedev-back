import { Container } from './container'
import { Lecture } from './lecture'
import { Element } from './element'
import { ExistingElementError } from './errors/existing-element-error'
import { Either } from '../shared/either'

export class Module implements Element {
  private readonly lectures: Container<Lecture> = new Container<Lecture>()
  public readonly name: string
  constructor (name: string) {
    this.name = name
  }

  get numberOfLectures (): number {
    return this.lectures.numberOfElements
  }

  add (lecture: Lecture): Either<ExistingElementError, void> {
    return this.lectures.add(lecture)
  }

  includes (lecture: Lecture): boolean {
    return this.lectures.includes(lecture)
  }

  move (lecture: Lecture, position: number): void {
    this.lectures.move(lecture, position)
  }

  position (lecture: Lecture): number {
    return this.lectures.position(lecture)
  }

  remove (lecture: Lecture): void {
    this.lectures.remove(lecture)
  }

  equals (module: Module): boolean {
    return this.name === module.name
  }
}
