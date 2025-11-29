const db = require('../db/index');
const logger = require('../modules/logger');

exports.get = (req, res) => {
  let { user_id } = req.query;

  // 验证是否为管理员的SQL语句
  const authQuery = `
        SELECT type
        FROM user
        WHERE user_id = ?;
    `;

  // 执行鉴权查询
  db.query(authQuery, [user_id], (err, authResult) => {
    if (err) {
      logger.error('查询数据库时出错:', err);
      return res.status(200).json({ code: 200500, msg: '查询数据库时出错' });
    }

    // 检查是否为管理员
    if (authResult.length === 0 || authResult[0].type !== '管理员') {
      logger.error('非管理员尝试获取学生信息');
      return res.status(200).json({ code: 200403, msg: '权限不足' });
    }
    const query = `SELECT u.user_id, u.name,s.stu_group_id
                   FROM stu s
                   join user u on s.stu_id = u.user_id
                    where u.type='学生'
    `;

    db.query(query, [], (err, rows) => {
      if (err) {
        logger.error('查询数据库时出错:', err);
        return res.status(500).send('查询数据库时出错');
      }
      logger.info('获取小组信息成功');
      res.status(200).json(rows);
    });
  });
};
exports.update = (req, res) => {
  let { user_id, stu_id, stu_group_id } = req.body;
  // 验证是否为管理员的SQL语句
  const authQuery = `
        SELECT type
        FROM user
        WHERE user_id = ?;
    `;
  // 执行鉴权查询
  db.query(authQuery, [user_id], (err, authResult) => {
    if (err) {
      logger.error('查询数据库时出错:', err);
      return res.status(200).json({ code: 200500, msg: '查询数据库时出错' });
    }

    // 检查是否为管理员
    if (authResult.length === 0 || authResult[0].type !== '管理员') {
      logger.error('非管理员尝试获取学生信息');
      return res.status(200).json({ code: 200403, msg: '权限不足' });
    }
    const query = `update stu set stu.stu_group_id=? where stu_id=? 
    `;

    db.query(query, [stu_group_id, stu_id], (err, rows) => {
      if (err) {
        logger.error('查询数据库时出错:', err);
        return res.status(500).send('查询数据库时出错');
      }
      logger.info('修改小组信息成功');
      res.status(200).json(rows);
    });
  });
};
