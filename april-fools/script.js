"use strict"

let viewer = document.getElementById("number-viewer")

let mode1 = document.getElementById("mode1")
let min = document.getElementById("min")
let max = document.getElementById("max")
let excpt = document.getElementById("excpt")
let roll1 = document.getElementById("roll1")

let mode2 = document.getElementById("mode2")
let select = document.getElementById("select")
let roll2 = document.getElementById("roll2")

let mode = document.getElementById("mode")

let banner = document.getElementById("banner")

excpt.onkeydown = select.onkeydown = function(ev) {
    if(!(ev.altKey || ev.ctrlKey || ev.metaKey) && !ev.code.match(/^(Digit\d|Numpad\d|Space|Backspace|Arrow.*|Delete)$/)) {
        ev.preventDefault()
    }
}

roll1.onclick = function() {
    const minValue = Math.min(min.value, max.value)
    const maxValue = Math.max(max.value, min.value)
    const excptValues = excpt.value.split(" ").filter(value => value.match(/^\d+$/)).map(number => parseInt(number)).sort()
    if(maxValue - minValue + 1 <= excptValues.length) {
        alert("No numbers available")
        return
    }
    mode1.childNodes.forEach(node => node.disabled = true)
    let arr = "abcdefghijklmnopqrstuvwxyz"
    viewer.style.width = "500px"
    let interval = setInterval(() => {
        let result = arr.split("").shuffle()
        result[0] = result[0].toUpperCase()
        viewer.innerHTML = result.join("").substr(0, 10)
    }, 50)
    setTimeout(() => {
        clearInterval(interval)
        mode1.childNodes.forEach(node => node.disabled = false)
        let result = parseInt(Math.random() * (maxValue - minValue + 1) + minValue)
        while(excptValues.includes(result)) {
            result = parseInt(Math.random() * (maxValue - minValue + 1) + minValue)
        }
        let str = result.toChineseString().split("")
        str[0] = str[0].toUpperCase()
        viewer.style.width = "fit-content"
        viewer.innerHTML = str.join("")
        excpt.value = result.toString().concat(" ").concat(excpt.value.concat(" ")).trim()
    }, 1500)
}

roll2.onclick = function() {
    const selectValue = select.value.split(" ").filter(value => value.match(/^\d+$/)).map(number => parseInt(number)).sort((a, b) => a - b)
    if(selectValue.length == 0) {
        alert("No numbers available")
        return
    }
    console.log(selectValue)
    mode2.childNodes.forEach(node => node.disabled = true)
    let arr = "abcdefghijklmnopqrstuvwxyz"
    let interval = setInterval(() => {
        let result = arr.split("").shuffle()
        result[0] = result[0].toUpperCase()
        viewer.innerHTML = result.join("").substr(0, 10)
    }, 50)
    setTimeout(() => {
        clearInterval(interval)
        mode2.childNodes.forEach(node => node.disabled = false)
        const result = selectValue[Math.floor(Math.random()*selectValue.length)]
        let str = result.toChineseString().split("")
        str[0] = str[0].toUpperCase()
        viewer.innerHTML = str.join("")
        select.value = select.value.replace(new RegExp(result+"\\s*"), "")
    }, 2500)
}

let modeValue = false
mode.onclick = function(ev) {
    modeValue = !modeValue
    if(modeValue) {
        mode1.style.display = "none"
        mode2.style.display = "block"
    }
    else {
        mode1.style.display = "block"
        mode2.style.display = "none"
    }
}

let banners = [
    "<a href=\"https://www.dimigo.hs.kr/\" target=\"_blank\"><img src=\"../banners/banner1.png\"></img></a>",
    "<a href=\"https://www.facebook.com/Cracker-in-dimigo-783226285143210/\" target=\"_blank\"><img src=\"../banners/banner2.png\"></img></a>",
    "<a href=\"https://www.facebook.com/deltaindimigo/\" target=\"_blank\"><img src=\"../banners/banner3.png\"></img></a>",
    "<a href=\"https://www.facebook.com/%E6%B7%B8%E6%98%8E-%EC%B2%AD%EB%AA%85-103118078006315/\" target=\"_blank\"><img src=\"../banners/banner4.png\"></img></a>",
]
let prev = banners.length

setInterval(() => {
    let neo = Math.floor(Math.random()*(banners.length-(prev < banners.length ? 1 : 0)))
    if(neo >= prev) {
        neo++
    }
    prev = neo
    banner.innerHTML = banners[prev]
}, 15000)

Number.prototype.toChineseString = function() {
    if(this == 0) {
        return "zero"
    }
    else if(this < 100) {
        let ones = {
            0: "",
            1: "one",
            2: "two",
            3: "three",
            4: "four",
            5: "five",
            6: "six",
            7: "seven",
            8: "eight",
            9: "nine",
        }
        let specs = {
            10: "ten",
            11: "eleven",
            12: "twelve",
            13: "thirteen",
            14: "fourteen",
            15: "fifteen",
            16: "sixteen",
            17: "seventeen",
            18: "eighteen",
            19: "nineteen",
        }
        let tens = {
            2: "twenty",
            3: "thirty",
            4: "forty",
            5: "fifty",
            6: "sixty",
            7: "seventy",
            8: "eighty",
            9: "ninety",
        }
        let a = parseInt(this / 10)
        let b = this % 10
        let result
        if(a > 1) {
            result = [tens[a], ones[b]]
        }
        else if(a == 1) {
            result = [specs[this]]
        }
        else {
            result = [ones[b]]
        }
        return result.join(" ")
    }
    return ""
}

Array.prototype.shuffle = function() {
    let result = [...this]
    let currentIndex = result.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = result[currentIndex];
      result[currentIndex] = result[randomIndex];
      result[randomIndex] = temporaryValue;
    }
  
    return result;
  }