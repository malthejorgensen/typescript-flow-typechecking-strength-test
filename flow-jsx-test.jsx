// @flow

import * as React from 'react'
import type { Answer, Question, ReportGrade, Section } from 'models'

/*

   I believe the problem here is type checking the returned object from
   a `reduce`-call.
   
   flow's typing of `reduce` can be found here:
   https://github.com/facebook/flow/blob/fa77d91c52ecc68d17ff0c82c94613abbb10499b/lib/core.js#L239
   
*/


const ReactToFeedbackQuestion = ({ idx, numQuestions, question, answer, name }: {
  idx: number,
  numQuestions: number,
  question: Question,
  answer: Answer,
  name: string
}) => {
  const props = {
    type: question.type,
    question,
    answer,
    name,
    numQuestions,
    idx
  }
  return (
    <div>
      {answer.question.id}
    </div>
  )
}

const FeedbackSection = ({ section, answers }: { section: Section, answers: { [id: string]: Answer } }) => {
  const questions = section.questions.map((question, idx) => {
    return (<ReactToFeedbackQuestion
      key={idx}
      question={question}
      idx={idx}
      numQuestions={section.questions.length}
      name={question.id}
      answer={answers[question.id]}
    />)
  })
  return (
    <div>
      <h2 className="pl3 fs-m color grey db">{section.title}</h2>
      <div>
        {questions}
      </div>
    </div>
  )
}

const Feedback = ({ reportGrade }: { reportGrade: ReportGrade }) => {
  let answers = {}
  reportGrade.answers.map((a) => { answers[a.question.id] = a; return a })

  // const reducerFunc = (
  //   acc: Object,
  //   {
  //     question: { id },
  //     answer
  //   }: {
  //     question: { id: string },
  //     answer: string | number | boolean
  //   }) => {
  //   acc[id] = {
  //     hoblgobl: id,
  //     answer
  //   }
  //   return acc
  // }
  // const answers = reportGrade.answers.reduce(reducerFunc, {})
  // const answers = {
  //   hoblgobl: { answer: 'Hello', question: {id: 'argh'} }
  // }

  const feedbackSections = reportGrade.sections.map((section) => {
    return (<FeedbackSection
      key={section.id}
      section={section}
      answers={answers}
    />)
  })
  return <div>{feedbackSections}</div>
}
