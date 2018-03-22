/*--------------- SCROLL SPY --------------- */
var ScrollSpy = (function () {

    const sections = Array.from(document.querySelectorAll(".section"));

    let sectionOffsets = [];
    sections.forEach(e => sectionOffsets[e.id] = e.offsetTop);

    return {
        scrollSpy: function () {
            sections.forEach(section => {
                var addActiveAt = (window.scrollY + window.innerHeight) - section.clientHeight / 2;
                if (sectionOffsets[section.id] <= addActiveAt) {
                    Array.from(document.querySelectorAll('.active')).forEach(e => e.classList.remove('active'));
                    Array.from(document.querySelectorAll(`a[href*= ${section.id}]`)).forEach(e => e.classList.add('active'));
                }
            });
        }
    }

})();




/*--------------- WAYPOINTS --------------- */
var WayPoints = (function () {

    const waypoints = document.querySelectorAll('.waypoint');

    return {
        checkPoint: function () {
            waypoints.forEach(waypoint => {

                //halfway through the element
                const addClassAt = (window.scrollY + window.innerHeight) - waypoint.clientHeight / 2;

                const isHalfShown = addClassAt > waypoint.offsetTop;

                const elementBottom = waypoint.offsetTop + waypoint.clientHeight;
                const isNotScrollPast = (window.scrollY + window.innerHeight) <= elementBottom;

                if (isHalfShown && isNotScrollPast) {
                    waypoint.classList.remove(waypoint.getAttribute('data-classToRemove'));
                    waypoint.classList.add(waypoint.getAttribute('data-classToAdd'));
                }
            });
        }
    }

})();




/*--------------- CAROUSEL --------------- */
class Carousel {

    constructor(containerID) {
        this.container = document.getElementById(containerID) || document.body;
        this.slides = this.container.querySelectorAll('.carousel');
        this.total = this.slides.length - 1;
        this.current = 0;

        // start on slide 1
        this.slide(this.current);
    }


    //NEXT
    next(interval) {
        (this.current === this.total) ? this.current = 0 : this.current += 1;

        this.stop();
        this.slide(this.current);

        if (typeof interval === 'number' && (interval % 1) === 0) {
            var context = this;
            this.run = setTimeout(function () {
                context.next(interval);
            }, interval);
        }
    };


    //PREVIUS
    prev(interval) {
        (this.current === 0) ? this.current = this.total : this.current -= 1;

        this.stop();
        this.slide(this.current);

        if (typeof interval === 'number' && (interval % 1) === 0) {
            var context = this;
            this.run = setTimeout(function () {
                context.prev(interval);
            }, interval);
        }
    };


    //STOP
    stop() {
        clearTimeout(this.run);
    };


    //SLIDE
    slide(index) {
        if (index >= 0 && index <= this.total) {
            this.stop();
            for (var s = 0; s <= this.total; s++) {
                if (s === index) {
                    this.slides[s].style.display = "inline-block";
                } else {
                    this.slides[s].style.display = 'none';
                }
            }
        } else {
            alert("Index " + index + " doesn't exist. Available : 0 - " + this.total);
        }
    };
}




/*--------------- APP CONTROLLER --------------- */
var Controller = (function (scrollSpy, wayPoints) {

    //debounce
    function debounce(func, wait = 15, immediate = true) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    //scrolled navigation
    function scrolledNavigation() {
        var nav = document.querySelector('.navigation');

        if (nav.offsetTop >= 150) {
            nav.classList.add('scrolled');
        }

        if (window.scrollY >= 150) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    //onscroll listener
    window.addEventListener("scroll", debounce(function () {
        scrolledNavigation();
        scrollSpy.scrollSpy();
        wayPoints.checkPoint();
    }));


})(ScrollSpy, WayPoints);
