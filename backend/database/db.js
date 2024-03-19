import { Sequelize } from "sequelize";

async function connectToDB(dbURI) {
    const sequelize = new Sequelize(dbURI, {
        logging: console.log,
        define: {
            underscored: true,
            timestamps:false,
        },
    });

    try {
        await sequelize.authenticate();
        console.log('Connected to DB successfully!');
    } catch (error) {
        console.log('Unable to connect to DB', error);
    }
    return sequelize;
}

export default connectToDB;