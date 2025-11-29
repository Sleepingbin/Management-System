const express = require('express');
const logger = require('./modules/logger');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// 获取信息
const getInfoRouter = require('./router/api/Info');
app.use(getInfoRouter);

// 获取状态
const getStateRouter = require('./router/api/getState');
app.use(getStateRouter);

// 获取任务书和指导书
const getRequirementRouter = require('./router/api/getRequirement');
app.use(getRequirementRouter);

// 获取成绩
const getScoreRouter = require('./router/api/getScore');
app.use(getScoreRouter);

// 更新成绩
const updateScoreRouter = require('./router/api/updateScore');
app.use(updateScoreRouter);

// 设置论文题目
const setPaperTitleRouter = require('./router/api/setPaperTitle');
app.use(setPaperTitleRouter);

// 修改密码
const changePasswdRouter = require('./router/api/changePasswd');
app.use(changePasswdRouter);

// 获取学生信息
const getStuListRouter = require('./router/api/getStuList');
app.use(getStuListRouter);

// 获取分组情况
const getGroupRouter = require('./router/api/getGroup');
app.use(getGroupRouter);

const uploadFinalRouter = require('./router/api/upload');
app.use(uploadFinalRouter);

// 上传说明书和指导书
const uploadRequirementRouter = require('./router/api/uploadRequirement');
app.use(uploadRequirementRouter);

//获取登录信息
const getLoginRouter = require('./router/api/getLogin');
app.use(getLoginRouter);

//获取下载文件路径
const DownloadRouter = require('./router/api/download');
app.use(DownloadRouter);

// 管理员获取用户信息
const getUserRouter = require('./router/api/getUser');
app.use(getUserRouter);

// 管理员获取所有成绩
const getAllScoreRouter = require('./router/api/getAllScore');
app.use(getAllScoreRouter);

// 更改分组情况
const changeGroupRouter = require('./router/api/changeGroup');
app.use(changeGroupRouter);

app.listen(5174, () => {
  logger.info('服务启动成功, 监听端口 5174');
});
