/*
1/
 На основе событий создать свой логер(logger).
 Который будет регистрировать пользователя со временем посещения и выводит эти данные в консоль.
 Также можно добавить информацию типа (такой то пользователь вошёл и вышел), набросать событий типа logIn, logout, someAction….
 Код произвольный, главное использовать события класса EventEmitter.
 */

//подключаем модули
var Emitter = require('events');
var fs=require('fs');


//Блок работы с датой

var date =new Date();
var month=date.getMonth();
var data=date.getDate()
var hours =date.getHours();
var minutes=date.getMinutes();
var seconds=date.getSeconds();
if(month<10){
    month='0'+ month;
}
if(data<10){
    data='0'+data;
}
if(hours<10){
    hours='0'+hours;
}
if(minutes<10){
    minutes='0'+minutes;
}
if(seconds<10){
    seconds='0'+seconds;
}

    var datenow=date.getFullYear() + '/' +month + '/' + data+ ' ' + hours + ':' + minutes + ':' + seconds;
    //console.log(datenow);

//Конец Блока работы с датой


var emitter = new Emitter();


emitter.on('logIn', function(name){

    var inText=datenow + ' '+'Добро пожаловать!' + ' ' + name + '\n';
    fs.appendFileSync("mylog.txt", inText);
        console.log("Запись файла завершена. Содержимое файла:");
        var inlog = fs.readFileSync("mylog.txt", "utf8");
        console.log(inlog);  // выводим считанные данные
});

emitter.on('work', function(name){

    var someWork=datenow + ' '+'Обрабатываем ваш запрос!' + ' ' + name + '\n';
    fs.appendFileSync("mylog.txt", someWork);
    console.log("Запись файла завершена. Содержимое файла:");
    var worklog= fs.readFileSync("mylog.txt", "utf8");
    console.log(worklog);  // выводим считанные данные
});

emitter.on('logout', function(name){

        var outText=datenow+' '+'Вы нас покинули!' + ' ' + name + '\n';
        fs.appendFileSync("mylog.txt", outText);
        console.log("Запись файла завершена. Содержимое файла:");
        var outlog = fs.readFileSync("mylog.txt", "utf8");
        console.log(outlog );  // выводим считанные данные

});



emitter.emit('logIn', 'Dmitro');
setTimeout(function(){
    emitter.emit('work', 'Dmitro');
}, 5000);
setTimeout(function(){
    emitter.emit('logout', 'Dmitro');
}, 5000);


