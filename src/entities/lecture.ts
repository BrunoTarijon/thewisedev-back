export class Lecture {
  readonly description: string
  readonly videoUrl: string

  constructor (description: string, videoUrl: string) {
    this.description = description
    this.videoUrl = videoUrl
  }

  equals (other: Lecture): boolean {
    return this.description === other.description &&
      this.videoUrl === other.videoUrl
  }
}
