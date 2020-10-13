var express = require('express'); //require > node에서 모듈을 불러올 때 쓰는 함수. 파일명을 안 쓰면 index.js를 찾음
var app = express(); //app에 express의 모든 것이 들어가있음

app.listen(3000, function(){ //listen이란 메서드는 port를 바라봄. 3000번 포트 릿슨 성공하면 실행해라. 3000번 포트 여는 것임 //서버만듦
    //3000번 포트 열리면 console에 내용 내보내라
    console.log("http://127.0.0.1:3000"); //127.0.0.1은 내 컴퓨터 주소임
}); 

app.get('/', function(req, res, next){ //get메서드. 매개변수 세 개? //웹페이지 1개 만듦
    res.send('<h1>Hello World</h1>');
}); 

app.get('/bethestar7', function(req, res, next){ //웹페이지 1개 만듦
    res.send('<h1>Hello bethestar7</h1>');
}); 

