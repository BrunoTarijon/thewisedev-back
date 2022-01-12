import { Lecture } from './lecture'

export class Module {
  private readonly lectures: Array<Lecture> = []
  private name: string
  constructor (name: string) {
    this.name = name
  }

  get numberOfLectures (): number {
    return this.lectures.length
  }

  add (lecture: Lecture): void {
    if (!this.includesLectureWithSameDescription(lecture)) {
      this.lectures.push(lecture)
    }
  }

  private includesLectureWithSameDescription (lecture: Lecture): boolean {
    return this.lectures.find(lec => lec.description === lecture.description) !== undefined
  }

  includes (lecture: Lecture): boolean {
    return this.lectures.find(lec => lec.equals(lecture)) !== undefined
  }

  move (lecture: Lecture, to: number): void {
    if (to > this.lectures.length || to <= 0) {
      return
    }
    const from = this.position(lecture)
    this.moveInArray(this.lectures, from - 1, to - 1)
  }

  private moveInArray<T> (array: Array<T>, from: number, to: number): void {
    const element = array.splice(from, 1)[0]
    array.splice(to, 0, element)
  }

  position (lecture: Lecture): number {
    const lectureInModule = this.lectures.find(lec => lec.equals(lecture))
    if (lectureInModule === undefined) {
      return undefined
    }
    return this.lectures.indexOf(lectureInModule) + 1
  }
}
