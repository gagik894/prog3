var socket = io();
let water = false
let weath = "winter";
var side = 10;
function setup() {
    createCanvas(50 * side, 50 * side);
    background("pink");
}

socket.on("weather", function (data) {
    weath = data;
    document.getElementById("weather").innerHTML = data;
})
socket.on("water", function (data) {
    water = data;
})

function draw(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[0].length; x++) {
            var obj = matrix[y][x];
            if (obj == 1) {
                if (weath == "summer") {
                    fill("green");
                } else if (weath == "autumn") {
                    fill("#333300");
                } else if (weath == "winter") {
                    fill("white");
                } else if (weath == "spring") {
                    fill("#4dffa6");
                }
            } else if (obj == 2) {
                if (weath == "summer") {
                    fill("yellow");
                } else if (weath == "autumn") {
                    fill("white");
                } else if (weath == "winter") {
                    fill("#81f224");
                } else if (weath == "spring") {
                    fill("orange");
                }
            } else if (obj == 0) {
                if (water == true) {
                    fill("blue")
                } else {
                    fill("grey")
                }
                
            } else if (obj == 3) {
                fill("red")
            }
            else if (obj == 4) {
                fill("black")
            }else if (obj == 5) {
                fill("#fcff96")
            }
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on('send matrix', draw)



function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addMeatEater() {
    socket.emit("add meatEater")
}
function addAllEater() {
    socket.emit("add allEater")
}
function addHunter() {
    socket.emit("add hunter")
}
function addRain() {
    socket.emit("add rain")
}