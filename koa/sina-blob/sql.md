
## sql常见语法

1.插入值

```
  insert into users(username, `password`, nickname) values ('lisi', '123', '李四')
```

2.更新

```
  update blogs set content = '内容1内容1' where id = 1
```

3.删除

```
  delete from blogs where id = 4
```

4.查询

```
  select username, nickname from blogs where id = 1 order by id desc
```

5.查询条数

```
  select count(id) as `count` from blogs
```