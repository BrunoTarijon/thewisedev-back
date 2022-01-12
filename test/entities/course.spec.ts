import { Course, Module, Lecture } from '../../src/entities'

describe('Course', () => {
  it('should be able to add modules to courses', () => {
    const course = new Course('azure-devops',
      'Continuous Delivery and DevOps with Azure DevOps: Source Control with Git')
    const module = new Module('Fundamentals')
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    module.add(lecture)
    course.add(module)
    expect(course.includes(module)).toBeTruthy()
  })
})
