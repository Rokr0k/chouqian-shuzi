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
        alert("쵹ᄍᆞᆼᅟᅵ업다")
        return
    }
    mode1.childNodes.forEach(node => node.disabled = true)
    let arr = ["려ᇰ〮", "ᅙᅵᇙ〮", "ᅀᅵᆼ〮", "삼〮", "ᄉᆞᆼ〯", "ᅌᅩᆼ〯", "륙〮", "치ᇙ〮", "바ᇙ〮", "구ᇢ〯"]
    let interval = setInterval(() => {
        if(maxValue <= 10) {
            viewer.innerHTML = arr[Math.floor(Math.random()*arr.length)]
        }
        else {
            viewer.innerHTML = arr[Math.floor(Math.random()*arr.length)]+arr[Math.floor(Math.random()*arr.length)]+arr[Math.floor(Math.random()*arr.length)]
        }
    }, 50)
    setTimeout(() => {
        clearInterval(interval)
        mode1.childNodes.forEach(node => node.disabled = false)
        let result = parseInt(Math.random() * (maxValue - minValue + 1) + minValue)
        while(excptValues.includes(result)) {
            result = parseInt(Math.random() * (maxValue - minValue + 1) + minValue)
        }
        viewer.innerHTML = result.toChineseString()
        excpt.value = result.toString().concat(" ").concat(excpt.value.concat(" ")).trim()
    }, 1500)
}

roll2.onclick = function() {
    const selectValue = select.value.split(" ").filter(value => value.match(/^\d+$/)).map(number => parseInt(number)).sort((a, b) => a - b)
    if(selectValue.length == 0) {
        alert("쵹ᄍᆞᆼᅟᅵ업다")
    }
    mode2.childNodes.forEach(node => node.disabled = true)
    let arr = ["려ᇰ〮", "ᅙᅵᇙ〮", "ᅀᅵᆼ〮", "삼〮", "ᄉᆞᆼ〯", "ᅌᅩᆼ〯", "륙〮", "치ᇙ〮", "바ᇙ〮", "구ᇢ〯"]
    let interval = setInterval(() => {
        if(selectValue[selectValue.length-1] <= 10) {
            viewer.innerHTML = arr[Math.floor(Math.random()*arr.length)]
        }
        else {
            viewer.innerHTML = arr[Math.floor(Math.random()*arr.length)]+arr[Math.floor(Math.random()*arr.length)]+arr[Math.floor(Math.random()*arr.length)]
        }
    }, 50)
    setTimeout(() => {
        clearInterval(interval)
        mode2.childNodes.forEach(node => node.disabled = false)
        const result = selectValue[Math.floor(Math.random()*selectValue.length)]
        viewer.innerHTML = result.toChineseString()
        select.value = select.value.replace(new RegExp(result+"\\s*"), "")
    }, 1500)
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

Number.prototype.toChineseString = function() {
    if(this == 0) {
        return "려ᇰ〮"
    }
    else if(this < 100) {
        let digits = {
            0: "",
            1: "ᅙᅵᇙ〮",
            2: "ᅀᅵᆼ〮",
            3: "삼〮",
            4: "ᄉᆞᆼ〯",
            5: "ᅌᅩᆼ〯",
            6: "륙〮",
            7: "치ᇙ〮",
            8: "바ᇙ〮",
            9: "구ᇢ〯",
        }
        let a = parseInt(this / 10)
        let b = this % 10
        let result
        if(a > 1) {
            result = digits[a].concat("씹〮").concat(digits[b])
        }
        else if(a == 1) {
            result = "씹〮".concat(digits[b])
        }
        else {
            result = digits[b]
        }
        return result
    }
    return ""
}