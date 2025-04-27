let sections = document.querySelectorAll('section');
let body = document.querySelectorAll('body')[0];

console.log(sections.length)
console.log(body)


let colors = ["#FFFFFF","#EBF8FF","#DDF3FF","#CFEEFF","#BDE8FF","#A0D3EE","#DDF3FF","#EBF8FF"]

document.addEventListener("scroll", function(e) {
   let color = colors[parseInt(window.scrollY * 0.002 % 8)];
//    body.style.backgroundColor=color;
   console.log(parseInt(window.scrollY % 5))
});