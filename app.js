var fs = require("fs");
var config = require("./lib/settings/connectionSettings");
var asretiskTools = require("./lib/asteriskTools");
var fileHelper = require("./lib/helpers/fileHelper");
var ami = new require('asterisk-manager')(config.Asterisk.PORT, config.Asterisk.HOST, config.Asterisk.USER_NAME, config.Asterisk.PASSWORD, true);
var logger = require("./lib/logger");
var app = require("express")();

ami.keepConnected();

ami.on("managerevent", (eventData) => {
    try {
        asretiskTools(eventData);
    } catch (err) {
        logger.error(err);
    }
});

app.get("/", (request, response) => { response.json({ description: "asterisk-bpm service" }); });

app.get("/log/:token", (request, response) => {
    var token = request.params.token;
    if (!token) response.json({ error: "token is undefined" });
    else if (token != config.Service.token) response.json({ error: "token error" });
    else {
        var file = fs.ReadStream("./log.log");
        fileHelper.sendFile(file, response, (err) => {
            if (err) logger.error(err)
        });
    }
});

app.listen(config.Service.port, () => {
    logger.info("service start on port: " + config.Service.port);
});
