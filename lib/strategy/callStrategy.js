function CallStrategy(eventData) {
    if (!eventData) throw "eventData is undefined";

    this.eventData = eventData;
    this.strategy = {};

    return {
        setStrategy: function (strategy) {
            if (!strategy) throw "strategy is undefined";
            this.strategy = strategy;
        },
        execute: function (callback) {
            callback = callback || function () { };
            this.strategy.execute(eventData, callback);
        }
    }
}

module.exports = CallStrategy;


