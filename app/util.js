const
  animations = [
    'zoomIn', 'flipInY',
    'fadeIn', 'bounceIn',
    'flipInX', 'lightSpeedIn'
  ]
const narrations = {
  wrong: 'Oh no! You got this one wrong',
  right: "That's Right!"
}

export function contains (array, element) {
  return (array.indexOf(element) >= 0)
}

export function randomId () {
  return parseInt(Math.random() * 1000000)
}

export function debounce (func, wait, immediate) {
  var timeout
  return function () {
    var context = this; var args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
};

export { animations, narrations }
