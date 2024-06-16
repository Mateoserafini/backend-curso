import dotenv from "dotenv";

import program from "../utils.js"; 

const { mode } = program.opts(); 

dotenv.config({
    path: mode ==="produccion" ? "./.env.produccion" : "./.env.desarrollo"
});

const configObject = {
    PORT: process.env.PORT,
    mongoURL: process.env.MONGOURL,
    clientID:process.env.CLIENTID,
    clientSecret:process.env.CLIENTSECRET,
    callbackURL:process.env.CALLBACKURL,
    secret : process.env.SECRETMONGO,
    admin: process.env.ADMIN,
    estado : process.env.estado
};

export default configObject;