import passport from "passport";
import local from "passport-local";
import UsuarioModel from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import GitHubStrategy from "passport-github2";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        try {
          //Verificamos si ya existe un registro con ese email:
          let usuario = await UsuarioModel.findOne({ email });

          if (usuario) {
            return done(null, false);
          }
          const passwordHash = await bcrypt.hash(password, 10);
          //Si no existe voy a crear un registro de usuario nuevo:

          let nuevoUsuario = {
            first_name,
            last_name,
            email,
            age,
            password: passwordHash,
          };

          let resultado = await UsuarioModel.create(nuevoUsuario);
          return done(null, resultado);
          //Si todo resulta bien, podemos mandar done con el usuario generado.
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //Agregamos otra estrategia para el "Login".
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const userFound = await UsuarioModel.findOne({ email });

          if (userFound) {
            const isMatch = await bcrypt.compare(password, userFound.password);

            if (isMatch) {
              return done(null, userFound);
            } else {
              return done(null, false);
            }
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //Serializar y deserializar:

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UsuarioModel.findById({ _id: id });
    done(null, user);
  });
};

passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: "Iv23lio4myBKlTyBREyQ",
      clientSecret: "c1ff08a42cd5ca801e007e076be036cfe5344c4e",
      callbackURL: "http://localhost:8080/api/sessions/githubcallback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Profile:", profile);

      try {
        let usuario = await UsuarioModel.findOne({
          email: profile._json.email,
        });

        if (!usuario) {
          let nuevoUsuario = {
            first_name: profile._json.name,
            last_name: "",
            age: 36,
            email: profile._json.email,
            password: "messi",
          };

          let resultado = await UsuarioModel.create(nuevoUsuario);
          done(null, resultado);
        } else {
          done(null, usuario);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default initializePassport;
