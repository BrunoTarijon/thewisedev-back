import { Link } from '../../src/entities/link'
import { Lecture } from '../../src/entities/lecture'
import { Material } from '../../src/entities/material'
import { Pdf } from '../../src/entities/pdf'
import { ExistingElementError } from '../../src/entities/errors/existing-element-error'

describe ('Lecture', () => {
    it('should be able to add further material to lecture', () => {
        const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
        const branchingPdf: Material = new Pdf('Branching', 'htttps://storage/branching.pdf')
        lecture.add(branchingPdf)
        const error = lecture.add(branchingPdf).value
        expect(lecture.includes(branchingPdf)).toBeTruthy()
        expect(error).toBeInstanceOf(ExistingElementError)
    })

    it('should not be able to add existing material to lecture', () => {
        const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
        const branchingPdf: Material = new Pdf('Branching', 'htttps://storage/branching.pdf')
        lecture.add(branchingPdf)
         
        expect(lecture.includes(branchingPdf)).toBeTruthy()
    })

    it('should be able to remove further material from lecture', () => {
        const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
        const branchingPdf: Material = new Pdf('Branching', 'htttps://storage/branching.pdf')

        lecture.add(branchingPdf)
        lecture.remove(branchingPdf)
        expect(lecture.includes(branchingPdf)).toBeFalsy()
    })

    it('should be able to add further link to lecture', () => {
        const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
        const branchingLink: Material = new Link('Branching', 'htttps://storage/branching.html')

        lecture.add(branchingLink)
        expect(lecture.includes(branchingLink)).toBeTruthy()
    })
})