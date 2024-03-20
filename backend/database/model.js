// need my imports up here
import { Model, DataTypes } from 'sequelize'
import util from 'util'
import connectToDB from './db.js'

export const db = await connectToDB('postgresql:///hiddenGems')

class User extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false,
        }
    },
    {
        modelName: 'user',
        sequelize: db,
    },
);


class Gem extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}

Gem.init(
    {
        gemId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        imgUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lat: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        lng: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        enjoyAvg: {
            type: DataTypes.INTEGER,
            allowNull: true
        }, 
        popularAvg: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        modelName: 'gem',
        sequelize: db,
    },
);

class Comment extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}

Comment.init(
    {
        commentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        modelName: 'comment',
        sequelize: db,
    },
);

class Rating extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}

Rating.init(
    {
        ratingId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        enjoyability: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        popularity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        modelName: 'rating',
        sequelize: db,
    },
);

// User - Gem
User.hasMany(Gem, { foreignKey: "userId"});
Gem.belongsTo(User, { foreignKey: "userId"});

// User - Comment
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

// User - Ratingo
User.hasMany(Rating, { foreignKey: "userId" });
Rating.belongsTo(User, { foreignKey: "userId" });

// Gem - Comment
Gem.hasMany(Comment, { foreignKey: "gemId" });
Comment.belongsTo(Gem, { foreignKey: "gemId" });

// Gem - Rating
Gem.hasMany(Rating, { foreignKey: "gemId"});
Rating.belongsTo(Gem, { foreignKey: "gemId"});

export { User, Gem, Comment, Rating };