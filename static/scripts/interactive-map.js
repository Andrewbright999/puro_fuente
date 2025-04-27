let circles = document.querySelectorAll('.map-circle');
let image_background = document.querySelectorAll('.image-background')[0];
let map_images = document.querySelectorAll('.map-image')
let map_thumb_images = document.querySelectorAll('.map-image-thumb')

circles.forEach((circle) => {
    circle.addEventListener('mouseleave', function() {
            let img = map_thumb_images[0]
            circle.setAttribute('fill', "#08588C")
            circle.setAttribute('stroke-width', "8")
            img.setAttribute('style', "display: none")
    });

    circle.addEventListener('mouseenter', function(e) {
        // let x = ( - circle.getAttribute("cx") + circle.x);
        // let y = (  - circle.getAttribute("cy") + circle.y); 
        let x = e.clientX + 10;
        let y = window.scrollY + e.clientY - 30;
        let img = map_thumb_images[0]
        circle.setAttribute('fill', "#7DC2E7")
        circle.setAttribute('stroke-width', "16")
        img.setAttribute('style', "display: block")
        img.style.top = y + "px";
        img.style.left = x + "px";
        console.log(x + " " + y);
    });

    circle.addEventListener('click', function() {
        circle.setAttribute('fill', "green")
        image_background.setAttribute('style', "display: flex")
        map_images[0].setAttribute('style', "display: flex")
    });
});

console.log(image_background)

image_background.addEventListener('click', function() {
    image_background.setAttribute('style', "display: none")
    map_images[0].setAttribute('style', "display: none")
});


