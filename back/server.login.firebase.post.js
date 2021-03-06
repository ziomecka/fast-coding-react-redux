const redis = require('./Redis/');
const authorizeGoogle = require('./PasswordManager/authorize.google');
const {
    REDIS_RESPONSES: {
        SUCCESS,
        ERROR,
    },
} = require('./constants');

module.exports = async (req, res) => {
    const { email, displayName, authorizationMethod, refreshToken } = req.body;

    if ( !email || !displayName || !authorizationMethod || !refreshToken ) {
        res.json( {
            error: 'Email, displayName, authorizationMethod and refreshToken cannot be empty',
            authorized: false
        } );
    }

    Object.assign( req.session, {
        email,
        displayName,
        authorizationMethod,
        refreshToken,
    });

    try {
        let googleAnswer = await authorizeGoogle( refreshToken );

        if ( googleAnswer ) {
            req.session.authorized = true;
            console.log(`Email: ${ email } authorized with Google`);

            let answer = await redis.storeFirebaseUser({ email });
            const { login, result, err } = answer;

            if ( result === SUCCESS ) {
                req.session.login = login;

                res.json( { result, login, authorized: true } );
            }

            if ( result === ERROR ) {
                res.json( { error: err.message || err.toString(), authorized: true } );
            }

            answer = null;

        } else {
            req.session.authorized = false;
            res.json( { authorized: false } );
        }

    } catch ( err ) {
        console.log(`Login firebase error: ${ err.message || err.toString() }`);
        req.session.authorized = false;
        res.json({ error: err.message || err.toString(), authorized: false });
    }
};