const mongoose = require('mongoose');

const connectToDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("Already connected to DB");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");
        console.log("Connection state:", mongoose.connection.readyState);
    } catch (err) {
        console.error("Error connecting to DB:", err);
    }
};

export default connectToDB;
