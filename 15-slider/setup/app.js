const slides = document.querySelectorAll('.slide')
const nextBtn = document.querySelector('.next-btn')
const prevBtn = document.querySelector('.prev-btn')

slides.forEach((s, i) => {
  s.style.left = `${ i * 100 }%`
})

let counter = 0
nextBtn.addEventListener('click', () => {
  counter++
  carousel()
})
prevBtn.addEventListener('click', () => {
  counter--
  carousel()
})

const carousel = () => {
  // working with slides
  // counter === slides.length
  //   ? counter = 0
  //   : counter < 0
  //     ? counter = slides.length - 1
  //     : counter

  // working with buttons
  if (counter < slides.length - 1) {
    nextBtn.style.display = 'block'
  } else {
    nextBtn.style.display = 'none'
  }

  if (counter > 0) {
    prevBtn.style.display = 'block'
  } else {
    prevBtn.style.display = 'none'
  }

  slides.forEach((s) => {
    s.style.transform = `translateX(-${ counter * 100 }%)`
  })
}

prevBtn.style.display = 'none'