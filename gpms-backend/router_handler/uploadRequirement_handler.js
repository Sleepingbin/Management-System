const db = require('../db/index');
const logger = require('../modules/logger');

exports.upload = (req, res) => {
  const { user_id, task, guide } = req.body;

  const query = `update \`group\`
                          set task_doc =?, 
                              guide_doc =?
               where teacher_group_id = (
                 select teacher_group_id from teacher where teacher_id = ?
                 )`;

  db.query(query, [task, guide, user_id], (err, result) => {
    if (err) {
      logger.error(`上传任务书失败: ${err.message}`);
      res.status(200).json({ code: 200500, msg: 'db wrong' });
    } else {
      logger.info(`上传任务书成功`);
      res.status(200).json({ code: 200200, msg: 'success' });
    }
  });
};
