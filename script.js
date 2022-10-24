let fields = [];
let gameOver = false;
let currentShape = 'cross';
let AUDIO_SUCCESS = new Audio('sounds/success.mp3');
let clickShape = 0;


function fillShape(id) {
    if (noBodyWin(id)) {
        if (currentShape == 'cross') {
            chanceToPlayer2();
        } else {
            chanceToPlayer1();
        }
        fields[id] = currentShape;
        draw();
        checkForWin();
    }
}

function noBodyWin(id) {
    return !fields[id] && !gameOver;
}

function chanceToPlayer2() {
    currentShape = 'circle';
    document.getElementById('player-1').classList.add('player-inactive');
    document.getElementById('player-2').classList.remove('player-inactive');
    clickShape++;
}

function chanceToPlayer1() {
    currentShape = 'cross';
    document.getElementById('player-1').classList.remove('player-inactive');
    document.getElementById('player-2').classList.add('player-inactive');
    clickShape++;
}


function draw() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById(`circle-${i}`).classList.remove('d-none');
        }
        if (fields[i] == 'cross') {
            document.getElementById(`cross-${i}`).classList.remove('d-none');
        }
    }
}


function checkForWin() {
    let mediaQuery = window.matchMedia("(max-width: 490px)");
    let winner;
    winLine1(mediaQuery, winner);
    winLine2(mediaQuery, winner);
    winLine3(mediaQuery, winner);
    winLine4(mediaQuery, winner);
    winLine5(mediaQuery, winner);
    winLine6(mediaQuery, winner);
    winLine7(mediaQuery, winner);
    winLine8(mediaQuery, winner);
    getWinner(winner);
    getDraw();
}


function winLine1(mediaQuery, winner) {
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        if (mediaQuery.matches) {
            document.getElementById('line-0').style.transform = 'scaleX(0.8)';
        } else {
            document.getElementById('line-0').style.transform = 'scaleX(1)';
        }
    }
    getWinner(winner);
    getDraw();
}

function winLine2(mediaQuery, winner) {
    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        if (mediaQuery.matches) {
            document.getElementById('line-1').style.transform = 'scaleX(0.8)';
        } else {
            document.getElementById('line-1').style.transform = 'scaleX(1)';
        }
    }
    getWinner(winner);
    getDraw();
}


function winLine3(mediaQuery, winner) {
    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        if (mediaQuery.matches) {
            document.getElementById('line-2').style.transform = 'scaleX(0.8)';
        } else {
            document.getElementById('line-2').style.transform = 'scaleX(1)';
        }
    }
    getWinner(winner);
    getDraw();
}


function winLine4(mediaQuery, winner) {
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        if (mediaQuery.matches) {
            document.getElementById('line-3').style.transform = ' rotate(90deg)scaleX(0.8)';
        } else {
            document.getElementById('line-3').style.transform = ' rotate(90deg) scaleX(1)';
        }
    }
    getWinner(winner);
    getDraw();
}


function winLine5(mediaQuery, winner) {
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        if (mediaQuery.matches) {
            document.getElementById('line-6').style.transform = ' rotate(45deg)scaleX(0.9)';
        } else {
            document.getElementById('line-6').style.transform = 'rotate(45deg) scaleX(1.2)';
        }
    }
    getWinner(winner);
    getDraw();
}


function winLine6(mediaQuery, winner) {
    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        if (mediaQuery.matches) {
            document.getElementById('line-4').style.transform = ' rotate(90deg)scaleX(0.8)';
        } else {
            document.getElementById('line-4').style.transform = 'rotate(90deg) scaleX(1)';
        }
    }
    getWinner(winner);
    getDraw();
}


function winLine7(mediaQuery, winner) {
    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        if (mediaQuery.matches) {
            document.getElementById('line-5').style.transform = ' rotate(90deg)scaleX(0.8)';
        } else {
            document.getElementById('line-5').style.transform = 'rotate(90deg) scaleX(1)';
        }
    }
    getWinner(winner);
    getDraw();
}


function winLine8(mediaQuery, winner) {
    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        if (mediaQuery.matches) {
            document.getElementById('line-7').style.transform = 'rotate(-45deg) scaleX(0.9)';
        } else {
            document.getElementById('line-7').style.transform = 'rotate(-45deg) scaleX(1.2)';
        }
    }
    getWinner(winner);
    getDraw();
}


function getDraw() {
    if (itsDraw()) {
        document.getElementById('draw').classList.remove('d-none');
        setTimeout(function () {
            document.getElementById('new-game-btn').classList.remove('d-none');
        }, 1000);
    }
}


function itsDraw() {
    return clickShape == 9 && !gameOver;
}


function getWinner(winner) {
    if (winner) {
        gameOver = true;
        setTimeout(function () {
            document.getElementById('game-over').classList.remove('d-none');
            document.getElementById('new-game-btn').classList.remove('d-none');
            clearAllFields();
            clearAllLines();
            AUDIO_SUCCESS.play();
        }, 1000);
    }
}


function restart() {
    gameOver = false;
    fields = [];
    clickShape = 0;
    clearWinAndDrawContainer();
    clearAllFields();
}


function clearWinAndDrawContainer() {
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('new-game-btn').classList.add('d-none');
    document.getElementById('draw').classList.add('d-none');
}


function clearAllFields() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`circle-` + i).classList.add('d-none');
        document.getElementById(`cross-` + i).classList.add('d-none');
    }
}


function clearAllLines() {
    for (i = 0; i < 8; i++) {
        document.getElementById(`line-` + i).style.transform = 'scaleX(0.0)';
    }
}