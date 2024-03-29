import { User, Friendship, Gem, Rating, Tag } from "../../database/model.js";
import { Op } from "sequelize";

const friendHandler = {
    getFriends: async (req, res) => {
        const userId = req.session.userId;
        try {
            const friendships = await Friendship.findAll({
                where: {
                    userId: userId
                }
            });

            if (!friendships.length) {
                return res.status(404).send({
                    message: "No friends found for the logged in user",
                    success: false,
                });
            }

            const friendIds = friendships.map(friendship => friendship.friendId);
            const friends = await User.findAll({
                where: {
                    id: {
                        [Op.in]: friendIds
                    }
                },
                attributes: { exclude: ['password'] } // Exclude sensitive information
            });

            res.send({
                message: "Retrieved all of the friends for logged in user",
                success: true,
                friends
            });
        } catch (error) {
            console.error("Failed to retrieve friends:", error);
            res.status(500).send({
                message: "An error occurred while retrieving friends.",
                success: false
            });
        }
    },

    getSearchResults: async (req, res) => {
        const { searchText } = req.params;
        try {
            const searchResults = await User.findAll({
                where: {
                    email: {
                        [Op.iLike]: `%${searchText}%`
                    }
                },
                attributes: ['id', 'email', 'username'] // Only return non-sensitive information
            });

            if (!searchResults.length) {
                return res.status(404).send({
                    message: "No search results found for the query",
                    success: false
                });
            }

            res.send({
                message: "Found search results for search query",
                success: true,
                searchResults
            });
        } catch (error) {
            console.error("Error searching for users:", error);
            res.status(500).send({
                message: "An error occurred during the search.",
                success: false
            });
        }
    },

    getGemsFromFriend: async (req, res) => {
        const { friendId } = req.params;
        try {
            const gems = await Gem.findAll({
                where: {
                    userId: friendId
                },
                include: [{ model: Rating }, { model: Tag }]
            });

            if (!gems.length) {
                return res.status(404).send({
                    message: "No gems found for the friend",
                    success: false
                });
            }

            gems.forEach((gem) => {
                const enjoyRatings = gem.ratings.map((rating) => rating.enjoyability).filter((item) => item !== null);
                const popularRatings = gem.ratings.map((rating) => rating.popularity).filter((item) => item !== null);

                gem.dataValues.enjoyAvg = enjoyRatings.length ? Math.round(enjoyRatings.reduce((a, c) => a + c, 0) / enjoyRatings.length) : null;
                gem.dataValues.popularAvg = popularRatings.length ? Math.round(popularRatings.reduce((a, c) => a + c, 0) / popularRatings.length) : null;
            });

            res.send({
                message: `Got friend ${friendId}'s gems`,
                success: true,
                gems
            });
        } catch (error) {
            console.error(`Failed to get friend ${friendId}'s gems:`, error);
            res.status(500).send({
                message: "An error occurred while retrieving gems.",
                success: false
            });
        }
    },

    // Example of a new method addition: addFriend
    addFriend: async (req, res) => {
        const { userId, friendId } = req.body;
        try {
            const existingFriendship = await Friendship.findOne({
                where: { userId, friendId }
            });

            if (existingFriendship) {
                return res.status(400).send({
                    message: "Friendship already exists",
                    success: false
                });
            }

            await Friendship.create({ userId, friendId });
            res.send({
                message: "Friendship successfully created",
                success: true
            });
        } catch (error) {
            console.error("Failed to create friendship:", error);
            res.status(500).send({
                message: "An error occurred while adding a friend.",
                success: false
            });
        }
    }
};

export default friendHandler;
