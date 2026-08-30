import { expect } from "chai";
import request from "supertest";

import app from "../src/app.js";
import User from "../src/models/user.js";

describe("System endpoints", function () {

    beforeEach(async function () {
        await User.deleteMany({});
    });

    afterEach(async function () {
        await User.deleteMany({});
    });

    describe("Mocks API", function () {

        it("debería generar usuarios mock sin guardarlos", async function () {

            const response = await request(app)
                .get("/api/mocks/users?quantity=3");

            expect(response.status).to.equal(200);

            expect(response.body).to.have.property(
                "status",
                "success"
            );

            expect(response.body).to.have.property(
                "count",
                3
            );

            expect(response.body).to.have.property("payload");
            expect(response.body.payload).to.be.an("array");
            expect(response.body.payload).to.have.lengthOf(3);

            expect(response.body.payload[0]).to.have.property("name");
            expect(response.body.payload[0]).to.have.property("email");
            expect(response.body.payload[0]).to.have.property("role");

            const usersInDatabase = await User.find();

            expect(usersInDatabase).to.have.lengthOf(0);
        });

        it("debería insertar usuarios mock en la base de testing", async function () {

            const response = await request(app)
                .post("/api/mocks/users?quantity=2");

            expect(response.status).to.equal(201);

            expect(response.body).to.have.property(
                "status",
                "success"
            );

            expect(response.body).to.have.property(
                "count",
                2
            );

            expect(response.body).to.have.property("payload");
            expect(response.body.payload).to.be.an("array");
            expect(response.body.payload).to.have.lengthOf(2);

            const usersInDatabase = await User.find();

            expect(usersInDatabase).to.have.lengthOf(2);
        });

        it("debería devolver 400 si la cantidad mock es inválida", async function () {

            const response = await request(app)
                .get("/api/mocks/users?quantity=-5");

            expect(response.status).to.equal(400);

            expect(response.body).to.have.property(
                "status",
                "error"
            );

            expect(response.body).to.have.property(
                "error",
                "INVALID_QUANTITY"
            );

            expect(response.body).to.have.property(
                "message",
                "La cantidad debe ser un número entero mayor a 0."
            );
        });

        it("debería devolver 400 si se supera el máximo permitido", async function () {

            const response = await request(app)
                .get("/api/mocks/users?quantity=101");

            expect(response.status).to.equal(400);

            expect(response.body).to.have.property(
                "status",
                "error"
            );

            expect(response.body).to.have.property(
                "error",
                "QUANTITY_LIMIT_EXCEEDED"
            );

            expect(response.body).to.have.property(
                "message",
                "La cantidad máxima permitida es 100."
            );
        });

    });

    describe("Logger endpoint", function () {

        it("debería ejecutar correctamente el endpoint de prueba del logger", async function () {

            const response = await request(app)
                .get("/api/logger/test");

            expect(response.status).to.equal(200);

            expect(response.body).to.have.property(
                "status",
                "success"
            );

            expect(response.body).to.have.property(
                "message",
                "Logs de prueba generados correctamente."
            );
        });

    });

    describe("Swagger", function () {

        it("debería servir correctamente la documentación Swagger", async function () {

            const response = await request(app)
                .get("/api/docs/");

            expect(response.status).to.equal(200);

            expect(response.headers["content-type"])
                .to.include("text/html");

            expect(response.text)
                .to.include("Swagger UI");
        });

    });

    describe("Ruta inexistente", function () {

        it("debería devolver 404 con el formato de error esperado", async function () {

            const response = await request(app)
                .get("/api/ruta-inexistente");

            expect(response.status).to.equal(404);

            expect(response.body).to.have.property(
                "status",
                "error"
            );

            expect(response.body).to.have.property(
                "error",
                "ROUTE_NOT_FOUND"
            );

            expect(response.body).to.have.property(
                "message",
                "La ruta solicitada no existe."
            );
        });

    });

});