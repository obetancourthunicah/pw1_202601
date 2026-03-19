document.addEventListener("DOMContentLoaded", ()=>{
    let miCarusel = new Carousel("caruselPrincipal");
    miCarusel.init();
});

class Carousel {
    constructor(carouselId, tickTimeInSeconds = 3){
        this.carouselHolder = document.getElementById(carouselId);
        this.track = this.carouselHolder.querySelector(".track");
        this.slides = [...this.track.querySelectorAll(".slide")];
        this.minLimit = 0;
        this.maxLimit = this.slides.length - 1;
        this.currentIndex = 0;
        this.tickTime = tickTimeInSeconds * 1000;
        this.tickerId = null;
        this.direction = 1;
    }
    init() {
        this.tick();
    }
    tick(){
        this.tickerId = setTimeout(
            ()=>{
                this.moveNext();
                this.tick();
            },
            this.tickTime
        );
    }
    moveNext(){
        let tmpNewIndex = this.currentIndex + this.direction;
        if (tmpNewIndex > this.maxLimit) {
            tmpNewIndex = this.maxLimit - 1;
            this.direction = -1;
        }
        if (tmpNewIndex < this.minLimit) {
            tmpNewIndex = this.minLimit + 1;
            this.direction = 1;
        }
        this.moveTo(tmpNewIndex);
    }

    moveTo(newIndex) {
        this.currentIndex = newIndex;
        this.track.style.left = `${-100 * this.currentIndex}vw`;
    }


}