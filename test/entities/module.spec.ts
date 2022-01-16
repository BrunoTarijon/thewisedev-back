import { Lecture, Module } from '../../src/entities'

describe('Module', () => {
  it('should be able to add lectures to modules', () => {
    const module = new Module('Fundamentals')
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    module.add(lecture)
    expect(module.includes(lecture)).toBeTruthy()
  })

  it('should not be able to add the same lecture twice in a module', () => {
    const module = new Module('Fundamentals')
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    const sameLecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    module.add(lecture)
    module.add(sameLecture)
    expect(module.includes(lecture)).toBeTruthy()
    expect(module.numberOfLectures).toBe(1)
  })

  it('should not be able to have two lectures with same name in a module', () => {
    const module = new Module('Fundamentals')
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    const otherLecture: Lecture = new Lecture('Branching', 'https://youtube.com/3456')
    module.add(lecture)
    module.add(otherLecture)
    expect(module.includes(lecture)).toBeTruthy()
    expect(module.includes(otherLecture)).toBeFalsy()
  })

  it('should be able to rearrange the order of lectures', () => {
    const module = new Module('Fundamentals')
    const branching: Lecture = new Lecture('Branching', 'https://youtube.com/branching')
    const commiting: Lecture = new Lecture('Commiting', 'https://youtube.com/commiting')
    const pushing: Lecture = new Lecture('Pushing', 'https://youtube.com/pushing')

    module.add(branching)
    module.add(commiting)
    module.add(pushing)

    module.move(branching, 3)

    expect(module.position(commiting)).toBe(1)
    expect(module.position(pushing)).toBe(2)
    expect(module.position(branching)).toBe(3)
  })

  it('should handle unexisting lecture', () => {
    const module = new Module('Fundamentals')
    const branching: Lecture = new Lecture('Branching', 'https://youtube.com/branching')

    expect(module.position(branching)).toBeUndefined()
  })

  it('should handle exceeding position while rearranging', () => {
    const module = new Module('Fundamentals')
    const branching: Lecture = new Lecture('Branching', 'https://youtube.com/branching')
    const commiting: Lecture = new Lecture('Commiting', 'https://youtube.com/commiting')
    const pushing: Lecture = new Lecture('Pushing', 'https://youtube.com/pushing')

    module.add(branching)
    module.add(commiting)
    module.add(pushing)

    module.move(branching, 10)

    expect(module.position(branching)).toBe(1)
    expect(module.position(commiting)).toBe(2)
    expect(module.position(pushing)).toBe(3)
  })

  it('should handle negative position while rearranging', () => {
    const module = new Module('Fundamentals')
    const branching: Lecture = new Lecture('Branching', 'https://youtube.com/branching')
    const commiting: Lecture = new Lecture('Commiting', 'https://youtube.com/commiting')
    const pushing: Lecture = new Lecture('Pushing', 'https://youtube.com/pushing')

    module.add(branching)
    module.add(commiting)
    module.add(pushing)

    module.move(branching, 0)

    expect(module.position(branching)).toBe(1)
    expect(module.position(commiting)).toBe(2)
    expect(module.position(pushing)).toBe(3)
  })

  it('should be able to remove a lecture', () =>{
    const module = new Module('Fundamentals')
    const branching: Lecture = new Lecture('Branching', 'https://youtube.com/branching')
    module.add(branching)
    module.remove(branching)

    expect(module.numberOfLectures).toEqual(0)
  })

  it('should be able to handle trying to remove an unexisting lecture', () =>{
    const module = new Module('Fundamentals')
    const branching: Lecture = new Lecture('Branching', 'https://youtube.com/branching')
    const commiting: Lecture = new Lecture('Commiting', 'https://youtube.com/commiting')
    module.add(commiting)
    module.remove(branching)

    expect(module.numberOfLectures).toEqual(1)
  })
})
