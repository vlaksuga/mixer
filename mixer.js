const CLICK_COLOR = 'lightcoral'
const DEFAULT_COLOR = 'gray'
const BUTTON_EFFECT_DURATION = 50

let AudioResource = [
    // initial
    'assets/realdrums/Kick/RD_K_1.wav',
    'assets/realdrums/Kick/RD_K_2.wav',
    'assets/realdrums/Cymbals/Hi Hat/RD_C_HH_1.wav',
    'assets/realdrums/Cymbals/Crash/RD_C_C_8.wav',
    'assets/realdrums/Kick/RD_K_1.wav',
    'assets/realdrums/Kick/RD_K_6.wav',
    'assets/realdrums/Kick/RD_K_7.wav',
    'assets/realdrums/Kick/RD_K_8.wav'
]

// PLAY INSTRUMENT
const insButtons = document.querySelectorAll('.player')
insButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const source = new Audio(AudioResource[idx])
        setInstButtonView(btn, source)
        const idxColor = document.querySelectorAll('.loop')[idx].style.backgroundColor
        if(idxColor == CLICK_COLOR) {
            source.loop = true
        } else {
            source.loop = false
        }
        source.play()
    })
})

// SET INSTRUMENT BUTTON VIEW
function setInstButtonView(btn, source) {
    source.addEventListener('play', () => {
        const style = btn.style
        style.background = CLICK_COLOR

    setTimeout(() => {
        style.background = DEFAULT_COLOR
    }, BUTTON_EFFECT_DURATION)
    })
}


// LOOP CONTROLLER
const loopButtons = document.querySelectorAll('.loop')
loopButtons.forEach(btn => {
    btn.addEventListener('click', e => {
        console.log(e.target.style.backgroundColor)
        if(e.target.style.backgroundColor == ""){
            e.target.style.backgroundColor = DEFAULT_COLOR
        }
        if(e.target.style.backgroundColor == DEFAULT_COLOR) {
            e.target.style.backgroundColor = CLICK_COLOR
        } else {
            e.target.style.backgroundColor = DEFAULT_COLOR
        }
    })
})