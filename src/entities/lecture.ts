import { Material } from "./material"

export class Lecture {
  readonly description: string
  readonly videoUrl: string
  private readonly materials: Array<Material> = []

  constructor (description: string, videoUrl: string) {
    this.description = description
    this.videoUrl = videoUrl
  }

  equals (other: Lecture): boolean {
    return this.description === other.description &&
      this.videoUrl === other.videoUrl
  }

  add(material: Material): void {
    this.materials.push(material)
  }

  includes (material: Material): boolean {
      return this.materials.includes(material)
  }

  remove (material: Material): void {
    const position = this.materials.indexOf(material)
    if(position != -1) this.materials.splice(position, 1)
  }
}
