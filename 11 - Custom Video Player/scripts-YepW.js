const video = document.querySelector('.viewer')
const toggle = document.querySelector('.toggle')
const ranges = document.querySelectorAll('.player__slider')
const skips = document.querySelectorAll('.skip')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')

function togglePlay() {
    const method = video.paused ? 'play' : 'pause'
    video[method]()
}

function playPauseButton() {
    const icon = this.paused ? '►' : '❚ ❚'
    toggle.textContent = icon
}

function rangeUpdate() {
    video[this.name] = this.value
}

function skipPlay() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function playUpdateProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function playProgress(e) {
    const curTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = curTime
}


// 点击播放暂停事件
video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)

// 点击播放暂停按钮事件
video.addEventListener('play', playPauseButton)
video.addEventListener('pause', playPauseButton)

// 音量拖动或修改 和播放速率拖动修改事件
ranges.forEach(range => range.addEventListener('change', rangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate))

// 前进后退秒数事件
skips.forEach(skip => skip.addEventListener('click', skipPlay))

// 播放进度事件
let mousedown = false
video.addEventListener('timeupdate', playUpdateProgress)
progress.addEventListener('click', playProgress)
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mousemove', (e) => mousedown && playProgress(e))
progress.addEventListener('mouseup', () => mousedown = false)