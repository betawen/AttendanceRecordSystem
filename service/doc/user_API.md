# start

## login

```http
[POST] /attendance/login
```

### PostBody

| 字段       | 说明       |
| ---------- | ---------- |
| username | 用户名(id) |
| passwd       | Md5        |

## register

```http
[POST] /attendance/user/rigister
```

### PostBody

| 字段     | 说明         |
| -------- | ------------ |
| user_id | 用户名（id） |
| passwd   | 密码         |
| username     | 真实姓名     |
| student_id     | 学号         |
| room_id |房间号|
| group_id| 组别|

**实例**
```json
{
  "username": "betawen",
  "passwd": "123456",
  "user_id": "betawen",
  "group_id": "AI",
  "room_id": "707",
  "student_id": "U200000000"
}
```

### PostRes

```json
{
    "result": true
}
```

