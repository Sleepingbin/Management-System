const db = require('../db/index');
const logger = require('../modules/logger');

exports.set = (req, res) => {
  let { stu_id, title } = req.body;

  const query = `UPDATE stu
                 SET paper_title = ?
where stu_id = ?`;

  db.query(query, [title, stu_id], (err) => {
    if (err) {
      logger.error('查询数据库时出错:', err);
      return res.status(200).json({ code: 200500, msg: '查询数据库时出错' });
    }
    logger.info(`设置${stu_id}论文题目 ${title} 成功`);
    res.status(200).json({ code: 200200, msg: `设置${stu_id}论文题目 ${title} 成功` });
  });
};
