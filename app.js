const express = require('express'); // express 사용 
const morgan = require('morgan'); // 요청과 응답에 대한 로그 
const path = require('path'); // 파일 경로 조작 모듈 
const nunjucks = require('nunjucks'); // 템플릿 엔진 (js -> html)
const dotenv = require('dotenv');

dotenv.config();
const pageRouter = require('./routes/page');
const postRouter = require('./routes/post');
const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 8282);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', pageRouter);
app.use('/post', postRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// app.use((err, req, res, next) => {
//     res.locals.message = err.message;
//     res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
//     res.status(err.status || 500);
//     res.render('error');
// });

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});