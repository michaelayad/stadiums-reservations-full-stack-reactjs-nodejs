var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const { playerModel } = require('../models/index')


const signup = async (body) => {
    console.log(body)
    const isEmailTaken = await playerModel.findOne({ where: { email: body.email } });;
    //  Check if the email already taken
    if (isEmailTaken) {
        return {
            type: "Error",
            message: "email already taken",
            statusCode: 409,
        };
    }
    const isTelTaken = await playerModel.findOne({ where: { tel: body.tel } });;
    //  Check if the tel already taken
    if (isTelTaken) {
        return {
            type: "Error",
            message: "tel already taken",
            statusCode: 409,
        };
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    body.password = hashedPassword

    //  Create new owner account
    const player = await playerModel.create(body);

    //  Generate tokens (access token & refresh token)
    const token = await jwt.sign(
        { player_id: player.id },
        process.env.TOKEN_KEY,
        {
            expiresIn: "60 days",
        }
    );

    //  Remove the password from the output
    player.password = undefined;

    // 12) If everything is OK, send user data
    return {
        type: "Success",
        statusCode: 201,
        message: "successfulSignUp",
        player,
        token,
    };
};
// ////////////////////////////////////////
// ////////////////////////////////////////
const login = async (body) => {
    var { email, password } = body;

    //check all fields
    if (!email || !password) {
        return {
            type: "Error",
            message: "fieldsRequired",
            statusCode: 400,
        };
    }

    const isEmailFound = await playerModel.findOne({ where: { email: email } });

    //  Check if the email not found
    if (!isEmailFound) {
        return {
            type: "Error",
            message: "invalid email or password",
            statusCode: 409,
        };
    }

    const player = await playerModel.findOne({ where: { email: email } })
    var validpass = bcrypt.compareSync(password, player.password);

    //check password is match

    if (!validpass) {
        return {
            type: "Error",
            message: "invalid email or password",
            statusCode: 409,
        };
    }

    //  Generate tokens (access token & refresh token)
    const token = await jwt.sign(
        { player_id: player.id },
        process.env.TOKEN_KEY,
        {
            expiresIn: "60 days",
        }
    );

    //  Remove the password from the output
    player.password = undefined;

    // 12) If everything is OK, send user data
    return {
        type: "Success",
        statusCode: 201,
        message: "successful LogIN",
        player,
        token,
    };
};

// ///////////////////////////////////////
// ///////////////////////////////////////

const getPlayerDetails = async (playerId) => {
    try {
        const player = await playerModel.findByPk(playerId);
        console.log(playerId)
        player.password = undefined;
        return {
            type: "Success",
            statusCode: 201,
            message: "successful getting player",
            player,

        };
    }
    catch (err) {
        return {
            type: "Error",
            message: `Unauthorized player ,${err}`,
            statusCode: 401,
        };


    }

}

module.exports = { signup, login, getPlayerDetails };
