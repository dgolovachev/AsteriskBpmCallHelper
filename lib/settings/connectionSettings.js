var asterisk = {
    PORT: 5038,
    HOST: "HOST",
    USER_NAME: "NAME",
    PASSWORD: "PASSWORD"
}

var db = {
    user: "USER",
    password: "PASSWORD",
    server: "SERVER",
    database: "DB",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}

var service = {
    port: 3000,
    token: "!QAZ2wsx3edc"
}

module.exports.Asterisk = asterisk;
module.exports.DB = db;
module.exports.Service = service;