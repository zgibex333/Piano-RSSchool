const piano = document.querySelector('.piano');
const keys = document.querySelectorAll('.piano-key');
const notesBtn = document.querySelector('.btn-notes');
const lettersBtn = document.querySelector('.btn-letters');
const fullscreenBtn = document.querySelector('.fullscreen');
const main = document.querySelector('body')
//Использовал  keyCode вместо code, но смысл понял - можем получать строку('KeyF'), а не цифру
// document.addEventListener('keydown', function (event) {
//     console.log(event.code[event.code.length-1]);
// })

//FULLSCREEN ON/OFF

fullscreenBtn.addEventListener('click', fullscreenToggle);

function fullscreenToggle() {
    document.fullscreenElement === null ? document.documentElement.requestFullscreen() : document.exitFullscreen();
}

//CHANGING NOTES TO LETTERS & VICE VERSA
lettersBtn.addEventListener('click', function () {
    lettersBtn.classList.add('btn-active');
    notesBtn.classList.remove('btn-active');
    keys.forEach(e => {
        e.classList.add('letters-button');
    });
});

notesBtn.addEventListener('click', function () {
    notesBtn.classList.add('btn-active');
    lettersBtn.classList.remove('btn-active');
    keys.forEach(e => {
        e.classList.remove('letters-button');
    });
});



//KEYBOARD EVENTS
document.addEventListener('keydown', function (event) {
    if (event.repeat === false) {
        const note = document.querySelector(`audio[data-sound="${event.keyCode}"]`);
        note.currentTime = 0;
        note.play();
        keys.forEach(element => {
            if (element.getAttribute('data-sound') === event.keyCode.toString()) {
                element.classList.add('simulate-hover');
                element.classList.add('active');
            }
            event.keyCode = 0;
        });
    }

});

document.addEventListener('keyup', function (event) {
    keys.forEach(element => {
        if (element.getAttribute('data-sound') === event.keyCode.toString()) {
            element.classList.remove('active');
            element.classList.remove('simulate-hover');
        }
    });
});



//MOUSE EVENTS
const startSound = (event) => {
    event.target.classList.add('active');
    const note = document.querySelector(`audio[data-note="${event.target.getAttribute("data-note")}"]`);
    note.currentTime = 0;
    note.play();
};

const stopSound = (event) => {
    event.target.classList.remove('active');
};

const pianoStart = (event) => {
    event.target.classList.add('active');
    const note = document.querySelector(`audio[data-note="${event.target.getAttribute("data-note")}"]`);
    note.currentTime = 0;
    note.play();
    keys.forEach((key) => {
        key.addEventListener('mouseover', startSound);
        key.addEventListener('mouseout', stopSound);
    });
};

const pianoStop = () => {
    keys.forEach(key => {
        key.classList.remove('active');
        key.removeEventListener('mouseover', startSound);
        key.removeEventListener('mouseout', stopSound);
    });
};


piano.addEventListener('mousedown', pianoStart);

piano.addEventListener('mouseup', pianoStop);
main.addEventListener('mouseup', pianoStop);