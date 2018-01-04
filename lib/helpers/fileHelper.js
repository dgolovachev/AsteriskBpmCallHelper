function sendFile(fileStream, responseContext, callback) {
    if (!fileStream) throw "fileStream is undefined";
    if (!responseContext) throw "responseContext is undefined";
    if (!callback) throw "callback is undefined";

    fileStream.pipe(responseContext);
    callback(null);

    fileStream.on("error", (error) => { callback(error); });

    responseContext.on("close", () => {
        callback(null);
        fileStream.destroy();
    });
}

module.exports.sendFile = sendFile;