import { Container } from './container'
import { Lecture } from './lecture'
import { Part } from './part'

export class Module implements Part {
  private readonly lectures: Container<Lecture> = new Container<Lecture>()
  public readonly name: string
  constructor (name: string) {
    this.name = name
  }

  get numberOfLectures (): number {
    return this.lectures.numberOfParts
  }

  add (lecture: Lecture): void {
    this.lectures.add(lecture)
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
