const getElemt = (elem) => {
    return document.querySelector(elem)
  }
  const startBtn = getElemt('.start')
  const stopBtn = getElemt('.stop')
  const resetBtn = getElemt('.reset')
  const timer = getElemt('.timer')
  const circle = getElemt('.cover')
  const alert = getElemt('.alert')
  
  const reset = {
        'min': 0,           // 설정할 시간(분)
        'sec': 15         // 설정할 시간(초)
  }
  
  let min = reset.min,    // 初始值 分
        sec = reset.sec,    // 初始值 秒
        unit = 1000,            // 計時單位，1000ms = 1s
        count = ''              // 指定給 setTimeout
  
  
  const fn = {
    startCount (){
        circle.classList.add('animate')
        circle.style.webkitAnimationPlayState = 'running'
        stopBtn.classList.remove('active')
        startBtn.setAttribute('disabled', '')
        render(min, sec)
        
        if ((sec + 1) === 0) {
                sec = 59
                count = setTimeout('fn.startCount()', unit)
            } else if (sec === 0) {
                min -= 1
                sec = 59
                count = setTimeout('fn.startCount()', unit)
            } else {
                sec -= 1
                count = setTimeout('fn.startCount()', unit)
            }
        
        console.log(min, (sec + 1))
        
        
        // 時間結束
        if (min < 0 && (sec + 1) == 60) {
            clearTimeout(count)
            min = 0 
            sec = 0
            circle.style.webkitAnimationPlayState = 'paused'
            stopBtn.setAttribute('disabled', '')
            render(min, sec)
            alert.style.display = 'block'
            console.log('Stop')
        }
        
    },
    stopCount (){
        clearTimeout(count)
        stopBtn.classList.add('active')
        circle.style.webkitAnimationPlayState = 'paused'
        startBtn.removeAttribute('disabled')
    },
    resetCount (){
        clearTimeout(count)
        min = reset.min
        sec = reset.sec
        render(min, sec)
        stopBtn.classList.remove('active')
        circle.classList.remove('animate')
        startBtn.removeAttribute('disabled')
        stopBtn.removeAttribute('disabled')
        alert.style.display = 'none'
    }
  }
  
  const render = (min, sec) => {
    min = (min < 10 ? '0' : '') + min
    sec = (sec < 10 ? '0' : '') + sec
    timer.innerHTML = `${min}：${sec}`
  }
  
  
  startBtn.addEventListener('click', fn.startCount)
  stopBtn.addEventListener('click', fn.stopCount)
  resetBtn.addEventListener('click', fn.resetCount)
  render(min, sec)
  
  