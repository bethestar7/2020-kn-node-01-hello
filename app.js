var express = require('express'); //require() > node에서 모듈을 불러올 때 쓰는 함수(common.js에서 쓰는 문법). 파일명을 안 쓰면 index.js를 찾음
    //경로를 안 쓰면 node_modules 안의 express에서 그 안에 package.json에서 files의 index.js(이게 시작 파일임)를 찾아서 가져옴. 따라서 'express/index.js'라고 써도 됨
var app = express(); //app에 express의 모든 것이 들어가있음 / express 함수 실행 (주로 app이라는 변수에 담는다고 함)
//console.log(app); 브라우저밖에서 도는 거기 떄문에 터미널창에서 실행해서 봄.  터미널창에 node app 치면 볼수있음
var path = require('path'); //path는 node의 내장 모듈(객체)임

app.listen(3000, function(){ //listen이란 메서드는 port를 바라봄. 3000번 포트 릿슨 성공하면 실행해라. 3000번 포트 여는 것임 //서버만듦 //3000번 포트를 노드포트로 만들겠다
    //3000번 포트 열리면 console에 내용 내보내라 (테스트할 때는 보통 3000번을 많이 쓴다고 함) (대부분 중요한 포트는 100번 안에 있고 나머지는 잘 안쓴다고 함 (6만5천 여개 중))
    console.log("http://127.0.0.1:3000"); //127.0.0.1은 내 컴퓨터 주소임 / 포트가 열렸는지 확인하기 위해 콜백함수를 넣어서 콘솔.로그를 넣은 것 / 터미널에 node app을 치면 서버가 돈다
      //서버가 돌고 있어야 위 주소 ctrl 클릭해서 들어갈 수 있음
}); 

//console.log(path.join(__dirname, './public')); node가 지원하는 글로벌 변수 => __dirname  // 터미널에 node app 치면 이 변수로는 현재 app.js의 디렉토리를(절대경로) 볼 수 있음
    //path에는 join이라는 메서드가 있음. 인자들을 합쳐주는 메서드 / 고로 C:\Users\hi.DESKTOP-5DGG9OT\Documents\저녁반\01_hello\2020-kn-node-01-hello 여기에 /public을 붙임

//post방식으로 요청할때의 필수 명령 두 가지 > 이걸 해야 리퀘스트의 바디에 접근 가능함
app.use(express.json()); //post방식으로 요청이 들어오는 request를 json으로 만들어라
app.use(express.urlencoded({extended:false})); //익스텐디드 변수에 false => 요청 들어온 사항을 쿼리스트링으로 바꿔라. 노드가 가진 기본 쿼리(해석체계)로 바꿔라?

app.use('/', express.static(path.join(__dirname, './public'))); //app.use => 미들웨어를 사용함. / 루트로 요청들어온다면 express에서 정적인(Static) 폴더를 지정해서 거기로 보내라
    //index.html이 public폴더 바로 안에 있어야 함 / 그리고 index.html을 수정하면 서버를 다시 접속안해도 바로바로 변경사항이 적용됨 (node에서 한 것과는 다르게. 동적생성이 아니므로. 정적파일이니까)

//get 방식
app.get('/hello', function(req, res, next){ //get메서드. 인자 세 개!(request요청과 관련된 모든 객체, response응답, next다음 미들웨어) //웹페이지 1개 만듦 
    // get방식으로 root로 요청이 들어오면(/) 콜백함수를 실행해라
    res.send('<html><head><title>Hi~</title></head><body><h1>Hello World</h1></body></html>'); //response객체에 send라는 메서드가 있음. ()안 내용을 보냄 
      // 이 시점에서 다시 터미널에 node띄워야 함. 그래야 내용이 보임
}); 

app.get('/bethestar7', function(req, res, next){ //웹페이지 1개 만듦
    res.send('<h1>Hello bethestar7</h1>');
}); 

//10/15
//동적 구현임. 만들어진 걸 보여주는게 아니고 요청받으면 생성해서 보내는 동적 구현..?
app.get('/sample', function(req, res){ // 참고. ${} = <?=?>
    var title ='샘플페이지';
    var content = 'Hello 샘플';
    var html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body>
        <h1>${content}</h1>
    </body>
    </html>
    `;
    /* var title = '안녕하세요';
    var content = 'Hello Sample';
    var html = '<html>';
    html += '<head>';
    html += '<title>'+title+'</title>';
    html += '</head>';
    html += '<body><h1>'+content+'</h1></body>'
    html += '</html>'; */
    res.send(html);
})

//주소체계 참고. https://nodejs.org/dist/latest-v14.x/docs/api/url.html
//1. 쿼리 방식
app.get('/search', function(req, res){
    var q = req.query.q; //요청사항에 있는 쿼리들 중에 q를 받는다 / 주소창에 http://127.0.0.1:3000/search?q=booldook 를 치면 ${q}자리에 booldook이 들어감
    res.send(`<h1>당신이 요청한 쿼리는 ${q}입니다.</h1>`); //res.send가 없으면 계속 새로고침 상태로 계속 돌아감 30초정도간 돌다가 응답하지 않는다고 뜰 것임. 고로 요청이 들어오면 항상 응답해줘야함
});
 
//2. 파라미터 방식 (시멘틱 주소 줄)
app.get('/user/:id', function(req, res){ //:id는 변수명으로 받는다는 뜻 / //안에 있는 걸 라우터라고 함
    var id = req.params.id; //요청사항에 있는 파라미터들 중 id를 받아라 / 주소창에 http://127.0.0.1:3000/user/boram 를 치면 ${id}에 boram이 들어감
    res.send(`<h1>안녕하세요! ${id}님</h1>`);
});

//post 방식
app.post('/join', function(req, res){ //post방식은 헤더,바디 등의 양식이 존재. 그래서 그 양식에 접근해야함. 자바스크립트가 양식에 접근가능하도록 json방식으로 만들어야함
    //값이 text로 들어오는데 이건 json방식이 아니니까.
    var userid = req.body.userid;
    var userpw = req.body.userpw;
    res.send(`<h1>${userid} / ${userpw}</h1>`)
});
