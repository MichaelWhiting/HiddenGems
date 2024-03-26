import { User, Gem, Comment, Rating } from "../database/model.js";

const handlerFunctions = {
  getUser: async (req, res) => {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (user) {
      // checks to see if it found a user in the database with that ID
      res.send({
        message: "Found the user object",
        success: true,
        user,
      });
    } else {
      res.send({
        message: "Could not find user",
        success: false,
      });
    }
  },

  getFriends: async (req, res) => {
    const { userId } = req.params;
    // add rest of functionality later
  },

  getGem: async (req, res) => {
    const { gemId } = req.params;

    const gem = await Gem.findOne({
      where: { gemId: gemId },
      include: [{ model: Comment }, { model: Rating }],
    });

    const enjoyRatings = gem.ratings
      .map((rating) => rating.enjoyability)
      .filter((item) => item !== null);
    const popularRatings = gem.ratings
      .map((rating) => rating.popularity)
      .filter((item) => item !== null);

    gem.enjoyAvg = Math.round(
      enjoyRatings.reduce((a, c) => a + c, 0) / enjoyRatings.length
    );
    gem.popularAvg = Math.round(
      popularRatings.reduce((a, c) => a + c, 0) / popularRatings.length
    );

    if (gem) {
      res.send({
        message: "Found gem",
        success: true,
        gem,
      });
    } else {
      res.send({
        message: "Could not find gem",
        success: false,
      });
    }
  },
  getAllGems: async (req, res) => {
    const gems = await Gem.findAll({
      include: Rating,
    });

    gems.forEach((gem) => {
      const enjoyRatings = gem.ratings
        .map((rating) => rating.enjoyability)
        .filter((item) => item !== null);
      const popularRatings = gem.ratings
        .map((rating) => rating.popularity)
        .filter((item) => item !== null);

      gem.enjoyAvg = Math.round(
        enjoyRatings.reduce((a, c) => a + c, 0) / enjoyRatings.length
      );
      gem.popularAvg = Math.round(
        popularRatings.reduce((a, c) => a + c, 0) / popularRatings.length
      );
    });

    if (gems) {
      res.send({
        message: "Found gem",
        success: true,
        gems: gems,
      });
    } else {
      res.send({
        message: "Could not find gem",
        success: false,
      });
    }
  },

  getComments: async (req, res) => {
    const { gemId } = req.params;

    const comments = await Comment.findAll({
      where: {
        gemId: gemId,
      },
    });

    if (comments) {
      res.send({
        message: "Retrieved comments",
        success: true,
        comments,
      });
    } else {
      res.send({
        message: "Failed to retrieve comments",
        success: false,
      });
    }
  },

  getRatingsAvg: async (req, res) => {
    console.log("hitting the backend");
    const { gemId } = req.params;

    const ratings = await Rating.findAll({
      where: {
        gemId: gemId,
      },
    });

    let enjoyabilityAvg = [];
    let popularityAvg = [];

    ratings.forEach((rating) => {
      enjoyabilityAvg.push(rating.enjoyability);
      popularityAvg.push(rating.popularity);
    });

    enjoyabilityAvg = Math.round(
      enjoyabilityAvg.reduce((a, c) => a + c, 0) / enjoyabilityAvg.length
    );
    popularityAvg = Math.round(
      popularityAvg.reduce((a, c) => a + c, 0) / popularityAvg.length
    );

    const averages = { enjoyabilityAvg, popularityAvg };

    if (ratings) {
      res.send({
        message: "Retrieved all ratings",
        success: true,
        averages,
      });
    } else {
      res.send({
        message: "Failed to retrieve ratings",
        success: true,
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
        message: "user is still logged in",
        success: true,
        userId: req.session.userId,
      });
      return;
    } else {
      res.send({
        message: "no user logged in",
        success: false,
      });
    }
  },
  login: async (req, res) => {
    // grab values of 'email'/'password' from body object
    const { email, password } = req.body;

    // see if a user exists in the db with
    // the provided username
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    // need to evaluate if that worked, if not
    // can already reapond that login failed
    if (!user) {
      res.send({
        message: "no email found",
        success: false,
      });
      return;
    }

    // if we're here, then the user was found
    // evaluate if the passwords match

    if (user.password !== password) {
      res.send({
        message: "password does not match",
        success: false,
      });
      return;
    }

    // if we are here the user exists and password was correct
    //so i want to "save" their userId to a
    // cookie -->req.session
    req.session.userId = user.userId;
    // req.session is a cookie saved on the users browsers.
    // so each user that visits our site sends their custom
    // "req" object to us, and therfore, as far as thwir browser knws,
    // they are "logged in"

    //if we are here then all is a success
    // send a response including the userId:

    res.send({
      message: "user logged in",
      success: true,
      userId: req.session.userId,
    });
  },
  register: async (req, res) => {
    const { email, password, firstName, lastName } = req.body; // Extract firstName and lastName from req.body

    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      res.send({
        message: "User already exists with this email",
        success: false,
      });
      return;
    }

    // Create a new user in the database
    const newUser = await User.create({
      firstName: firstName, // Assign firstName from req.body
      lastName: lastName, // Assign lastName from req.body
      email: email,
      password: password,
    });

    // Set the user as logged in
    req.session.userId = newUser.userId;

    res.send({
      message: "User registered and logged in",
      success: true,
      userId: newUser.userId,
    });
  },

  logout: async (req, res) => {
    req.session.destroy();

    res.send({
      message: "user logged out",
      success: true,
    });
    return;
  },
  createGem: async (req, res) => {
    const { name, description, imgUrl, lat, lng } = req.body;
    // Create a new record in the database
    const newGem = await Gem.create({
      name,
      description,
      imgUrl,
      lat,
      lng,
      userId: req.session.userId,
    });
    console.log(imgUrl, "lkasdlfkj");

    // Send a success response back to the frontend
    res.send({
      message: "gem created",
      success: true,
      newGem: newGem,
    });
  },
  createComment: async (req, res) => {
    if (req.session.userId) {
      const { comment } = req.body;

      const { text, gemId } = comment;

      const newComment = await Comment.create({
        text,
        gemId,
        userId: req.session.userId,
      });

      res.send({
        message: "comment created",
        success: true,
        newComment: newComment,
      });
    } else {
      res.send({
        message: "comment NOT created",
        success: false,
      });
    }
  },
  createRating: async (req, res) => {
    if (req.session.userId) {
      const { enjoyability, popularity, gemId } = req.body;

      if (enjoyability) {
        await Rating.create({
          enjoyability,
          gemId,
        });
        res.send({
          message: "Created enjoyability rating",
          success: true,
        });
        return;
      } else if (popularity) {
        await Rating.create({
          popularity,
          gemId,
        });
        res.send({
          message: "Created populatiry rating",
          success: true,
        });
        return;
      } else {
        res.send({
            message: "user logged out",
            success: true
        })
        return
    },
    createGem: async (req, res) => {
       
            
            const { name, description, imgUrl, lat, lng } = req.body;
            // Create a new record in the database
            const newGem = await Gem.create({
                name,
                description,
                imgUrl,
                lat,
                lng,
                userId: req.session.userId,
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
                    message: "Created enjoyability rating",
                    success: true
                })
                return;
            } else if (popularity) {
                await Rating.create({
                    popularity,
                    gemId
                })
                res.send({
                    message: "Created populatiry rating",
                    success: true
                })
                return;
            } else {
                res.send({
                    message: "failed to create rating",
                    success: false
                })
                return;
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
    updateGem: async (req, res) => {
        const { gemId } = req.params;
        const { name, description, imgUrl, lat, lng } = req.body;

        try {
            // Check if the user is authenticated
            if (!req.session.userId) {
                return res.status(401).json({ message: "Unauthorized: User not logged in" });
            }
    
            // Find the gem by ID
            const gem = await Gem.findByPk(gemId);
    
            // Check if the gem exists
            if (!gem) {
                return res.status(404).json({ message: "Gem not found" });
            }
    
            // Check if the gem belongs to the logged-in user
            if (gem.userId !== req.session.userId) {
                return res.status(403).json({ message: "Forbidden: You are not authorized to update this gem" });
            }

            // Update the gem attributes
            gem.name = name;
            gem.description = description;
            gem.imgUrl = imgUrl;
            gem.lat = lat;
            gem.lng = lng;

            // Save the updated gem
            await gem.save();

            return res.status(200).json({ message: "Gem updated successfully", gem });
        } catch (error) {
            console.error("Error updating gem:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    deleteGem: async (req, res) => {
        const { gemId } = req.params;
    
        try {
            // Check if the user is authenticated
            if (!req.session.userId) {
                return res.status(401).json({ message: "Unauthorized: User not logged in" });
            }
    
            // Find the gem by ID
            const gem = await Gem.findByPk(gemId);
    
            // Check if the gem exists
            if (!gem) {
                return res.status(404).json({ message: "Gem not found" });
            }
    
            // Check if the gem belongs to the logged-in user
            if (gem.userId !== req.session.userId) {
                alert('This is not your gem silly!'); // Add the alert here
                return res.status(403).json({ message: "Forbidden: You are not authorized to delete this gem" });
            }
    
            // Delete the gem
            await gem.destroy();
    
            return res.status(200).json({ message: "Gem deleted successfully" });
        } catch (error) {
            console.error("Error deleting gem:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
};

  getUserInfo: async (req, res) => {
    const userId = req.params.userId; // Assuming userId is received from the request params

    try {
      const user = await User.findOne({
        where: { userId: userId },
        include: [{ model: Gem }, { model: Comment }],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user: user });
    } catch (error) {
      console.error("Error retrieving user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  getUserGems: async (req, res) => {
    const { userId } = req.params;

    const gems = await Gem.findAll({
      where: {
        userId: userId,
      },
      include: { model: Rating },
    });

    gems.forEach((gem) => {
      const enjoyRatings = gem.ratings
        .map((rating) => rating.enjoyability)
        .filter((item) => item !== null);
      const popularRatings = gem.ratings
        .map((rating) => rating.popularity)
        .filter((item) => item !== null);

      gem.enjoyAvg = Math.round(
        enjoyRatings.reduce((a, c) => a + c, 0) / enjoyRatings.length
      );
      gem.popularAvg = Math.round(
        popularRatings.reduce((a, c) => a + c, 0) / popularRatings.length
      );
    });

    if (gems) {
      res.send({
        message: "Got gems for user",
        success: true,
        gems,
      });
    } else {
      res.send({
        message: "Did not get gems for user",
        success: false,
      });
    }
  },
  // Add this to your handlerFunctions object in controller.js

  updateUserProfileImg: async (req, res) => {
    const { userId } = req.params;
    const { imgUrl } = req.body;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send({
          message: "User not found",
          success: false,
        });
      }

      user.imgUrl = imgUrl;
      await user.save();

      res.send({
        message: "User profile image updated successfully",
        success: true,
        user,
      });
    } catch (error) {
      console.error("Error updating user profile image:", error);
      res.status(500).send({
        message: "Error updating user profile image",
        success: false,
      });
    }
  },
  updateUserHeaderImg: async (req, res) => {
    const { userId } = req.params;
    const { headerImgUrl } = req.body;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send({
          message: "User not found",
          success: false,
        });
      }

      user.headerImgUrl = headerImgUrl; // Assuming you have a field named `headerImgUrl` in your User model
      await user.save();

      res.send({
        message: "User header image updated successfully",
        success: true,
        user,
      });
    } catch (error) {
      console.error("Error updating user header image:", error);
      res.status(500).send({
        message: "Error updating user header image",
        success: false,
      });
    }
  },
  // commentController.js

  deleteComment: async (req, res) => {
    const { commentId } = req.params;
    try {
      const deleted = await Comment.destroy({
        where: { commentId: commentId },
      });
      if (deleted) {
        return res
          .status(200)
          .send({ message: "Comment deleted successfully." });
      }
      return res.status(404).send({ message: "Comment not found." });
    } catch (error) {
      console.error("Error deleting comment:", error);
      return res.status(500).send({ message: "Error deleting comment." });
    }
  },
};

export default handlerFunctions;