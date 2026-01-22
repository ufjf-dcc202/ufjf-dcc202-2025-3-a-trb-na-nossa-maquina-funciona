const grid = document.querySelector('#grid');

const squaresArray = [];
let gameRunning = true;
let level = 0;

//a= chao baixo| b= chao medio| c= chao alto| d= chao da luz | e= chao vazio
const maps = [
    //level 1
    [
        'aaeee',
        'eaeee',
        'eaead',
        'eaeae',
        'eaaae',
    ],
    //level 2
    [
        'aaeee',
        'ebcbe',
        'eeeae',
        'eeeae',
        'eeede',
    ],
    //level 3
    [
        'aaeee',    
        'ebbbe',
        'eeece',
        'ebcbe',
        'eaade',
    ],
];

function createBoard(){
    const currentMap = maps[level]; //seleciona o mapa
    grid.innerHTML = ""; // limpa antes de recriar

    for (let i = 0; i < currentMap.length; i++){
        for (let j = 0; j < currentMap[i].length; j++){
            const square = document.createElement('div');
            square.setAttribute('id', `square-${i}-${j}`); //square-i-j
            square.classList.add('square');

            const char = currentMap[i][j]; //seleciona o tipo de chao
            addMapElement(square, char, i, j);

            grid.appendChild(square);
            squaresArray.push(square);
        }
    }
}
createBoard();

console.log(squaresArray);

function addMapElement(square, char, i, j){
    switch(char){
        case 'a':
            square.classList.add('ground-low');
            break;
        case 'b':
            square.classList.add('ground-medium');
            break;
        case 'c':
            square.classList.add('ground-high');
            break;  
        case 'd':
            square.classList.add('ground-light');
            break;      
        case 'e':
            square.classList.add('ground-empty');
            break;      
    }
}



// POSIÇÃO DO JOGADOR E A DIREÇÃO PARA ONDE ELE ESTÁ OLHANDO
const player = {
    row: 0,
    column: 0,
};

// RENDERIZA O JOGADOR NA TELA de acordo com O ID dos squares
function renderPlayer() { 
    const square = document.getElementById(`square-${player.row}-${player.column}`); 
    square.innerHTML = '<i class="bi bi-android2"></i>'; 
} 
// MOVE O JOGADOR NA TELA
function movePlayer() { 
    const oldSquare = document.getElementById(`square-${player.row}-${player.column}`); 
    oldSquare.innerHTML = ''; 
    
    player.column++; 
    
    const newSquare = document.getElementById(`square-${player.row}-${player.column}`); 
    newSquare.innerHTML = '<i class="bi bi-android2"></i>'; 
}
renderPlayer();
//movePlayer();



let commandsToExecute = [];
let commandsToAppear = [];
let reset = '<i class= \'bi bi-eraser\'></i>';
let undo = '<i class= \'bi bi-backspace\'></i>';
let proc1 = 'p1';
let proc2 = 'p2';
let counter = 0;
let displayMain = document.querySelector('#displayMain');

function transformCommands(command){
    switch (command){
        case 'forward':
            return '<i class="bi bi-arrow-up"></i>';
        case 'right':
            return '<i class="bi bi-arrow-90deg-right"></i>';
        case 'left':
            return '<i class="bi bi-arrow-90deg-left"></i>';       
        case 'light':
            return '<i class="bi bi-lightbulb-fill"></i>';
        default:
            return '';        
    }
}

function addMainCommands(command){
    if (command == 'undo' && counter == 0){
        return;
    } 
    else if (command == 'undo'){ 
        commandsToAppear.pop();
        commandsToExecute.pop();
        displayMain.innerHTML = commandsToAppear.join(''); 
        counter--;
    } else if (command == 'reset'){
        commandsToAppear = [];
        commandsToExecute = [];
        counter = 0;
        displayMain.innerHTML = commandsToAppear.join(''); // .join('') adiciona o que estiver no parênteses entre os elementos do vetor, então ele ATUALIZA O VETOR!!!
    } 
    else { 
        commandsToAppear.push(transformCommands(command));
        commandsToExecute.push(command);
        displayMain.innerHTML = commandsToAppear.join(''); 
        counter++;
    }
    console.log(commandsToAppear); 
    console.log(commandsToExecute);
}    

function forward(){
}