##数据库语法

### 创建数据库

```
CREATE DATABASE IF NOT EXISTS nodesample CHARACTER SET UTF8;

USE nodesample;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS 'userinfo';

CREATE TABLE 'userinfo' {
  'Id' int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  'UserName' varchar(64) NOT NULL COMMENT '用户名',
  'UserPass' varchar(64) NOT NULL COMMENT '用户密码',
  PRIMARY KEY (`Id`)
} ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';
```