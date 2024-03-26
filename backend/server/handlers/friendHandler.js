import { User, Friendship } from "../database/model.js";
import { Op } from "sequelize";

const friendHandler = {
    getFriends: async (req, res) => {
        const userId = req.session.userId;

        const friendships = await Friendship.findAll({
            where: {
                userId: userId
            }
        });

        const friends = [];

        for (const friendship of friendships) {
            const user = await User.findByPk(friendship.friendId);
            friends.push(user);
        }

        if (friends) {
            res.send({
                message: "Retrieved all of the friends for logged in user",
                success: true,
                friends
            });
            return;
        } else {
            res.send({
                message: "Failed to retrieve friends for logged in user",
                success: false
            });
        }
    },
    getSearchResults: async (req, res) => {
        const { searchText } = req.params;

        const searchResults = await User.findAll({
            where: {
                email: {
                    [Op.iLike]: `%${searchText}%`
                }
            }
        });


        if (searchResults) {
            res.send({
                message: "Found search results for search query",
                success: true,
                searchResults
            });
            return;
        } else {
            res.send({
                message: "Did not find search results for search query",
                success: false
            });
        }
    }
}

export default friendHandler;