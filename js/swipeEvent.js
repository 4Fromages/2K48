let xDown = null
let yDown = null

document.addEventListener("touchstart", handleTouchStart, false)
document.addEventListener("touchmove", handleTouchMove, false)

document.addEventListener("mousedown", handleMouseDown, false)
document.addEventListener("mouseup", handleMouseUp, false)

function getTouches(e) {
    return e.touches || e.originalEvent.touches
}

function handleTouchStart(e) {
    const firstTouch = getTouches(e)[0]
    xDown = firstTouch.clientX
    yDown = firstTouch.clientY
}

function handleTouchMove(e) {
    if (!xDown || !yDown) return
    let xUp = getTouches(e)[0].clientX
    let yUp = getTouches(e)[0].clientY
    emitSwipeEvent(xUp, yUp)
}

function handleMouseDown(e) {
    xDown = e.clientX
    yDown = e.clientY
}

function handleMouseUp(e) {
    if (!xDown || !yDown) return
    let xUp = e.clientX
    let yUp = e.clientY
    if (xDown == xUp && yUp == yDown) return
    emitSwipeEvent(xUp, yUp)
}

function emitSwipeEvent(xUp, yUp) {
    let xDiff = xDown - xUp
    let yDiff = yDown - yUp
    let eventName = null

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            eventName = "swipeleft"
        } else {
            eventName = "swiperight"
        }
    } else {
        if (yDiff > 0) {
            eventName = "swipeup"
        } else {
            eventName = "swipedown"
        }
    }
    document.dispatchEvent(new Event(eventName))
    xDown = null
    yDown = null
}
