var users = require("./../settings/usersSettings").users;

function getUserDataByShortNumber(shortNumber) {
    if (!shortNumber) throw "shortNumber is undefined";

    var user, result;
    for (i = 0; i < users.length; i++) {
        var numbers = users[i].numbers;
        result = numbers.filter(number => { return number == shortNumber; })
        if (result[0]) { user = users[i]; break; }
    }

    if (!user) user = users[0];

    return user;
}

module.exports.getUserDataByShortNumber = getUserDataByShortNumber;