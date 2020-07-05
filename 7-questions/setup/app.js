// using selectors inside the element
const questions = document.querySelectorAll('.question')

questions.forEach((q) => {
  // console.log(q)
  const btn = q.querySelector('.question-btn')
  // console.log(btn)
  btn.addEventListener('click', () => {
    questions.forEach((i) => {
      if (i !== q) {
        i.classList.remove('show-text')
      }
    })

    q.classList.toggle('show-text')
  })
})

// traversing the dom
// const btns = document.querySelectorAll('.question-btn')

// btns.forEach((btn) => {
//   btn.addEventListener('click', (e) => {
//     console.log(e.currentTarget.parentElement.parentElement)
//     const question = e.currentTarget.parentElement.parentElement
//     question.classList.toggle('show-text')
//   })
// })