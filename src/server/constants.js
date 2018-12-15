const PORT = 3000;

/** Server responses */
const BASIC_RESPONSES = {
    ERROR: 0,
    SUCCESS: 1,
};

const REDIS_PASSWORD_RESPONSES = {
    LOGIN_ALREADY_EXISTS: 2,
    EMAIL_ALREADY_EXISTS: 3,
    LOGIN_DOES_NOT_EXIST: 4,
    INCORRECT_PASSWORD: 5
};

const REDIS_RESPONSES = {
    ...BASIC_RESPONSES,
    ...REDIS_PASSWORD_RESPONSES
};

const PASSWORD_MANAGER_RESPONSES = {
    ...BASIC_RESPONSES,
    ...REDIS_PASSWORD_RESPONSES
};

module.exports = {
    PORT,
    REDIS_RESPONSES,
    PASSWORD_MANAGER_RESPONSES
};
