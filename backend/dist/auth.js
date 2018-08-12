"use strict";
exports.__esModule = true;
var api_config_1 = require("./api-config");
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
exports.handleAuthentication = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, api_config_1.apiConfig.secret);
        //sub: quem é o portador do token (usuario), iss: quem esta emitindo o token (minha api),
        //password para poder assinar o token (assinatura)
        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    }
    else {
        resp.status(403).json({ message: 'Dados Inválidos.' });
    }
    function isValid(user) {
        if (!user) {
            return false;
        }
        var dbUser = users_1.users[user.email];
        return dbUser !== undefined && dbUser.matches(user);
    }
};
