import { User, Gem, Comment } from "../../database/model.js";

const userHandler = {
    sessionCheck: async (req, res) => {
        //when this function is called we simply want to check 
        // if there is a userId on the req.session object, and 
        // send it back if so
        if (req.session.userId) {
            // if you want more info about the user to return, you can just query right now with findByPk();
            // const user = await User.findByPk (req.session.userId)

            res.send({
                message: "user is still logged in",
                success: true,
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
        const { email, password } = req.body

        // see if a user exists in the db with 
        // the provided username
        const user = await User.findOne({
            where: {
                email: email
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

        if (user.password !== password) {
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
    followUser: async (req, res) => {
        const { idToFollow } = req.params;

        const userToFollow = await User.findByPk(idToFollow);
        const user = await User.findByPk(req.session.userId);

        await user.addFriendship(userToFollow);

        if (userToFollow && user) {
            res.send({
                message: `user${req.session.userId} is now following user${idToFollow}`,
                success: true
            });
        } else {
            res.send({
                message: `Failed to follow`,
                success: false
            });
        }
    },
    unfollowUser: async (req, res) => {
        const { idToUnfollow } = req.params;

        const userToUnfollow = await User.findByPk(idToUnfollow);
        const user = await User.findByPk(req.session.userId);

        await user.removeFriendship(userToUnfollow);
        
        if (userToUnfollow && user) {
            res.send({
                message: `user${req.session.userId} unfollowed user${idToUnfollow}`,
                success: true
            });
        } else {
            res.send({
                message: `Failed to unfollow`,
                success: false
            });
        }
    }
}

export default userHandler;