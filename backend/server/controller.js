import { Sequelize } from "sequelize";
import { User, Post, Comment, Rating } from "../database/model.js";

const handlerFunctions = {
    getUser: async (req, res) => {
        const { userId } = req.params;

        const user = await User.findByPk(userId);

        if (user) { // checks to see if it found a user in the database with that ID
            res.send({
                message: "Found the user object",
                success: true
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
    }
}

export default handlerFunctions;