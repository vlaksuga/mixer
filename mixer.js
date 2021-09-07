const playButtons = {}

// MODULE : PLAY BUTTON
class PlayButton {

    BUTTON_EFFECT_DURATION = 100
    CLICK_COLOR = 'turquoise'
    DEFAULT_COLOR = 'gray'
    CONTI = true

    constructor(id, element, audioUrl, key) {
        this.id = id
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
        setTimeout(this.setDefaulStyle.bind(this), this.BUTTON_EFFECT_DURATION)
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
        this.element.children[0].innerText = this.key
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
    insButtons.forEach( player => {
        playButtons[player.id] = new PlayButton(player.id, player, player.dataset.audio, player.dataset.keyname)
    })
    console.log(playButtons)
}

// OPEN AUDIO FILE
const opens = document.querySelectorAll('.openFile')
opens.forEach((btn, idx) => {
    btn.addEventListener('click', e => {
        const player = e.target.parentNode.children[0]
        const input = document.createElement('input')
        input.type = 'file'
        input.click()
        input.addEventListener('change', function(e) { readAudioResorceFile(e, player) }, false)
    })
})

// LOAD FILE
function readAudioResorceFile(e, player) {
    const file = e.target.files[0]
    if(!file) { return }
    
    const reader = new FileReader()
    reader.onload = () => {
        const url = URL.createObjectURL(file)
        player.dataset.audio = url
        playButtons[player.id].setSource(url)
    }
    reader.readAsBinaryString(file)
}

// ASSET DRAG AND MOVE
const draggables = document.querySelectorAll('.draggable')
let isMouseDown = false
let startPosition = {}
draggables.forEach( item => {
    item.addEventListener('mousedown', e => {
        isMouseDown = true
        startPosition = { x: e.clientX - parseInt(item.style.left, 10) , y: e.clientY - parseInt(item.style.top) }
        console.log(startPosition)
        console.log(item.style) 
    })

    document.addEventListener('mouseup', e => {
        isMouseDown = false
    })

    item.addEventListener('mousemove', e => {
        if(!isMouseDown) {
            return
        }
        const size = { w: parseInt(item.style.width, 10) , h: parseInt(item.style.height, 10) }
        const vx = e.clientX - startPosition.x
        const vy = e.clientY - startPosition.y
        item.style.top = `${vy}px`
        item.style.left = `${vx}px`
    })
})