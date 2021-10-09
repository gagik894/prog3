var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
water = false
grassArr = [];
grassEaterArr = [];
meatEaterArr = [];
allEaterArr = [];
hunterArr = [];
matrix = [];

var n = 50;

weath = "winter";
Grass = require("./Modules/Grass")
GrassEater = require("./Modules/GrassEater")
MeatEater = require("./Modules/MeatEater")
AllEater = require("./Modules/AllEater")
Hunter = require("./Modules/Hunter")
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = 0

    }
}
function matrixGen(matSz, gr, grEat, mtEat, allEat, hunt) {
    for (let y = 0; y < matSz; y++) {
        matrix[y] = [];
        for (let x = 0; x < matSz; x++) {
            matrix[y][x] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let y = Math.floor(Math.random() * matSz);
        var x = Math.floor(Math.random() * matSz);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let y = Math.floor(Math.random() * matSz);
        var x = Math.floor(Math.random() * matSz);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < mtEat; i++) {
        let y = Math.floor(Math.random() * matSz);
        var x = Math.floor(Math.random() * matSz);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < allEat; i++) {
        let y = Math.floor(Math.random() * matSz);
        var x = Math.floor(Math.random() * matSz);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    for (let i = 0; i < hunt; i++) {
        let y = Math.floor(Math.random() * matSz);
        var x = Math.floor(Math.random() * matSz);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }
}

matrixGen(50, 1600, 650, 250, 10, 100)
io.sockets.emit("send matrix", matrix)



function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1
                grassArr.push(new Grass(x, y, 1))
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = 2
                grassEaterArr.push(new GrassEater(x, y, 2))
            } else if (matrix[y][x] == 3) {
                matrix[y][x] = 3
                meatEaterArr.push(new MeatEater(x, y, 3))
            } else if (matrix[y][x] == 4) {
                matrix[y][x] = 4
                allEaterArr.push(new AllEater(x, y, 4))
            }else if (matrix[y][x] == 5) {
                matrix[y][x] = 5
                hunterArr.push(new Hunter(x, y, 5))
            };
        }
    }
    io.sockets.emit('send matrix', matrix)
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in meatEaterArr) {
        meatEaterArr[i].eat();
    }
    for (var i in allEaterArr) {
        allEaterArr[i].eat();
    }
    for (var i in hunterArr) {
        hunterArr[i].eat();
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)


function kill() {
    grassArr = [];
    grassEaterArr = []
    meatEaterArr = []
    allEaterArr = []
    hunterArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 1000; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 400; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addMeatEater() {
    for (var i = 0; i < 90; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            meatEaterArr.push(new MeatEater(x, y, 3))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addAllEater() {
    for (var i = 0; i < 4; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            meatEaterArr.push(new AllEater(x, y, 4))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addHunter() {
    for (var i = 0; i < 15; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            hunterArr.push(new AllEater(x, y, 5))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addRain() {
    io.sockets.emit('water', true)
    for (let i in grassArr) {
        grassArr[i].mul();
    }
    setTimeout(function () { io.sockets.emit('water', false) }, 500);
}



function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


////

io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add meatEater", addMeatEater)
    socket.on("add allEater", addAllEater)
    socket.on("add hunter", addHunter)
    socket.on("add rain", addRain)
});


var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.meatEater = meatEaterArr.length;
    statistics.allEater = allEaterArr.length;
    statistics.hunter = hunterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)