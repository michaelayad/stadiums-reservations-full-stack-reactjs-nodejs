const app = require('./app.js');
const sequelize = require('./utils/database.js');
const { ownerModel } = require('./models/index');
const dotenv = require('dotenv');
const { addDammyData } = require('./seeders/seeder.js');
dotenv.config();

sequelize
    // .sync({ force: true })
    .sync()
    .then(
        result => {
            // console.log(result);
            // addDammyData();
            console.log('Connection has been established successfully');
            app.listen(process.env.PORT_NUMBER, () => {
                console.log('Listening on port 4000');
            })
        }
    ).catch(err => {
        throw new Error(err);
    })


