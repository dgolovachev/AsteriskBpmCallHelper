// events
module.exports.Events = {
    AfterEndCall: "Cdr"
}

// direction
module.exports.Direction = {
    Incoming: "from-did-direct",
    IncomingNotWorkTime: "app-blackhole",
    Outgoing: "from-internal"
}

// status
module.exports.Status = {
    NoAswer: "NO ANSWER",
    Busy: "BUSY",
    Answered: "ANSWERED"
}
