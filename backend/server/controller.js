import { User, Post, Comment, Rating } from "../database/model.js";

const handlerFunctions = {
    getUser: async (req, res) => {
        const { userId } = req.params;

        const user = await User.findByPk(userId);

        if (user) { // checks to see if it found a user in the database with that ID
            res.send({
                message: "Found the user object",
                success: true,
                user
            })
        } else {
            res.send({
                message: "Could not find user",
                success: false
            })
        }
    },

    getFriends: async (req, res) => {
        const { userId } = req.params;
        // add rest of functionality later
    },

    getPost: async (req, res) => {
        const { postId } = req.params;

        const post = await Post.findByPk(postId); 

        if (post) {
            res.send({
                message: "Found post",
                success: true,
                post
            });
        } else {
            res.send({
                message: "Could not find post",
                success: false
            })
        }
    }, 

    getComments: async (req, res) => {
        const { postId } = req.params;

        const comments = await Comment.findAll({
            where: {
                postId: postId
            }
        });

        if (comments) {
            res.send({
                message: "Retrieved comments",
                success: true,
                comments
            });
        } else {
            res.send({
                message: "Failed to retrieve comments",
                success: false
            });
        }
    }, 

    getRatings: async (req, res) => {
        const { postId } = req.params;

        const ratings = await Rating.findAll({
            where: {
                postId: postId
            }
        });

        if (ratings) {
            res.send({
                message: "Retrieved all ratings",
                success: true,
                ratings
            });
        } else {
            res.send({
                message: "Failed to retrieve ratings",
                success: true
            });
        }
    },
    sessionCheck: async (req, res) => {
        //when this function is called we simply want to check 
        // if there is a userId on the req.session object, and 
        // send it back if so
        if (req.session.userId) {
            // if you want more info about the user to return, you can just query right now with findByPk();
            // const user = await User.findByPk (req.session.userId)

            res.send({
                message:"user is still logged in",
                success:true,
                userId: req.session.userId
            })
            return
        } else {
            res.send({
                message: "no user logged in",
                success: false,
            })
        }
    },
    login: async (req, res) => {
        // grab values of 'email'/'password' from body object
        const { email, password} = req.body

        // see if a user exists in the db with 
        // the provided username
        const user = await User.findOne({
            where: {
                email:email
            }
        })

        // need to evaluate if that worked, if not 
        // can already reapond that login failed
        if (!user) {
            res.send({
                message: 'no email found',
                success: false
            })
            return
        }

        // if we're here, then the user was found
        // evaluate if the passwords match

        if(user.password !== password) {
            res.send({
                message: 'password does not match',
                success: false,
            })
            return
        }

        // if we are here the user exists and password was correct
        //so i want to "save" their userId to a 
        // cookie -->req.session
        req.session.userId = user.userId
        // req.session is a cookie saved on the users browsers.
        // so each user that visits our site sends their custom
        // "req" object to us, and therfore, as far as thwir browser knws,
        // they are "logged in"

        //if we are here then all is a success
        // send a response including the userId:

        res.send({
            message: "user logged in",
            success: true,
            userId: req.session.userId
        })
    },

    register: async (req, res) => {
        const { email, password } = req.body;
      
        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({
          where: {
            email: email,
          },
        });
      
        if (existingUser) {
          res.send({
            message: 'User already exists with this email',
            success: false,
          });
          return;
        }
      
        // Create a new user in the database
        const newUser = await User.create({
          email: email,
          password: password,
        });
      
        // Set the user as logged in 
        req.session.userId = newUser.userId;
      
        res.send({
          message: 'User registered and logged in',
          success: true,
          userId: newUser.userId,
        });
      },
      logout: async (req, res) => {
        req.session.destroy()

        res.send({
            message: "user logged out",
            success: true
        })
        return
    },
}

export default handlerFunctions;