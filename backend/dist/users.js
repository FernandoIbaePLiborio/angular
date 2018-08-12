"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.email && this.email &&
            another.password == this.password;
    };
    return User;
}());
exports.User = User;
//*importante* tipar variaveis e constantes tipo da chave e tipo do valor 
exports.users = {
    "juliana@gmail.com": new User('Juliana@gmail.com', 'juliana', 'juliana23'),
    "amanda@gmail.com": new User('Amanda@gmail.com', 'Amanda', 'amanda21')
};
