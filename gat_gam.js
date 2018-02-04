var turno = 0;
var fin = false;
var tiros = 0;
var nameP1 = "P1";
var nameP2 = "P2";
var player1 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
var player2 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

function cambio() {
    turno = (turno == 0) ? 1 : 0;
}

function build_game() {
    var n = prompt("Nombre Jugador 1", "P1");
    if (n != null) {
        nameP1 = n;
    }
    n = prompt("Nombre Jugador 2", "P2");
    if (n != null) {
        nameP2 = n;
    }
    document.getElementById("turno").innerHTML = "Tira: " + nameP1;
    var table = document.getElementById("tabla");
    document.getElementById("tabla").innerHTML = "";
    var rows = [];
    var cols = [];
    for (var i = 0; i < 3; i++) {
        rows[i] = table.insertRow(i);
        for (var j = 0; j < 3; j++) {
            cols[j] = rows[i].insertCell(j);
            cols[j].style.background = "#0A568B";
            cols[j].style.color = "#FFFFFF";
            cols[j].style.textAlign = "center";
            cols[j].id = i + "_" + j; 
            cols[j].width = 15;
            cols[j].height = 130;
            cols[j].style.fontSize = "70px";
            cols[j].innerHTML = "";
            cols[j].borderRadius = "20px";
            cols[j].style.textShadow = "5px 5px 8px #000000";
            cols[j].onmouseover = function() {
                this.style.background = "#0086C5";
                this.style.transform = 'scale(0.98)';
                this.style.filter = "saturate(120%)";
            }
            cols[j].onmouseout = function() {
                this.style.background = "#0A568B";
                this.style.transform = 'scale(1)';
            }
            cols[j].onclick = function() {
                var x = new Number(this.id.split("_")[0]);
                var y = new Number(this.id.split("_")[1]);
                var text = this.textContent;
                if (text.length == 0) {
                    tiros++;
                    if (turno == 0) { 
                        player1[x][y] = 1;
                        this.innerHTML = "O";
                        document.getElementById("turno").innerHTML = "Tira: " + nameP2;
                    } else { 
                        player2[x][y] = 1;
                        this.innerHTML = "X";
                        document.getElementById("turno").innerHTML = "Tira: " + nameP1;
                    }
                    if (fin != true) {
                        play(this.id);
                    } else {
                        confirm("Fin del Juego");
                    }
                }
                if (tiros >= 9) {
                    if (fin == false) {

                      
                        confirm("EMPATE");
                    }
                }
            }
        }
    }

}

function play(id) {
    if (turno == 0) {
        if (comp(player1)) {
            fin = true;
            alert("Gana " + nameP1);
        }
    } else {
        if (comp(player2)) {
            fin = true;
            alert("Gana " + nameP2);
        }
    }
    cambio();
}

function comp(mat) {
    var res = false;
    var pos = [
        [0, 2, 1, 2, 2, 2],
        [0, 0, 0, 1, 0, 2],
        [0, 0, 1, 1, 2, 2],
        [0, 0, 1, 0, 2, 0],
        [0, 1, 1, 1, 2, 1],
        [1, 0, 1, 1, 1, 2],
        [2, 0, 2, 1, 2, 2],
        [2, 0, 1, 1, 0, 2]
    ];
    for (var t = 0; t < 8; t++) {
        var c = 0;
        for (var i = 0; i < 6; i += 2) {
            if (mat[pos[t][i]][pos[t][i + 1]] == 1) {
                res = true;
                c++;
            } else {
                res = false;
                break;
            }
        }
        if (res && c == 3) {
            break;
        }
    }
    return res;
}
window.onload = build_game;
