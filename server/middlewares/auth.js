const jwt = require("jsonwebtoken");
//verify the authentication for users
const verifyOwner = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["token"];
    console.log("token :" ,token)

    if (!token) {
        return res.status(403).json({
            Type: "error",
            message: "A token is required for authentication",
        });
    }
    try {
        var ownerId;
        const decoded = jwt.verify(
            token,
            process.env.TOKEN_KEY,
            function (err, decodedToken) {

                if (err) {
                    return res.status(401).json({
                        Type: "error",
                        message: "Invalid Token",
                    });
                } else {
                    ownerId = decodedToken.owner_id;
                    req.ownerId = ownerId;
                    return next();

                }
            }
        );
    } catch (err) {
        return res.status(401).json({
            Type: "error",
            message: "Invalid Token",
        });
    }
};

const verifyPlayer = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["token"];
    if (!token) {
        return res.status(403).json({
            Type: "error",
            message: "A token is required for authentication",
        });
    }
    try {
        var ownerId;
        const decoded = jwt.verify(
            token,
            process.env.TOKEN_KEY,
            function (err, decodedToken) {

                if (err) {
                    return res.status(401).json({
                        Type: "error",
                        message: "Invalid Token",
                    });
                } else {
                    console.log("sssssssssssssss")
                    playerId = decodedToken.player_id;
                    req.playerId = playerId;
                    return next();

                }
            }
        );
    } catch (err) {
        return res.status(401).json({
            Type: "error",
            message: "Invalid Token",
        });
    }
};

module.exports = {

    verifyOwner,
    verifyPlayer
};
