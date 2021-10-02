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

grassArr = [];
grassEaterArr = [];
meatEaterArr = [];
allEaterArr = [];
matrix = [];

var n = 50;

weath = "winter";
Grass = require("./Grass")
GrassEater = require("./GrassEater")
MeatEater = require("./MeatEater")
AllEater = require("./AllEater")
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 3))
        
    }  
}

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
            }else if (matrix[y][x] == 3){
                matrix[y][x] = 3
                meatEaterArr.push(new MeatEater(x, y, 3))
            }else if (matrix[y][x] == 4){
                matrix[y][x] = 4
                meatEaterArr.push(new AllEater(x, y, 4))
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
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)


function kill() {
    grassArr = [];
    grassEaterArr = []
    meatEaterArr = []
    allEaterArr = []
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

///new



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
});


var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
    })
},1000)