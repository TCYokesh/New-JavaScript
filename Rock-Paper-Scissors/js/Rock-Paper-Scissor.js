let Score = JSON.parse(localStorage.getItem('Score'))
// console.log(Score);
if (Score === null){
Score = {
    Win: 0,
    Lost: 0,
    Tie: 0
}; 
}
let isAutoPlaying = false;
let intervalId;
// const autoPlay = () =>{

// };
function autoplay(){
    if(!isAutoPlaying) {
        intervalId = setInterval(() => {
        const PlayerMove = compMove();
        playGame(PlayerMove);
    },1000);
    isAutoPlaying = true;
    document.querySelector('.Auto').innerHTML = 'Stop Play';
    }
    else{
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.Auto').innerHTML = 'Auto Play';
    }
}
document.querySelector('.js-rock').addEventListener('click',() => {
    playGame('Rock');
});

document.querySelector('.js-paper').addEventListener('click',() => {
    playGame('Paper');
});

document.querySelector('.js-scissor').addEventListener('click',() => {
    playGame('Scissor');
});

document.body.addEventListener('keydown',(event) => {
    if (event.key === 'r'){
        playGame('Rock');
    }
    else if (event.key === 'p'){
        playGame('Paper');
    }
    else if (event.key === 's'){
        playGame('Scissor');
    }
});

function playGame(PlayerMove){
    let result = '';
    const computerMove = compMove();
    if (PlayerMove === 'Rock'){
        if (computerMove === 'Rock') {
            result = 'Tie';
        }
        else if (computerMove === 'Paper') {
            result = 'You Lost';
        }
        else {
            result = 'You Win';
        }
        document.querySelector('.js-one').innerHTML = result;
    }

    else if (PlayerMove === 'Paper') {
        if (computerMove === 'Paper') {
            result = 'Tie';
        }
        else if (computerMove === 'Rock') {
            result = 'You Win';
        }
        else {
            result = 'You Lost';
        }
        document.querySelector('.js-one').innerHTML = result;
    }

    else if(PlayerMove === 'Scissor') {
        if (computerMove === 'Scissor') {
            result = 'Tie';
        }
        else if (computerMove === 'Rock') {
            result = 'You Lost';
        }
        else if (computerMove === 'Paper'){
            result = 'You Win';
        }
        document.querySelector('.js-one').innerHTML = result;
    }


    if (result === 'You Win'){
        Score.Win = Score.Win + 1;
    }
    else if (result === 'You Lost') {
        Score.Lost = Score.Lost + 1;
    }
    else {
        Score.Tie = Score.Tie + 1;
    }
    console.log(Score);

    localStorage.setItem('Score', JSON.stringify(Score));

    document.querySelector('.js-two').innerHTML = `You <img src="images/${PlayerMove}-emoji.png"> - <img src="images/${computerMove}-emoji.png"> Computer`;
    document.querySelector('.js-three').innerHTML = `Wins: ${Score.Win}, Losts: ${Score.Lost}, Ties: ${Score.Tie}`;
    // alert(`You Picked ${PlayerMove}. Computer Picked ${computerMove}.${result} \nWin = ${Score.Win} \nLost = ${Score.Lost} \nTie = ${Score.Tie}`);
}
function init() {
    if (!Score) {
        Score = { Win: 0, Lost: 0, Tie: 0 };
    }
    document.querySelector('.js-one').innerHTML = '-';
    document.querySelector('.js-two').innerHTML = '-';
    document.querySelector('.js-three').innerHTML = `Wins: ${Score.Win}, Losts: ${Score.Lost}, Ties: ${Score.Tie}`;
}
init();

function Reset(){
    Score.Win = 0,
    Score.Lost = 0,
    Score.Tie = 0
    localStorage.removeItem('Score');
    //alert(`Win = ${Score.Win} \nLost = ${Score.Lost} \nTie = ${Score.Tie}`);
    document.querySelector('.js-one').innerHTML = '';
    document.querySelector('.js-two').innerHTML = `Game Reseted!`;
    document.querySelector('.js-three').innerHTML = `Win: ${Score.Win}, Lost: ${Score.Lost}, Tie: ${Score.Tie}`;
    //console.log(`Win = ${Score.Win} \nLost = ${Score.Lost} \nTie = ${Score.Tie}`);
};

// let computerMove = ''; 
function compMove(){
    const random = Math.random();

    if (random >= 0 && random < 1/3){
        computerMove = 'Rock';
    }
    else if (random >= 1/3 && random < 2/3){
        computerMove = 'Paper';
    }
    else {
        computerMove = 'Scissor';
    }
    return computerMove;
}
