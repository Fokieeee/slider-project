export class Slider {
  constructor(options) {
    //check required options
    if (!options.root) {
      throw new Error("Root element css selector is required")
    }
    if (!options.slides || options.slides.length === 0) {
      throw new Error("List of slides is required")
    }
    //set options
    this.delay = options.delay || 2500
    this.root = document.querySelector(options.root)
    this.width = options.width || 750
    this.height = options.height || 400
    this.slides = options.slides

    this.currentSlideIndex = 0
    this.timer = null
    //init slider
    this.init()
  }

  init() {
    //give width/height to root element
    this.root.style.width = `${this.width}px`
    this.root.style.height = `${this.height}px`

    this.createSlides()
    this.startSlider()
  }

  createSlides() {
    for (let i = 0; i < this.slides.length; i++) {
      const slide = document.createElement("div")
      slide.classList.add("slide")
      slide.style.backgroundColor = this.slides[i].color
      slide.textContent = this.slides[i].text
      //make first slide visible
      if (i === 0) {
        slide.style.display = "flex"
      }
      //append slide to root element
      this.root.appendChild(slide)
    }
  }

  //set slides interval
  startSlider() {
    this.timer = setInterval(() => {
      this.showNextSlide()
    }, this.delay)
  }
  //stop interval
  stopSlider() {
    clearInterval(this.timer)
  }

  showNextSlide() {
    const slides = this.root.getElementsByClassName("slide")

    this.currentSlideIndex++

    //stop
    if (this.currentSlideIndex >= slides.length) {
      this.stopSlider()
      return
    }
    //show next slide element by adding "passed" class
    slides[this.currentSlideIndex].classList.add("passed")
  }
}
