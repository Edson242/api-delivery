module.exports =
{
    /**@type {import("sequelize").Options} */
    development: {
        username: "root",
        password: "",
        database: "db_delivery",
        host: "localhost",
        dialect: "mysql",
        dialectOptions: {
            useUTC: false, // for reading from database
        },
        timezone: '-03:00', // for writing to database
        define: {
            timestamps: true,
            freezeTableName: true,
            //underscored: true //true to use snake_case or the default config will be camelCase
        },
    },

    /**@type {import("sequelize").Options} */
    production: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: "mysql",
        logging: false,
        dialectOptions: {
            useUTC: false, // for reading from database
        },
        timezone: '-03:00', // for writing to database
        define: {
            timestamps: true,
            freezeTableName: true,
            //underscored: true //true to use snake_case or the default config will be camelCase
        },
    }
}
