// Set initial count
let count = 0

// Select value and buttons
const value = document.querySelector('#value')
const btns = document.querySelectorAll('.btn')

btns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const styles = event.currentTarget.classList
    if(styles.contains('decrease')) {
      count--
    }
    else if(styles.contains('increase')) {
      count++
    }
    else {
      count = 0
    }
    count > 0 
      ? value.style.color = "green" 
      : count < 0 
        ? value.style.color = "red"
        : value.style.color = "hsl(209, 61%, 16%)"
    
    value.textContent = count
  })
})