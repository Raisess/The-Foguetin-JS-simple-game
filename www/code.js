window.onload = playerMovement();
window.onload = meteorMovementAndColisions();
window.onload = pointsCountAndTimeEffects();
window.onload = quit();

var player, meteor;
var points, ms;

//movimentos do foguete
function playerMovement(){
    player = {
        model: document.getElementById('player'),
        posX: 0,
        posY: 185,
        posYL: 0,
        posYR: 0,
        posXL: -80,
        posXR: 80
    };

    //!!mover pra esquerda!!
    document.getElementById("left").onclick = ()=>{
        player.model.style.transition = "1s";
        player.model.style.marginLeft = player.posXL+"px";
        player.model.style.transform = "rotate(20deg)";
        player.posY = 0;
        player.posYL = -190;
        player.posYR = 0;
        clicks = 1;
    }

    //!!mover pra direita!!
    document.getElementById("right").onclick = ()=>{
        player.model.style.transition = "1s";
        player.model.style.marginLeft = player.posXR+"px";
        player.model.style.transform = "rotate(-20deg)";
        player.posY = 0;
        player.posYR = 190;
        player.posYL = 0;
    }

    //reset
    /*document.getElementById("left").onmouseup = ()=>{
        document.getElementById("player").style.transition = "2s";
        document.getElementById("player").style.marginLeft = player.posX+"px";
        document.getElementById("player").style.transform = "rotate(0deg)";
        console.log("resetou");
    }*/

    return player;

}

//movimentos do meteoro
function meteorMovementAndColisions(){

    meteor = {
        model: document.getElementById('enemy'),
        posX: 0, //posição horizontal inicial
        posY: 0, //posição vertical inicial
        posYL: 0,
        posYR: 0,
        left: "",
        right: "",
        moving: true
    };
    var velMeteor = 5;
    var interval = setInterval(meteorMovement, velMeteor);

    //apagar dps !!ver zona de colisão do meteoro
    /*document.getElementById("enemy").onclick = () =>{
        document.getElementById("meteor").style.backgroundColor = "green";
    }*/

    //função em loop pelo setintertval !interval
    function meteorMovement(){

        let switchPos = null;

        //!!movendo o meteoro na vertical!!
        if(meteor.moving == true){
            meteor.posY++;
            meteor.model.style.marginLeft = meteor.posX+"px"; //obj horizontal
            meteor.model.style.marginTop = meteor.posY+"px"; //obj vertical
        }

        //ajuste de posição horizontal
            if(meteor.posY == 480){
                switchPos = Math.round(Math.random());
                console.log(switchPos);
            };
            //direita
            if(switchPos == 1 && meteor.posY == 480){
                meteor.posY = 0;
                meteor.posYL = 0; //interfere apenas na colisão
                meteor.posYR = 190; //interfere apenas na colisão
                meteor.posX = 100; //troca posição horizontal para direita
                meteor.left = true; //!!vai para a direita!!
                meteor.right = false; //!!vai para esquerda!!
            }
            //esquerda
            if(switchPos == 0 && meteor.posY == 480){
                meteor.posY = 0;
                meteor.posYR = 0; //interfere apenas na colisão
                meteor.posYL = -190; //interfere apenas na colisão
                meteor.posX = -100; ////troca posição horizontal para esquerda
                meteor.left = false;
                meteor.right = true;
            }
        /*!!sistema de colisão!!*/
        function colisions(){
                
            //centro
            if(meteor.posY == 185 && meteor.posY == player.posY){
                location.replace("game_over.html");
            }
            //direita
            if(meteor.posY == 190 && meteor.posX == 100 && meteor.posYR == player.posYR){
                location.replace("game_over.html");
            }
            //esquerda
            if(meteor.posY == 190 && meteor.posX == -100 && meteor.posYL == player.posYL){
                location.replace("game_over.html");
            }
            //
            return;
        }

        colisions();
        return;
    }

    return enemy;

}

//contador de pontos
function pointsCountAndTimeEffects(){

    points = 0;
    ms = 0;
    let count = true;
    var velPoints = 200;
    var time = setInterval(frame, velPoints);

    function frame(){

        if(count == true){
            ms++;
            points++;
            document.getElementById("pointsNumber").innerHTML = points;
            //console.log(points);
        }
        function timeEffects(){
        
            if(ms == 100){
                document.getElementById("gameScreen").style.backgroundImage = "url('graphics/bg1.png')";
            }
            if(ms == 150){
                document.getElementById("gameScreen").style.backgroundImage = "url('graphics/bg.png')";
                ms = 0;
            }

            return;
        }

        timeEffects();
        return;
    }

    return points;
    return time;
    return msPoints;
}

function quit(){

    document.getElementById("quit").onclick = () =>{
        location.replace('index.html');
    }
}