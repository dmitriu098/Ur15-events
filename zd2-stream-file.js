/*
2/
Написать сервер, который на разные url по разному отдает клиенту файлы.
 Например: /stream клиент получает файл в стриме, /file - в обычном режиме.
Усложнить по желанию, например добавить проверку на размер файла, если большой - то stream.....
 */


var http=require('http');
var fs=require('fs');

var mytext='Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.\n ' +
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.\n' +
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.\n' +
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.\n' +
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.\n' +
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.\n' +
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.\n' +
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.\n' +
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.\n' +
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.\n' +
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.\n';


var server= http.createServer(function(req, res){
    if(req.url==='/'){
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write('<h1>Изучение потоков</h1>');
        res.write('<p>Запись текста в файл localhost:3000/text</p>');
        res.write('<p>Прочитаем файл как обычно localhost:3000/file</p>');
        res.write('<p>Прочитаем файл в потоке localhost:3000/stream</p>');
        res.end();
    }

    if(req.url==='/text'){  //записываем информацию в файл
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write('<h1>Запишем информацию в файл</h1>');
        var file = fs.createWriteStream('text.txt');

        for(var i=0; i<=100000; i++){
            file.write(mytext);
        }

        file.end();
        res.end();


    }else if(req.url==='/file'){//читаем файл как обычно
        var read=fs.readFileSync('text.txt', "utf8");
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write('<h1>Прочитаем файл как обычно, не поток</h1>');
        res.write(read);
        res.end();

    }else if(req.url==='/stream') { //читаем файл в потоке

        console.log('privet');
        var readStream=fs.createReadStream('text.txt', 'utf8');
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write('<h1>Прочитаем файл в потоке</h1>');

       readStream.pipe(res);


    }

});


server.listen(3000, function(){
    console.log('сервер запущен');
});
//

