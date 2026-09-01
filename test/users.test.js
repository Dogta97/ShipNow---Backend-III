import { expect } from "chai";
import request from "supertest";
import mongoose from "mongoose";

import app from "../src/app.js";
import User from "../src/models/user.js";

describe("Users API", function () {

    beforeEach(async function () {
        await User.deleteMany({});
    });

    afterEach(async function () {
        await User.deleteMany({});
    });

    describe("GET /api/users", function () {

        it(
            "debería obtener la lista paginada de usuarios",
            async function () {

                await User.create({
                    name: "Usuario Test",
                    email: "usuario.test@shipnow.test",
                    role: "USER",
                });

                const response = await request(app)
                    .get("/api/users");

                expect(response.status).to.equal(200);

                expect(response.body).to.have.property(
                    "status",
                    "success"
                );

                expect(
                    response.body.payload
                ).to.be.an("array");

                expect(
                    response.body.payload
                ).to.have.lengthOf(1);

                expect(
                    response.body.payload[0]
                ).to.have.property("_id");

                expect(
                    response.body.payload[0]
                ).to.have.property(
                    "name",
                    "Usuario Test"
                );

                expect(
                    response.body.payload[0]
                ).to.have.property(
                    "email",
                    "usuario.test@shipnow.test"
                );

                expect(
                    response.body.payload[0]
                ).to.have.property(
                    "role",
                    "USER"
                );

                expect(
                    response.body.pagination
                ).to.be.an("object");

                expect(
                    response.body.pagination.page
                ).to.equal(1);

                expect(
                    response.body.pagination.limit
                ).to.equal(10);

                expect(
                    response.body.pagination.totalDocs
                ).to.equal(1);

                expect(
                    response.body.pagination.totalPages
                ).to.equal(1);

                expect(
                    response.body.pagination.hasNextPage
                ).to.equal(false);

                expect(
                    response.body.pagination.hasPrevPage
                ).to.equal(false);
            }
        );
    });

    describe("GET /api/users/:id", function () {

        it(
            "debería obtener un usuario por ID",
            async function () {

                const user = await User.create({
                    name: "Usuario Individual",
                    email: "individual@shipnow.test",
                    role: "USER",
                });

                const response = await request(app)
                    .get(`/api/users/${user._id}`);

                expect(response.status).to.equal(200);

                expect(response.body).to.have.property(
                    "_id",
                    user._id.toString()
                );

                expect(response.body).to.have.property(
                    "name",
                    "Usuario Individual"
                );

                expect(response.body).to.have.property(
                    "email",
                    "individual@shipnow.test"
                );
            }
        );

        it(
            "debería devolver 404 si el usuario no existe",
            async function () {

                const fakeId =
                    new mongoose.Types.ObjectId();

                const response = await request(app)
                    .get(`/api/users/${fakeId}`);

                expect(response.status).to.equal(404);

                expect(response.body).to.have.property(
                    "status",
                    "error"
                );

                expect(response.body).to.have.property(
                    "error",
                    "USER_NOT_FOUND"
                );

                expect(response.body).to.have.property(
                    "message",
                    "El usuario no fue encontrado."
                );
            }
        );
    });

    describe("POST /api/users", function () {

        it(
            "debería crear un usuario válido",
            async function () {

                const newUser = {
                    name: "Nuevo Usuario",
                    email: "nuevo.usuario@shipnow.test",
                    role: "USER",
                };

                const response = await request(app)
                    .post("/api/users")
                    .send(newUser);

                expect(response.status).to.equal(201);

                expect(response.body).to.have.property(
                    "_id"
                );

                expect(response.body).to.have.property(
                    "name",
                    newUser.name
                );

                expect(response.body).to.have.property(
                    "email",
                    newUser.email
                );

                expect(response.body).to.have.property(
                    "role",
                    "USER"
                );
            }
        );

        it(
            "debería devolver 400 si faltan datos obligatorios",
            async function () {

                const response = await request(app)
                    .post("/api/users")
                    .send({
                        name: "Usuario Incompleto",
                    });

                expect(response.status).to.equal(400);

                expect(response.body).to.have.property(
                    "status",
                    "error"
                );

                expect(response.body).to.have.property(
                    "error",
                    "INVALID_DATA"
                );

                expect(response.body).to.have.property(
                    "message"
                );
            }
        );
    });
});