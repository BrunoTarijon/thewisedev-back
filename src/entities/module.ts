import { Lecture } from './lecture'
import { moveInArray } from './util'

export class Module {
  private readonly lectures: Array<Lecture> = []
  public readonly name: string
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
    moveInArray(this.lectures, from - 1, to - 1)
  }

  position (lecture: Lecture): number {
    const lectureInModule = this.lectures.find(lec => lec.equals(lecture))
    if (lectureInModule === undefined) {
      return undefined
    }
    return this.lectures.indexOf(lectureInModule) + 1
  }
}