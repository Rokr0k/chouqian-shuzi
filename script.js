"use strict"

let viewer = document.getElementById("number-viewer")
let min = document.getElementById("min")
let max = document.getElementById("max")
let excpt = document.getElementById("excpt")
let roll = document.getElementById("roll")

excpt.onkeydown = function(ev) {
    if(!(ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey) && !ev.code.match(/^(Digit\d|Numpad\d|Space|Backspace|Arrow.*|Delete)$/)) {
        ev.preventDefault()
    }
}

window.onkeydown = function(ev) {
    if(ev.code === "Enter") {
        roll.onclick()
    }
}

roll.onclick = function() {
    const minValue = Math.min(min.value, max.value)
    const maxValue = Math.max(max.value, min.value)
    const excptValues = excpt.value.split(" ").filter(value => value.match(/^\d+$/)).map(number => parseInt(number))
    let array = []
    for(let i=minValue; i<=maxValue; i++) {
        if(!excptValues.includes(i)) {
            array.push(i)
        }
    }
    if(array.length > 0) {
        const result = array[Math.floor(Math.random()*array.length)]
        viewer.innerHTML = toChineseString(result)
        excpt.value = excpt.value.concat(" ").concat(result.toString()).trim()
    }
    else {
        alert("没有可用的数字")
    }
    roll.blur()
}

function toChineseString(value) {
    const nums = {
        0: "零",
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "七",
        8: "八",
        9: "九",
    }
    const order = [100, 10, 1]
    const units = {
        1: "",
        10: "十",
        100: "百",
    }
    let result = ""
    for(let unit of order) {
        let digit = Math.floor(value / unit)
        if((unit > 1 && digit>1) || (unit === 1 && digit > 0)) {
            result = result.concat(nums[digit])
        }
        if(digit>0) {
            result = result.concat(units[unit])
        }
        value = value % unit
    }
    return result || "零"
}