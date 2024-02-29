let xDown = null
let yDown = null

document.addEventListener("touchstart", handleTouchStart, false)
document.addEventListener("touchmove", handleTouchMove, false)

function getTouches(e) {
    return e.touches || e.originalEvent.touches
}

function handleTouchStart(e) {
    const firstTouch = getTouches(e)[0]
    xDown = firstTouch.clientX
    yDown = firstTouch.clientY
}

function handleTouchMove(e) {
    if (!xDown || !yDown) {
        return
    }

    let xUp = e.touches[0].clientX
    let yUp = e.touches[0].clientY

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
