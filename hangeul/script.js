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
    if(maxValue - minValue + 1 > excptValues.length) {
        let result = parseInt(Math.random() * (maxValue - minValue + 1) + minValue)
        while(excptValues.includes(result)) {
            result = parseInt(Math.random() * (maxValue - minValue + 1) + minValue)
        }
        viewer.innerHTML = result.toChineseString()
        excpt.value = result.toString().concat(" ").concat(excpt.value.concat(" ")).trim()
    }
    else {
        alert("숫자가 없습니다")
    }
    roll1.blur()
}

roll2.onclick = function() {
    const selectValue = select.value.split(" ").filter(value => value.match(/^\d+$/)).map(number => parseInt(number))
    if(selectValue.length > 0) {
        const result = selectValue[Math.floor(Math.random()*selectValue.length)]
        viewer.innerHTML = result.toChineseString()
        select.value = select.value.replace(new RegExp(result+"\\s*"), "")
    }
    else {
        alert("숫자가 없습니다")
    }
    roll2.blur()
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
        return "영"
    }
    let digits = {
        "1": "일",
        "2": "이",  
        "3": "삼",
        "4": "사",
        "5": "오",
        "6": "육",
        "7": "칠",
        "8": "팔",
        "9": "구",
    }
    let units = ["", "십", "백", "천"]
    let separs = ["", "만", "억", "조"]
    let items = []
    for(let i=0; i<4; i++) {
        let separ = Math.floor(this / Math.pow(10000, i)) % 10000
        if(!separ) {
            continue
        }
        items.push(separs[i])
        for(let j=0; j<4; j++) {
            let unit = parseInt(separ / Math.pow(10, j)) % 10
            if(unit) {
                items.push(units[j], digits[unit])
            }
        }
    }
    let result = items.reverse().join("").replace(/일십/g, "십").replace(/일백/g, "백").replace(/일천/g, "천")
    return result
}