const grid = document.getElementById("grid");

const squares = [];
let playerPosition = 0;
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
            square.push(square);
        }
    }
}
createBoard();

console.log(square);

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




// POSIÇÃO DO JOGADOR E A DIREÇÃO PARA ONDE ELE ESTÁ OLHANDO
const player = {
    row: 0,
    column: 0,
    direction: 0,
};

// FAZER CADA QUADRADO OCUPAR UMA LINHA E UMA COLUNA DEFINIDAS PARA ALTERAR A POSIÇÃO DO JOGADOR
//acho que aqui sera inutilizado pela minha funcao que ja cria ids para cada quadrado
const squares = document.querySelectorAll('.square');

let squarePosition = 0;
let matrix = [];
for (let i = 0; i < 5; i++) {
  matrix[i] = [];
  for (let j = 0; j < 5; j++) {
    matrix[i][j] = squares[squarePosition];
    squarePosition++;
  }
}

matrix[player.row][player.column].innerHTML = '<i class="bi bi-android2"></i>';
function movePlayer(){
    matrix[player.row][player.column].innerHTML = '';
    player.column++;
    matrix[player.row][player.column].innerHTML = '<i class="bi bi-android2"></i>';
}
movePlayer();

//

let commands = [];
let forward = '<i class= \'bi bi-arrow-up\'></i>';
let right = '<i class= \'bi bi-arrow-90deg-right\'></i>';
let left = '<i class= \'bi bi-arrow-90deg-left\'></i>';
let reset = '<i class= \'bi bi-eraser\'></i>';
let undo = '<i class= \'bi bi-backspace\'></i>';
let light = '<i class= \'bi bi-lightbulb-fill\'></i>';
let counter = 0;
let displayMain = document.querySelector('#displayMain');

function addCommands(command){
    if (command == undo && counter == 0){
        return;
    } 
    else if (command == undo){ 
        commands.pop();
        displayMain.innerHTML = commands.join(''); 
        counter--;
    } else if (command == reset){
        commands = [];
        counter = 0;
        displayMain.innerHTML = commands.join(''); // .join('') adiciona o que estiver no parênteses entre os elementos do vetor, então ele ATUALIZA O VETOR!!!
    } 
    else { 
        commands.push(command); 
        displayMain.innerHTML += commands[counter]; 
        counter++;
    }
    console.log(commands); 
}    