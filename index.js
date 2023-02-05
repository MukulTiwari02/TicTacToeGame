const turnName = document.querySelector(".name-turn,.result");
const audioTurn = new Audio("./src/ting.mp3");
const winMusic = new Audio("./src/gameover.mp3");
const bgm = new Audio("");
bgm.loop=true;
var player1="PLAYER 1 (O)"
var player2="PLAYER 2 (X)"
let won=false;



const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e =>{
        let x=e.pageX;
        let y=e.pageY;

        cursor.style.top=y-20+"px";
        cursor.style.left=x-20+"px";

})

document.addEventListener("click", () =>{
    cursor.classList.add("expand");

    setTimeout(()=>{
        cursor.classList.remove("expand");
    },300);
})




const squares = document.querySelectorAll(".content-box");

var turn=player1;

for(let i=0;i<squares.length;i++)
{
    squares[i].addEventListener("click", takeTurn,true);
}

const checkDraw = () => {
    let count=0;
    for(let i=0;i<9;i++)
    {
        if(squares[i].textContent!='')
            count++;
    }
    if(count==9)
    {
        turnName.textContent="GAME DRAW";
        bgm.pause();
    }
}

const checkWin = () => {
    const winCombo = [[0,1,2],
                  [0,3,6],
                  [0,4,8],
                  [1,4,7],
                  [6,7,8],
                  [2,5,8],
                  [2,4,6],
                  [3,4,5],]
                  
                
                  winCombo.forEach(e => {
                    if(squares[e[0]].textContent==squares[e[1]].textContent && squares[e[1]].textContent==squares[e[2]].textContent && squares[e[0]].textContent!="")
                    {
                        if(turn==player1)
                            turn=player2;
                            else turn = player1;
                        turnName.textContent=turn + " WON";
                        won=true;

                        document.getElementById("win-gif").style.width="120px"

                        bgm.pause();
                        winMusic.play();

                        

                        for(let i=0;i<squares.length;i++)
                        {
                            squares[i].removeEventListener("click", takeTurn,true);
                        }
                    }

                    if(!won)
                        checkDraw();
                  })
}



function reset(){
    for(let i=0;i<squares.length;i++)
    {
        squares[i].textContent="";
        squares[i].addEventListener("click", takeTurn,true);
    }
    turn=player1;
    turnName.textContent=player1 + "'s TURN";
    document.getElementById("win-gif").style.width="0"
    bgm.play();
}

function takeTurn()
{
    audioTurn.play();
    if(turn==player1)
    {
        this.textContent = 'O';
        turn=player2;
        turnName.textContent=player2+"'s TURN";
    }
        
    else 
    {
        this.textContent = "X";
        turn=player1;
        turnName.textContent=player1 + "'s TURN";
    }

    checkWin();

    this.removeEventListener("click",takeTurn,true);
    

}