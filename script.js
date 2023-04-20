const lettersDiv = document.getElementById('lettersDiv')
const wordDiv = document.getElementById('word')
const wrongDiv = document.getElementById('wrongDiv')
const popUp = document.getElementById("popUp")
const message= document.getElementById('alert')
const main = document.querySelector('main')

const alpha = "abcdefghijklmnopqrstuvwxyz".split('')

const wordBank = [
    "this is a test of a much longer statement",
    "this is a test",
    "how are you",
    "hello world",
    "tornado"
]

const state = {
    answer: [],
    current: [],
    attempts: 0
}

const checkGuess = (e) => {
    let { value, style } = e.target
    let { answer, current} = state

    if (answer.includes(value)) {
        handleCurrent(current, value)
        updateDisplay(value)
    } else {
        handleAttempts()
    }

    style.opacity = .5
    style.pointerEvents = "none"
    removeEvent(e.target, checkGuess)
    // console.log(state.attempts)
}

const handleCurrent = (current, value) => {
    let updated = current.map(e => {
        if (e.letter === value) {
            e.status = true
        }
        return e
    })
    checkWin(updated)
}

const handleAttempts = () => {
    let { attempts } = state
    state.attempts = attempts + 1
    // console.log(state.attempts)

    const wrong = document.createElement('div')
    wrong.classList = "wrong"
    wrong.innerText = "❌";
    wrongDiv.append(wrong)

    if (state.attempts === 6) {
        setTimeout(() => {
            roundOver(`You Lost\nThe answer is:  "${state.answer}"`)
        }, 350)
    }
}

const checkWin = (updated) => {
    let check = updated.every(e => e.status)
    // console.log(check)
    if (check) {
        setTimeout(() => {
            roundOver("You Win")
        }, 350)
    }
}

const setState = () => {
    let index = Math.floor(Math.random() * wordBank.length)
    let answer = wordBank[index]

    const current = answer.split('').map(e => {
        return { letter: e, status: e === " " ? true : false }
    })

    state.answer = answer,
    state.current = current,
    state.attempts = 0
    console.log(state)
}

const updateDisplay = (value) => {
    const answers = [...document.getElementsByClassName('answers')]
    answers.forEach(element => {
        if (element.value == value) {
            element.innerText = value
        }
    })
}

const removeEvent = (el, func) => {
    el.removeEventListener('click', func, true)
}

const roundOver = (str) => {
    message.innerText = str
    popUp.style.display = "flex"
    main.style.opacity = .35
    main.style.pointerEvents = "none"
    popUp.addEventListener('click', playAgain, true)
}

const playAgain = () => {
    popUp.style.display = "none"
    main.style.opacity = 1
    main.style.pointerEvents = "all"
    removeEvent(popUp, playAgain)
    renderGame()
}

const renderGame = () => {
  
    wordDiv.innerHTML = ""
    lettersDiv.innerHTML = ""
    wrongDiv.innerHTML = ""
    message.innerText = ""
    setState()
    // console.log(state.answer)
    let answerArr = state.answer.split(" ")
    answerArr.forEach(word => {
        const lettersBox = document.createElement('section')
        let lettersArr = word.split('')
        // console.log(lettersArr)
        lettersArr.forEach(letter=>{
            // console.log(letter)
            const div = document.createElement('p')
            div.value=letter
            div.setAttribute('class', 'answers') 
            lettersBox.append(div)
        })
        wordDiv.append(lettersBox)
    })

    alpha.forEach(element => {
        const span = document.createElement('span')
        span.classList.add('letter')
        span.innerText = element
        span.value = element

        span.addEventListener('click', checkGuess, true)

        lettersDiv.append(span)
    });
}

renderGame()




