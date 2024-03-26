import { Gem, Comment, Rating } from "../database/model.js";

const gemHandler = {
    getGem: async (req, res) => {
        const { gemId } = req.params;

        const gem = await Gem.findOne({
            where: { gemId: gemId },
            include: [{ model: Comment }, { model: Rating }]
        });

        const enjoyRatings = gem.ratings.map((rating) => rating.enjoyability).filter((item) => item !== null);
        const popularRatings = gem.ratings.map((rating) => rating.popularity).filter((item) => item !== null);

        gem.enjoyAvg = Math.round(enjoyRatings.reduce((a, c) => a + c, 0) / enjoyRatings.length);
        gem.popularAvg = Math.round(popularRatings.reduce((a, c) => a + c, 0) / popularRatings.length);

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
            const enjoyRatings = gem.ratings.map((rating) => rating.enjoyability).filter((item) => item !== null);
            const popularRatings = gem.ratings.map((rating) => rating.popularity).filter((item) => item !== null);

            gem.enjoyAvg = Math.round(enjoyRatings.reduce((a, c) => a + c, 0) / enjoyRatings.length);
            gem.popularAvg = Math.round(popularRatings.reduce((a, c) => a + c, 0) / popularRatings.length);
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
    getUserGems: async (req, res) => {
        const { userId } = req.params;

        const gems = await Gem.findAll({
            where: {
                userId: userId
            },
            include: { model: Rating }
        })

        gems.forEach((gem) => {
            const enjoyRatings = gem.ratings.map((rating) => rating.enjoyability).filter((item) => item !== null);
            const popularRatings = gem.ratings.map((rating) => rating.popularity).filter((item) => item !== null);

            gem.enjoyAvg = Math.round(enjoyRatings.reduce((a, c) => a + c, 0) / enjoyRatings.length);
            gem.popularAvg = Math.round(popularRatings.reduce((a, c) => a + c, 0) / popularRatings.length);
        });

        if (gems) {
            res.send({
                message: "Got gems for user",
                success: true,
                gems
            })
        } else {
            res.send({
                message: "Did not get gems for user",
                success: false
            })
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
}

export default gemHandler;