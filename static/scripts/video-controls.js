const video = document.getElementById("header-glaicer-video")
const play_btn = document.getElementById("play-btn")
const pause_btn = document.getElementById("pause-btn")
const play_btn_shape = document.getElementById("play-btn-shape")
const pause_btn_shape = document.getElementById("pause-btn-shape")

video.controls = false;

play_btn.style.display='flex'
pause_btn.style.display='none'
// pause_btn.style.display='none';


function show_btn(event) {
    if (video.play) {
        play_btn.style.display='flex'
        pause_btn.style.display='none';
    }

};

// function hide_btn(event) {s
//     if (video.play) {
//         play_btn.classList.add('hiden');
//         pause_btn.classList.add('hiden');
//     }
// };

// function play_video(params) {
//     play_btn_shape.setAttribute('stroke', 'blue')
//     video.play()
//     pause_btn.style.display='none';
//     play_btn.style.display = "none"
// }

play_btn.addEventListener('click', function(){
        video.play()
        play_btn.style.display='none'
        pause_btn.style.display='none';
    });
video.addEventListener('mousemove', show_btn())
video.addEventListener('mouseover', hide_btn())
video.addEventListener('click', play_video())


// pause_btn.addEventListener('mouseenter', on_hover(e))
// pause_btn.addEventListener('mouseleave', mouse_leave(e))

// play_btn.addEventListener('mouseenter', on_hover(e))
// play_btn.addEventListener('mouseleave', mouse_leave(e))


console.log(pause_btn_shape)

