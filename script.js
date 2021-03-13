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
    const excptValues = excpt.value.split(" ").filter(value => value.match(/^\d+$/)).map(number => parseInt(number))
    let array = []
    for(let i = minValue; i < maxValue; i++) {
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
    roll1.blur()
}

roll2.onclick = function() {
    const selectValue = select.value.split(" ").filter(value => value.match(/^\d+$/)).map(number => parseInt(number))
    if(selectValue.length > 0) {
        const result = selectValue[Math.floor(Math.random()*selectValue.length)]
        viewer.innerHTML = toChineseString(result)
        select.value = select.value.replace(new RegExp(result+"\\s*"), "")
    }
    else {
        alert("没有数字")
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

let banners = [
    "<img src=\"banners/banner1.png\"></img>",
    "<img src=\"banners/banner2.png\"></img>",
]
let prev = -1

setInterval(() => {
    let neo = Math.floor(Math.random()*(banners.length-1))
    if(neo >= prev) {
        neo++
    }
    prev = neo
    banner.innerHTML = banners[prev]
}, 15000)

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
    const order = [10000, 1000, 100, 10, 1]
    const units = {
        1: "",
        10: "十",
        100: "百",
        1000: "千",
        10000: "万",
    }
    let result = ""
    for(let unit of order) {
        let digit = Math.floor(value / unit)
        if((unit > 1 && digit > 1) || (unit === 1 && digit > 0)) {
            result = result.concat(nums[digit])
        }
        if(digit > 0) {
            result = result.concat(units[unit])
        }
        value = value % unit
    }
    return result || "零"
}