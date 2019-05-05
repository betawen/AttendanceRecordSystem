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
| userID | 用户名（id） |
| passwd   | 密码         |
| username     | 真实姓名     |
| studentID     | 学号         |
| roomID |房间号|
| groupID| 组别|

**实例**
```json
{
  "username": "betawen",
  "passwd": "123456",
  "userID": "betawen",
  "groupID": "AI",
  "roomID": "707",
  "studentID": "U200000000"
}
```

### PostRes

```json
{
    "result": true
}
```

