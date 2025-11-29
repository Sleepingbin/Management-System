const db = require('../db/index');
const logger = require('../modules/logger');

exports.get = (req, res) => {
  let { stu_id, type } = req.query;
  if (type !== '学生') {
    logger.error('非学生尝试获取任务书/指导书');
    return res.status(200).json({ code: 200403, msg: '非学生尝试获取任务书/指导书' });
  }

  const query = `SELECT task_doc, guide_doc
                 FROM \`group\` g
                 join stu s on g.stu_group_id = s.stu_group_id
                 WHERE s.stu_id = ?`;

  db.query(query, [stu_id], (err, rows) => {
    if (err) {
      logger.error('查询数据库时出错:', err);
      return res.status(200).json({ code: 200500, msg: '查询数据库时出错' });
    }
    logger.info('获取任务书/指导书成功');
    return res
      .status(200)
      .json({ code: 200200, data: { task: rows[0].task_doc, guide: rows[0].guide_doc } });
  });
};
