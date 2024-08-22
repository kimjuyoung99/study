const express = require("express");
const app = express();


//전역에 있는 모든 요청 요소에 다 쓴다~ 는 뜻
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));


//server.js 파일에서 EJS를 사용하고 있는지 확인하는 코드!
// app.set("view engine", "ejs");

app.get("/", function (req, res) {
	//우리가 만든 index.html로 연동된다. 새로고침하면 html 파일로 보임
	res.sendFile(__dirname + "/index.html");
});

app.get("/test", (req, res) => {
	res.send("테스트페이지입니다.");
});

app.listen(3000, () => {
	console.log("서버 실행중...");
});
