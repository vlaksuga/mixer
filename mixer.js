
const BUTTON_EFFECT_DURATION = 100

const playButtons = []
const shortKey = ["q","w","e","r","a","s","d","f"]

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


// MODULE : PLAY BUTTON
class PlayButton {

    CLICK_COLOR = 'turquoise'
    DEFAULT_COLOR = 'gray'
    CONTI = true

    constructor(element, audioUrl, key) {
        this.element = element
        this.source = new Audio(audioUrl)
        this.key = key
        this.setListener()
        this.setPlayListener()
        this.setKey()
    }

    setListener() {
        this.source.addEventListener('play', this.setClickStyle.bind(this))
        return this
    }

    setClickStyle() {
        this.element.style.background = this.CLICK_COLOR
        setTimeout(this.setDefaulStyle.bind(this), BUTTON_EFFECT_DURATION)
        return this
    }

    setPlayListener() {
        this.element.addEventListener('click', this.play.bind(this))
        return this
    }

    play() {
        if(this.source.duration > 0 && !this.source.paused) {
            if(this.CONTI) {
                this.source.pause()
                this.source.currentTime = 0
                this.source.play()
            }
        } else {
            this.source.play()
        }    
    }

    setKey() {
        document.addEventListener('keydown', e => {
            if(e.key === this.key) {
                this.play()
            }
        })
    }

    setDefaulStyle() {
        this.element.style.background = this.DEFAULT_COLOR
        return this
    }

    getSource() {
        return this.source.src
    }

    setSource(src) {
        this.source = new Audio(src)
        this.setListener()
    }

    getElement() {
        return this.element
    }

    getAudio() {
        return this.source
    }
}

init()

// INIT
function init() {
    console.log('init')
    setAllPlayButtons()
}

// SET ALL PLAY BUTTONS
function setAllPlayButtons(){
    const insButtons = document.querySelectorAll('.player')
    insButtons.forEach((btn, idx) => {
        playButtons.push(new PlayButton(btn, AudioResource[idx], shortKey[idx]))
    })
}

// OPEN AUDIO FILE
const opens = document.querySelectorAll('.openFile')
opens.forEach( (btn, idx) => {
    btn.addEventListener('click', e => {
        const input = document.createElement('input')
        input.type = 'file'
        input.click()
        input.addEventListener('change', function(e){ readAudioResorceFile(e, idx) } , false)
    })
})

// LOAD FILE
function readAudioResorceFile(e, idx) {
    const file = e.target.files[0]
    console.log(idx)
    if(!file) { return }
    // TODO : FILE TYPE VALIDATION HERE

    const reader = new FileReader()
    reader.onload = e => {
        const url = URL.createObjectURL(file)
        AudioResource[idx] = url
        playButtons[idx].setSource(AudioResource[idx])
    }
    reader.readAsBinaryString(file)
}