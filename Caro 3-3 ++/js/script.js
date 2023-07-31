
var red = "/images/red.png";
var green = "/images/green.png";
var celebration = "/images/celebration.png";
var A = [];                
A.length = 9;
var dem = 0;
var stop = 0;
var chess;
var mess;
var player;
var turn_img;
var turn_audio;
var win_audio;
var time_audio;
var ftime_audio;
var B = [];            
var plr1_scr = 0;
var plr2_scr = 0;
var t_out = 1;
var t_loop = 0;  
var message;
var outpopup;
var check;

function choose(id){
    turn_audio = document.getElementById("turn-audio");
    win_audio = document.getElementById("win-audio");
    chess = document.getElementById("chess"+id);
    player =  document.getElementById("turn");
    
    if(stop > 0)
        return false;
    else if(A[id] == "r" || A[id] == "g"){
        turn_audio.play();
    }else{
        if(dem % 2 == 0)
            A[id] = "r";
        else    
            A[id] = "g";
        turn_audio.play();
        play();
        B[dem] = id;
        t_out++;
        start();
    }
}

function play(){
    turn_img = document.getElementById("turn-img");
    var draw = 0;

    if(dem % 2 == 0){
        chess.src = red;
        chess.style.opacity = "1";
        turn_img.src = green;
        player.innerHTML = "Player 2 turn";
    }   
    else{
        chess.src = green;
        chess.style.opacity = "1";
        turn_img.src = red;
        player.innerHTML = "Player 1 turn";
    } 
    dem++;
        
    for(var i=0; i <= A.length-1; i++){
        if(A[i] != undefined)
            draw++; 
    }
    if(draw == 9){
        player.innerHTML = "End game!!!"
        turn_img.src = celebration;
        popup(0);
        stop++;
    }
 
    checkwin(0,1,2);
    checkwin(3,4,5);
    checkwin(6,7,8);
    checkwin(0,3,6);
    checkwin(1,4,7);
    checkwin(2,5,8);
    checkwin(0,4,8);
    checkwin(2,4,6);

    function checkwin(x,y,z){
        var plr1 = document.getElementById("plr1");
        var plr2 = document.getElementById("plr2");
        var xbg = document.getElementById(x);
        var ybg = document.getElementById(y);
        var zbg = document.getElementById(z);
        
        if(A[x] == "r" && A[y] == "r" && A[z] == "r"){
            xbg.style.background = "rgb(255, 206, 206)";
            ybg.style.background = "rgb(255, 206, 206)";
            zbg.style.background = "rgb(255, 206, 206)";
            player.innerHTML = "End game!!!"
            player.style.color = "rgb(251, 2, 0)";
            turn_img.src = celebration;
            win_audio.play();
            plr1_scr++;
            plr1.innerHTML = "Player 1: "+plr1_scr;
            popup(1);
            stop++; 
            return false; // dừng chương trình
        }
        else if(A[x] == "g" && A[y] == "g" && A[z] == "g"){
            xbg.style.background = "rgb(206, 255, 208)";
            ybg.style.background = "rgb(206, 255, 208)";
            zbg.style.background = "rgb(206, 255, 208)";
            player.innerHTML = "End game!!!"
            player.style.color = "rgb(1, 210, 0)";
            turn_img.src = celebration;
            win_audio.play();
            plr2_scr++;
            plr2.innerHTML = "Player 2: "+plr2_scr;
            popup(2);
            stop++;
            return false; // dừng chương trình
        }
    }     
}
function back(){
    chess = document.getElementById("chess"+B[dem]);
    player =  document.getElementById("turn");
    turn_img = document.getElementById("turn-img");

    if(stop == 0){
        turn_audio.play();
        t_out++;
        
        chess.src = "";
        A[B[dem]] = undefined;
        dem--;
        if(dem % 2 != 0){
            turn_img.src = green;
            player.innerHTML = "Player 2 turn";
        } else{
            turn_img.src = red;
            player.innerHTML = "Player 1 turn";
        }
        start();
    } 
}
function Playagain(){
    player =  document.getElementById("turn");
    turn_img = document.getElementById("turn-img");
    outpopup = document.getElementById("outpopup");
    var BackBg;
    for(var j=0; j <= A.length-1; j++){
        chess = document.getElementById("chess"+j);
        BackBg = document.getElementById(j);
        BackBg.style.background = "rgba(206, 255, 208, 0)";
        chess.src = "";
        A[j] = undefined;
        B[j] = undefined;
    }
    player.style.color = "rgb(29, 183, 230)";
    dem = 0;
    stop = 0;
    t_out = 1;
    outpopup.style.display = "none";
    check = "none";
    turn_img.src = red;
    player.innerHTML = "Player 1 turn";
    if(t_loop != 0) 
        clearTimeout(timeout);     //dừng tất cả hàm loop đang chạy
    start();
}

function start(){
    var time = document.getElementById("second");
    turn_img = document.getElementById("turn-img");
    time_audio = document.getElementById("time-audio");
    ftime_audio = document.getElementById("Ftime-audio"); 
    var s = document.getElementById("Stime").value;
    parseInt(s);
    var t_out2 = t_out;
        
    if(s == "")
        return false;
    else if(isNaN(s)){
        popup(3);
        stop++;
        return false;
    }
        
    else if(s <= 0){
        popup(4);
        stop++;
        return false;
    }
        
    else {
        loop();
        t_loop++;
    }
    function loop(){
        if(t_out2 < t_out || stop != 0){
            return false;
        }    
        else{     
            time.innerText = s.toString();
        }  
        if(s == 0){          
            if(dem %2 == 0){
                popup(2);
                player.innerHTML = "End game!!!"
                player.style.color = "rgb(1, 210, 0)";
                turn_img.src = celebration;
                ftime_audio.play();
                plr2_scr++;
                plr2.innerHTML = "Player 2: "+plr2_scr;
                stop++;
            }else{
                popup(1);
                player.innerHTML = "End game!!!"
                player.style.color = "rgb(251, 2, 0)";
                turn_img.src = celebration;
                ftime_audio.play();
                plr1_scr++;
                plr1.innerHTML = "Player 1: "+plr1_scr;
                stop++; 
            }
            return false;
        }
        time_audio.play();
        timeout = setTimeout(function(){
            s--;
            loop();
        }, 1000);
    }  
}

function hover(id){
    chess = document.getElementById("chess"+id);

    if(stop != 0 || A[id] == "r" || A[id] == "g")
        return false;
    else if(dem % 2 == 0)
        chess.src = red;
    else
        chess.src = green;  
    chess.style.opacity = "0.5";
}
function leave(id){
    chess = document.getElementById("chess"+id);

    if(A[id] == "r")
        chess.src = red;
    else if( A[id] == "g")
        chess.src = green;
    else
        chess.src ="";
}

function popup(check) {
    message = document.getElementById("message");
    outpopup = document.getElementById("outpopup");

    outpopup.style.display = "contents";
    if(check == 0){
        message.innerHTML = "It Draw!!!";
        message.style.color = "rgb(247, 161, 34)";
    }
    else if(check == 1){
        message.innerHTML = "Player 1 Win!!!";
        message.style.color = "rgb(251, 2, 0)";
    }
    else if(check == 2){
        message.innerHTML = "Player 2 Win!!!";
        message.style.color = "rgb(1, 210, 0)"
    }
    else if(check == 3){
        message.innerHTML = "the time must be number!";
        message.style.color = "rgb(247, 161, 34)";
    }
    else if(check == 4){
        message.innerHTML = "the time must be greater than 0!";
        message.style.color = "rgb(247, 161, 34)";
    }
    


}
function closepopup() {
    outpopup.style.display = "none";
}



