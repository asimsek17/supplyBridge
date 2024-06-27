const { RESPONSE_CODES } = require('../constants/response_codes');
const respond = require("./respond");
const decryptToken = require("./decryptToken");
const authService = require('../../services/Auth');

async function authRequired(req, res, next) {
    let token = req.header("Authorization");

    if (!token) {
        return respond(res, {
            status: 401,
            data: {
                code: RESPONSE_CODES.UNAUTHORIZED.CODE,
                message: RESPONSE_CODES.UNAUTHORIZED.MESSAGE,
            },
        });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    try {
        const decryptedToken = decryptToken(token);
        const user = await authService.getUserById(decryptedToken._id);

        if (!user) {
            return respond(res, {
                status: 400,
                data: {
                    code: RESPONSE_CODES.USER_NOT_FOUND.CODE,
                    message: RESPONSE_CODES.USER_NOT_FOUND.MESSAGE,
                },
            });
        }

        req.user = {
            id: user.id,
            organization: user.organization,
            role: user.role,
        };

        next();
    } catch (error) {
        return respond(res, {
            status: 401,
            data: {
                code: RESPONSE_CODES.UNAUTHORIZED.CODE,
                message: RESPONSE_CODES.UNAUTHORIZED.MESSAGE,
            },
        });
    }
}

module.exports = authRequired;
