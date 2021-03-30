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
        alert("没有可用的数字")
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
    "<a href=\"https://www.dimigo.hs.kr/\" target=\"_blank\"><img src=\"banners/banner1.png\"></img></a>",
    "<a href=\"https://www.facebook.com/Cracker-in-dimigo-783226285143210/\" target=\"_blank\"><img src=\"banners/banner2.png\"></img></a>",
    "<a href=\"https://www.facebook.com/deltaindimigo/\" target=\"_blank\"><img src=\"banners/banner3.png\"></img></a>",
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

Number.prototype.toChineseString = function() {
    if(this == 0) {
        return "零"
    }
    else if(this < 100) {
        let digits = {
            0: "",
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
        let a = parseInt(this / 10)
        let b = this % 10
        let result
        if(a > 1) {
            result = digits[a].concat("十").concat(digits[b])
        }
        else if(a == 1) {
            result = "十".concat(digits[b])
        }
        else {
            result = digits[b]
        }
        return result
    }
    else {
        let digits = {
            "0": "零",
            "1": "一",
            "2": "两",  
            "3": "三",
            "4": "四",
            "5": "五",
            "6": "六",
            "7": "七",
            "8": "八",
            "9": "九",
        }
        let units = ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千"]
        let str = this.toString().split("").reverse().map((v, i) => digits[v].concat(units[i])).reverse().join("")
        let result = str.replace(/(零[十百千]?)+/g, "零").replace(/零万/g, "万").replace(/零亿/g, "亿").replace(/零$/, "").replace(/两十/g, "二十").replace(/两$/g, "二")
        if(result.match(/[一两二三四五六七八九][十百千]$/) && !result.match(/零[一两二三四五六七八九][十百千]$/)) {
            result = result.replace(/.$/, "")
        }
        if(result.match(/[一两二三四五六七八九][十百千]万/) && !result.match(/零[一两二三四五六七八九][十百千]万/)) {
            result = result.replace(/.万/, "万")
        }
        if(result.match(/[一两二三四五六七八九][十百千]亿/) && !result.match(/零[一两二三四五六七八九][十百千]亿/)) {
            result = result.replace(/.亿/, "亿")
        }
        return result
    }
}