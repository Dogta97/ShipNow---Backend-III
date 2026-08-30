import mongoose from "mongoose";

before(async function () {
    this.timeout(10000);

    if (!process.env.MONGODB_URI) {
        throw new Error(
            "MONGODB_URI no está definida para el entorno de testing."
        );
    }

    if (!process.env.MONGODB_URI.includes("shipnow_test")) {
        throw new Error(
            "Los tests deben ejecutarse únicamente sobre la base shipnow_test."
        );
    }

    await mongoose.connect(process.env.MONGODB_URI);
});

after(async function () {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
    }
});