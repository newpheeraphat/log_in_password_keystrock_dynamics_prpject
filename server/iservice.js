const UserModel = require("./models/Users");

async function getByUsername(userParam) {
    console.log("Seaching for username...");
    const response = await UserModel.findOne({ username: userParam.username,  password: userParam.password });
    return response;
}

async function create(userParam) {
    console.log("Creating the user information...");
    // validate
    if (await UserModel.findOne({ username: userParam.username })) {
        throw 'Unfortunately,"' + userParam.username + '" username is already taken T.T';
    }

    const user = new UserModel(userParam);

    // save user
    await user.save();
}

module.exports = {
    getByUsername,
    create,
};
