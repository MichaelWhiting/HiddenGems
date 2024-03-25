import { User, Gem, Comment, Rating } from "../database/model.js";

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

    getGem: async (req, res) => {
        const { gemId } = req.params;

        const gem = await Gem.findOne({
            where:{gemId: gemId},
            include: [{model: Comment}, {model: Rating}]
        }); 

        gem.enjoyAvg = Math.round(gem.ratings.map((rating) => rating.enjoyability).reduce((a, c) => a + c, 0) / gem.ratings.length);
        gem.popularAvg = Math.round(gem.ratings.map((rating) => rating.popularity).reduce((a, c) => a + c, 0) / gem.ratings.length);

        if (gem) {
            res.send({
                message: "Found gem",
                success: true,
                gem
            });
        } else {
            res.send({
                message: "Could not find gem",
                success: false
            })
        }
    }, 
    getAllGems: async (req, res) => {
        const gems = await Gem.findAll({
            include: Rating
        }); 

        gems.forEach((gem) => {
            gem.enjoyAvg = Math.round(gem.ratings.map((rating) => rating.enjoyability).reduce((a, c) => a + c, 0) / gem.ratings.length);
            gem.popularAvg = Math.round(gem.ratings.map((rating) => rating.popularity).reduce((a, c) => a + c, 0) / gem.ratings.length);
        })

        if (gems) {
            res.send({
                message: "Found gem",
                success: true,
                gems: gems
            });
        } else {
            res.send({
                message: "Could not find gem",
                success: false
            })
        }
    }, 

    getComments: async (req, res) => {
        const { gemId } = req.params;

        const comments = await Comment.findAll({
            where: {
                gemId: gemId
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

    getRatingsAvg: async (req, res) => {
        console.log("hitting the backend")
        const { gemId } = req.params;

        const ratings = await Rating.findAll({
            where: {
                gemId: gemId
            }
        });

        let enjoyabilityAvg = [];
        let popularityAvg = [];

        ratings.forEach((rating) => {
            enjoyabilityAvg.push(rating.enjoyability);
            popularityAvg.push(rating.popularity);
        });

        enjoyabilityAvg = Math.round(enjoyabilityAvg.reduce((a, c) => a + c, 0)/ enjoyabilityAvg.length);
        popularityAvg = Math.round(popularityAvg.reduce((a, c) => a + c, 0) / popularityAvg.length);

        const averages = { enjoyabilityAvg, popularityAvg }

        if (ratings) {
            res.send({
                message: "Retrieved all ratings",
                success: true,
                averages
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
    createGem: async (req, res) => {
       
            
            // Extract form data from the request body
            const { name, description, imgUrl, lat, lng } = req.body;
            // Create a new record in the database
            const newGem = await Gem.create({
                name,
                description,
                imgUrl,
                lat,
                lng
            });
            console.log(imgUrl, 'lkasdlfkj')

            // Send a success response back to the frontend
            res.send({
                message: "gem created",
                success: true,
                newGem: newGem
            })
        
    },
    createComment: async (req, res) => {

        if (req.session.userId) {
            const { comment } = req.body
            
            const { text, gemId } = comment;
            
            const newComment = await Comment.create({ 
                text,
                gemId,
                userId: req.session.userId
            })
            
            res.send ({
                message: "comment created",
                success:true,
                newComment: newComment
            })
        } else {
            res.send ({
                message: "comment NOT created",
                success: false,
            })
        }
    },
    createRating: async (req, res) => {
        if (req.session.userId) {
            const { enjoyability, popularity, gemId } = req.body

            if (enjoyability) {
                await Rating.create({
                    enjoyability,
                    gemId
                })
                res.send({
                    message: "created rating",
                    success: true
                })
            } else if (popularity) {
                await Rating.create({
                    popularity,
                    gemId
                })
                res.send({
                    message: "created rating",
                    success: true
                })
            } else {
                res.send({
                    message: "failed to create rating",
                    success: false
                })
            }
        }
    },
    getUserInfo: async (req, res) => {

        const userId = req.params.userId; // Assuming userId is received from the request params

        try {
          const user = await User.findOne({
            where: { userId: userId },
            include: [{ model: Gem }, { model: Comment }]
          });
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          return res.status(200).json({ user: user });
        } catch (error) {
          console.error('Error retrieving user:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
    },
}

export default handlerFunctions;