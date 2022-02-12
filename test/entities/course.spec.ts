import { Course, Module, Lecture } from '../../src/entities'
import { ExistingElementError } from '../../src/entities/errors/existing-element-error'
import { UnexistingElementError } from '../../src/entities/errors/unexisting-element-error'

function createCourse () {
  const course = new Course(
    'azure-devops',
    'Continuous Delivery and DevOps with Azure DevOps: Source Control with Git'
  )
  return course
}

function createModule () {
  const module = new Module(
    'Fundamentals'
  )
  return module
}

function createLecture () {
  const lecture: Lecture = new Lecture(
    'Branching', 'https://youtube.com/1234'
  )
  return lecture
}

describe('course', () => {
  describe('adding modules', () => {
    let course: Course
    let module1: Module
    let module2: Module
    let lecture: Lecture

    beforeEach(() => {
      course = createCourse()
      module1 = createModule()
      module2 = createModule()
      lecture = createLecture()
    })

    it('should be able to add modules to courses', () => {
      module1.add(lecture)
      course.add(module1)
      expect(course.includes(module1)).toBeTruthy()
    })

    it('should not be able to add modules with same name', () => {
      module1.add(lecture)
      const ok = course.add(module1).value as void
      const error = course.add(module2).value as ExistingElementError
      expect(ok).toEqual(undefined)
      expect(course.includes(module1)).toBeTruthy()
      expect(course.numberOfModules).toEqual(1)
      expect(error.message).toEqual('Element already exists.')
    })
  })

  describe('rearrange modules', () => {
    let course: Course
    let fundamentalsModule: Module
    let branchingLecture: Lecture
    let courseOverviewModule: Module
    let courseOverviewLecture: Lecture
    let gitModule: Module
    let introductionLecture: Lecture

    beforeEach(() => {
      course = createCourse()

      fundamentalsModule = new Module('Fundamentals')
      branchingLecture = new Lecture('Branching', 'https://youtube.com/1234')
      fundamentalsModule.add(branchingLecture)

      courseOverviewModule = new Module('Course Overview')
      courseOverviewLecture = new Lecture('Course Overview', 'https://youtube.com/1934')
      courseOverviewModule.add(courseOverviewLecture)

      gitModule = new Module('Source Control with git on Azure DevOps')
      introductionLecture = new Lecture('Introduction', 'https://youtube.com/1123')
      gitModule.add(introductionLecture)

      course.add(fundamentalsModule)
      course.add(courseOverviewModule)
      course.add(gitModule)
    })

    it('should be able to rearrange the order of modules', () => {
      course.move(courseOverviewModule, 1)
      expect(course.position(courseOverviewModule)).toBe(1)
      expect(course.position(fundamentalsModule)).toBe(2)
      expect(course.position(gitModule)).toBe(3)
    })

    it('should handle exceeding position while rearranging', () => {
      course.move(fundamentalsModule, 10)
      expect(course.position(fundamentalsModule)).toBe(1)
      expect(course.position(courseOverviewModule)).toBe(2)
      expect(course.position(gitModule)).toBe(3)
    })

    it('should handle negative position while rearranging', () => {
      course.move(fundamentalsModule, -1)
      expect(course.position(fundamentalsModule)).toBe(1)
      expect(course.position(courseOverviewModule)).toBe(2)
      expect(course.position(gitModule)).toBe(3)
    })
  })

  describe('move lecture between modules', () => {
    let course: Course
    let fundamentalsModule: Module
    let branchingLecture: Lecture
    let gitModule: Module
    let introductionLecture: Lecture

    beforeEach(() => {
      course = createCourse()

      fundamentalsModule = new Module('Fundamentals')
      branchingLecture = new Lecture('Branching', 'https://youtube.com/1234')
      fundamentalsModule.add(branchingLecture)

      gitModule = new Module('Source Control with git on Azure DevOps')
      introductionLecture = new Lecture('Introduction', 'https://youtube.com/1123')
      gitModule.add(introductionLecture)

      course.add(fundamentalsModule)
      course.add(gitModule)
    })
    it('should be able to move a lecture to a different module', () => {
      course.moveLecture(branchingLecture, fundamentalsModule, gitModule, 1)
      expect(fundamentalsModule.numberOfLectures).toEqual(0)
      expect(gitModule.numberOfLectures).toEqual(2)
      expect(gitModule.position(branchingLecture)).toEqual(1)
    })
  })

  describe('remove module', () => {
    let course: Course
    let module: Module
    let lecture: Lecture

    beforeEach(() => {
      course = createCourse()
      module = createModule()
      lecture = createLecture()
      module.add(lecture)
      course.add(module)
    })

    it('should be able to remove module', () => {
      const ok = course.remove(module).value as void
      expect(course.numberOfModules).toEqual(0)
      expect(ok).toBeUndefined()
    })

    it('should not be able to remove unexisting module', () => {
      course.remove(module)
      const error = course.remove(module).value as Error
      expect(error).toBeInstanceOf(UnexistingElementError)
    })
  })
})
