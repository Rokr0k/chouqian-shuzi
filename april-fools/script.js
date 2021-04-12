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
        alert("没有数字")
        return
    }
    mode1.childNodes.forEach(node => node.disabled = true)
    let interval = setInterval(() => {
        let result = Math.floor(Math.random() * 100)
        viewer.innerHTML = result.toManchuString()
    }, 50)
    setTimeout(() => {
        clearInterval(interval)
        mode1.childNodes.forEach(node => node.disabled = false)
        let result = parseInt(Math.random() * (maxValue - minValue + 1) + minValue)
        while(excptValues.includes(result)) {
            result = parseInt(Math.random() * (maxValue - minValue + 1) + minValue)
        }
        let str = result.toManchuString()
        viewer.innerHTML = str
        excpt.value = result.toString().concat(" ").concat(excpt.value.concat(" ")).trim()
    }, 1500)
}

roll2.onclick = function() {
    const selectValue = select.value.split(" ").filter(value => value.match(/^\d+$/)).map(number => parseInt(number)).sort((a, b) => a - b)
    if(selectValue.length == 0) {
        alert("没有数字")
        return
    }
    console.log(selectValue)
    mode2.childNodes.forEach(node => node.disabled = true)
    let interval = setInterval(() => {
        let result = Math.floor(Math.random() * 100)
        viewer.innerHTML = result.toManchuString()
    }, 50)
    setTimeout(() => {
        clearInterval(interval)
        mode2.childNodes.forEach(node => node.disabled = false)
        const result = selectValue[Math.floor(Math.random()*selectValue.length)]
        let str = result.toManchuString()
        viewer.innerHTML = str
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

Number.prototype.toManchuString = function() {
    if(this == 0) {
        return "<ruby>ᠠᡴᡡ<rt>无</rt></ruby>"
    }
    else if(this < 100) {
        let ones = {
            0: "",
            1: "<ruby>ᡝᠮᡠ<rt>一</rt></ruby>",
            2: "<ruby>ᠵᡠᠸᡝ<rt>二</rt></ruby>",
            3: "<ruby>ᡳᠯᠠᠨ<rt>三</rt></ruby>",
            4: "<ruby>ᡩᡠᡳᠨ<rt>四</rt></ruby>",
            5: "<ruby>ᠰᡠᠨᠵᠠ<rt>五</rt></ruby>",
            6: "<ruby>ᠨᡳᠩᡤᡠᠨ<rt>六</rt></ruby>",
            7: "<ruby>ᠨᠠᡩᠠᠨ<rt>七</rt></ruby>",
            8: "<ruby>ᠵᠠᡴᡡᠨ<rt>八</rt></ruby>",
            9: "<ruby>ᡠᠶᡠᠨ<rt>九</rt></ruby>",
        }
        let tens = {
            1: "<ruby>ᠵᡠᠸᠠᠨ<rt>十</rt></ruby>",
            2: "<ruby>ᠣᡵᡳᠨ<rt>二十</rt></ruby>",
            3: "<ruby>ᡤᡡᠰᡳᠨ<rt>三十</rt></ruby>",
            4: "<ruby>ᡩᡝᡥᡠ<rt>四十</rt></ruby>",
            5: "<ruby>ᠰᡠᠰᠠᡳ<rt>五十</rt></ruby>",
            6: "<ruby>ᠨᡳᠨᠵᡠ<rt>六十</rt></ruby>",
            7: "<ruby>ᠨᠠᡩᠠᠨᠵᡠ<rt>七十</rt></ruby>",
            8: "<ruby>ᠵᠠᡴᡡᠨᠵᡠ<rt>八十</rt></ruby>",
            9: "<ruby>ᡠᠶᡠᠨᠵᡠ<rt>九十</rt></ruby>",
        }
        let a = parseInt(this / 10)
        let b = this % 10
        let result
        if(a > 0) {
            result = [tens[a], ones[b]]
        }
        else {
            result = [ones[b]]
        }
        if(this === 15) {
            result = ["<ruby>ᡨᠣᡶᠣᡥᠣᠨ<rt>十五</rt></ruby>"]
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