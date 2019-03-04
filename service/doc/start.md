# start

## login

```http
[GET] /attendance/login?username="username"
```

| 字段       | 说明       |
| ---------- | ---------- |
| [username] | 用户名(id) |
| 密码       | Md5        |

## register

```http
[POST] /attendance/rigister
```

| 字段     | 说明         |
| -------- | ------------ |
| username | 用户名（id） |
| passwd   | 密码         |
| name     | 真实姓名     |
| 学号     | 学号         |

