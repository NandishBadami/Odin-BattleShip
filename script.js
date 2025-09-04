class Ship {
    constructor(lenght) {
        this.lenght = lenght;
        this.hits = 0;
        this.sunk = this.isSunk();
    }
    hit() {
        this.hits++;
    }
    isSunk() {
        if(this.hits >= this.lenght) return true;
        return false;
    }
}

class Gameboard {
    constructor(boardName) {
        this.boardName = boardName;
        this.board = [];
        for (let i =0; i<8;i++) {
            this.board[i] = [];
            for(let j = 0;j<8;j++) {
                this.board[i][j] = 0;
            }
        }
    }
    addShip(lenght) {
        let ship = new Ship(lenght);
        let x = Math.floor(Math.random() * 8);
        let y = Math.floor(Math.random() * 8);
        let selector;
        if(this.boardName == 'playerBoard') {
            switch(x) {
                case 0: selector = '.a';
                break;
                case 1: selector = '.b';
                break;
                case 2: selector = '.c';
                break;
                case 3: selector = '.d';
                break;
                case 4: selector = '.e';
                break;
                case 5: selector = '.f';
                break;
                case 6: selector = '.g';
                break;
                case 7: selector = '.h';
                break;
            }
            let playerBoard = document.querySelector(selector);
            for(let i=0;i<ship.lenght;i++) {
                if (y<8 && this.board[x][y] != 1) {
                    this.board[x][y] = 1;
                    playerBoard.childNodes[y+1].classList.add("blue");
                    playerBoard.childNodes[y+1].style.backgroundColor = "blue";
                    y++;
                } 
            }
        } else {
            switch(x) {
                case 0: selector = '.A';
                break;
                case 1: selector = '.B';
                break;
                case 2: selector = '.C';
                break;
                case 3: selector = '.D';
                break;
                case 4: selector = '.E';
                break;
                case 5: selector = '.F';
                break;
                case 6: selector = '.G';
                break;
                case 7: selector = '.H';
                break;
            }
            let playerBoard = document.querySelector(selector);
            for(let i=0;i<ship.lenght;i++) {
                if (y<8 && this.board[x][y] != 1) {
                    this.board[x][y] = 1;
                    playerBoard.childNodes[y+1].classList.add("blue");
                } 
            }
        }
    }
}

document.querySelector('button').addEventListener('click', () => {
    location.reload();
});

let board = new Gameboard("playerBoard")
board.addShip(4);
board.addShip(3);
board.addShip(1);
board.addShip(1);
board.addShip(1);
board.addShip(1);
board.addShip(2);
board.addShip(3);

let computerBoard = new Gameboard("computerBoard");
computerBoard.addShip(4);
computerBoard.addShip(3);
computerBoard.addShip(1);
computerBoard.addShip(1);
computerBoard.addShip(1);
computerBoard.addShip(2);
computerBoard.addShip(3);
computerBoard.addShip(1);
computerBoard.addShip(1);
computerBoard.addShip(1);
computerBoard.addShip(1);

let list = [];
let computerList = [];
let won = false;
document.querySelector('.computer').childNodes[3].childNodes.forEach(i => {
    i.childNodes.forEach(e => {
        e.addEventListener('click', () => {
            if(!computerList.includes(e) && !won) {
                computerList.push(e);
                if(e.classList[1]) {
                    e.style.backgroundColor = 'red';
                    e.classList.remove('blue');
                }
                else e.style.backgroundColor = 'yellow';
                let classes = e.className.split('');
                computerBoard.board[classes[0]][classes[1]] = 0;
                let there = false;
                let a;
                for(a=0;a<8;a++) {
                    for(let b=0;b<8;b++) {
                        if(computerBoard.board[a][b] == 1) {
                            there = true;
                            break;
                        }
                    }
                    if(there) break;
                }
                if(a >= 8) {
                    won = true;
                    alert('You won 🥳, Click on New game to start a new game');
                    document.querySelector('.won').textContent = 'Winner 🥳';
                }
                let x = Math.floor(Math.random() * 8);
                let y = Math.floor(Math.random() * 8);
                let node = document.querySelector('.' + String.fromCharCode(97 + x) + y);
                while(true) {
                    if(list.includes(node)){
                        x = Math.floor(Math.random() * 8);
                        y = Math.floor(Math.random() * 8);
                        node = document.querySelector('.' + String.fromCharCode(97 + x) + y);
                    } else {
                        list.push(node);
                        if(node.style.backgroundColor == 'blue') {
                            node.style.backgroundColor = 'red';
                            board.board[x][y] = 0;
                        }
                        else {
                            node.style.backgroundColor = 'yellow';
                        }
                        break;
                    }
                }
                let thereAgain = false;
                let c;
                for(c=0;c<8;c++) {
                    for(let d=0;d<8;d++) {
                        if(board.board[c][d] == 1) {
                            thereAgain = true;
                            break;
                        }
                    }
                    if(thereAgain) break;
                }
                if(c >= 8) {
                    document.querySelector('.computer').childNodes[3].childNodes.forEach(n => {
                        n.childNodes.forEach(d => {
                            if(d.nodeName != '#text' && d.classList[1]) {
                                d.style.backgroundColor = 'blue';
                            }    
                        })
                    });
                    won = true;
                    alert("You loos 💩, computer won, Click on New Game to start a new game");
                    document.querySelector('.won').textContent = 'Looser 💩';
                }
            } 
        });
    });
});