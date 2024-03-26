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
        firstName: {
            type: DataTypes.STRING(30),
            allowNull: true,   
        },
        lastName: {
            type: DataTypes.STRING(30),
            allowNull: true,   
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        imgUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        headerImgUrl: {
            type: DataTypes.STRING,
            allowNull: true
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
            allowNull: true
        },
        popularity: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        modelName: 'rating',
        sequelize: db,
    },
);

class Tag extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}

Tag.init(
    {
        tagId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        food: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        adventure: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        entertainment: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        technology: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        travel: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        education: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        health: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        fashion: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        fitness: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        pet: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        family: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        arts: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },

    },
    {
        modelName: 'tag',
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

// Gem manytomany Tag
Gem.belongsToMany(Tag, {through: 'GemTag'})
Tag.belongsToMany(Gem, {through: 'GemTag'})


export { User, Gem, Comment, Rating, Tag };