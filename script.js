let canvas;
let ctx;
let rawImage;
let pos = {x:0, y:0}
let erases = false


function news() {
    ctx.fillStyle='black'
    ctx.fillRect(0,0,280,280)
    erases = false
    document.getElementById('erase-button').value = "Off"
}

function save() {
    console.log('Saving...')

    raw = tf.browser.fromPixels(rawImage,1)
    resize = tf.image.resizeBilinear(raw, [20,20]);
    tensor = resize.expandDims(0);
    tensor.print();

}

function getPosition(e) {
    pos.x = e.clientX - canvas.getBoundingClientRect().left;
    pos.y = e.clientY - canvas.getBoundingClientRect().top;
}

function draw(e) {
    if (e.buttons != 1 || erases == true) return;
    console.log('Drawing')
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
    ctx.strokeStyle = 'white'
    ctx.moveTo(pos.x, pos.y)
    getPosition(e);
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke();

    rawImage.src =canvas.toDataURL('image/png')
}

function fired() {
    erases = true
    if (document.getElementById('erase-button').value == "Off") {
        erases = false
        
        canvas.addEventListener('mousemove', draw)
    }
    else  canvas.addEventListener('mousemove', erase)
    
}

function erase(e) {
    if (e.buttons != 1 || erases == false ) return;
    console.log('Erasing')
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
    ctx.strokeStyle = 'black'
    ctx.moveTo(pos.x, pos.y)
    getPosition(e)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()

    rawImage.src =canvas.toDataURL('image/png')

}

function init() {
    const newButton = document.getElementById('new-button')
    const saveButton = document.getElementById('save-button')
    const eraseButton = document.getElementById('erase-button')

    newButton.addEventListener('click', news)
    saveButton.addEventListener('click', save)
    eraseButton.addEventListener('click', fired)

    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,280,280)

    canvas.addEventListener('mousedown', getPosition)
    canvas.addEventListener('mousemove', draw)

    rawImage = document.getElementById('canvas-image');

}

document.addEventListener('DOMContentLoaded', init)