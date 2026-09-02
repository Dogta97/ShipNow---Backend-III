import { expect } from "chai";
import request from "supertest";
import mongoose from "mongoose";

import app from "../src/app.js";
import Shipment from "../src/models/shipment.js";

describe("Shipments API", function () {

    beforeEach(async function () {
        await Shipment.deleteMany({});
    });

    afterEach(async function () {
        await Shipment.deleteMany({});
    });

    describe("GET /api/shipments", function () {

        it("debería obtener la lista paginada de envíos", async function () {

            await Shipment.create([
                {
                    trackingNumber:
                        "SHIP-TEST-001",

                    order:
                        new mongoose.Types.ObjectId(),

                    origin:
                        "Buenos Aires",

                    destination:
                        "La Plata",

                    weight:
                        2.5,

                    status:
                        "PENDING",
                },

                {
                    trackingNumber:
                        "SHIP-TEST-002",

                    order:
                        new mongoose.Types.ObjectId(),

                    origin:
                        "Avellaneda",

                    destination:
                        "Quilmes",

                    weight:
                        3,

                    status:
                        "IN_TRANSIT",
                },
            ]);

            const response =
                await request(app)
                    .get(
                        "/api/shipments?page=1&limit=1"
                    );

            expect(
                response.status
            ).to.equal(200);

            expect(
                response.body
            ).to.have.property(
                "status",
                "success"
            );

            expect(
                response.body
            ).to.have.property(
                "payload"
            );

            expect(
                response.body.payload
            ).to.be.an("array");

            expect(
                response.body.payload
            ).to.have.lengthOf(1);

            expect(
                response.body
            ).to.have.property(
                "pagination"
            );

            expect(
                response.body.pagination.page
            ).to.equal(1);

            expect(
                response.body.pagination.limit
            ).to.equal(1);

            expect(
                response.body.pagination.totalDocs
            ).to.equal(2);

            expect(
                response.body.pagination.totalPages
            ).to.equal(2);

            expect(
                response.body.pagination.hasNextPage
            ).to.equal(true);

            expect(
                response.body.pagination.hasPrevPage
            ).to.equal(false);

        });

        it("debería filtrar envíos por estado", async function () {

            await Shipment.create([
                {
                    trackingNumber:
                        "SHIP-FILTER-001",

                    order:
                        new mongoose.Types.ObjectId(),

                    origin:
                        "Buenos Aires",

                    destination:
                        "Rosario",

                    weight:
                        5,

                    status:
                        "PENDING",
                },

                {
                    trackingNumber:
                        "SHIP-FILTER-002",

                    order:
                        new mongoose.Types.ObjectId(),

                    origin:
                        "Buenos Aires",

                    destination:
                        "Córdoba",

                    weight:
                        4,

                    status:
                        "DELIVERED",
                },
            ]);

            const response =
                await request(app)
                    .get(
                        "/api/shipments?status=DELIVERED"
                    );

            expect(
                response.status
            ).to.equal(200);

            expect(
                response.body.payload
            ).to.be.an("array");

            expect(
                response.body.payload
            ).to.have.lengthOf(1);

            expect(
                response.body.payload[0].status
            ).to.equal(
                "DELIVERED"
            );

        });

        it("debería devolver 400 si el estado es inválido", async function () {

            const response =
                await request(app)
                    .get(
                        "/api/shipments?status=INVALID_STATUS"
                    );

            expect(
                response.status
            ).to.equal(400);

            expect(
                response.body
            ).to.have.property(
                "status",
                "error"
            );

            expect(
                response.body
            ).to.have.property(
                "error",
                "INVALID_STATUS"
            );

        });

    });

    describe(
        "GET /api/shipments/tracking/:trackingNumber",
        function () {

            it(
                "debería obtener un envío por número de seguimiento",
                async function () {

                    await Shipment.create({
                        trackingNumber:
                            "SHIP-TRACKING-001",

                        order:
                            new mongoose.Types.ObjectId(),

                        origin:
                            "Buenos Aires",

                        destination:
                            "Córdoba",

                        weight:
                            5,

                        status:
                            "IN_TRANSIT",
                    });

                    const response =
                        await request(app)
                            .get(
                                "/api/shipments/tracking/SHIP-TRACKING-001"
                            );

                    expect(
                        response.status
                    ).to.equal(200);

                    expect(
                        response.body
                    ).to.have.property(
                        "trackingNumber",
                        "SHIP-TRACKING-001"
                    );

                    expect(
                        response.body
                    ).to.have.property(
                        "origin",
                        "Buenos Aires"
                    );

                    expect(
                        response.body
                    ).to.have.property(
                        "destination",
                        "Córdoba"
                    );

                    expect(
                        response.body
                    ).to.have.property(
                        "status",
                        "IN_TRANSIT"
                    );

                }
            );

            it(
                "debería devolver 404 si el tracking no existe",
                async function () {

                    const response =
                        await request(app)
                            .get(
                                "/api/shipments/tracking/SHIP-NOT-FOUND"
                            );

                    expect(
                        response.status
                    ).to.equal(404);

                    expect(
                        response.body
                    ).to.have.property(
                        "status",
                        "error"
                    );

                    expect(
                        response.body
                    ).to.have.property(
                        "error",
                        "SHIPMENT_NOT_FOUND"
                    );

                }
            );

        }
    );

    describe("GET /api/shipments/:id", function () {

        it("debería obtener un envío por ID", async function () {

            const shipment =
                await Shipment.create({
                    trackingNumber:
                        "SHIP-ID-001",

                    order:
                        new mongoose.Types.ObjectId(),

                    origin:
                        "Buenos Aires",

                    destination:
                        "Mar del Plata",

                    weight:
                        6,

                    status:
                        "PENDING",
                });

            const response =
                await request(app)
                    .get(
                        `/api/shipments/${shipment._id}`
                    );

            expect(
                response.status
            ).to.equal(200);

            expect(
                response.body
            ).to.have.property(
                "trackingNumber",
                "SHIP-ID-001"
            );

            expect(
                response.body
            ).to.have.property(
                "origin",
                "Buenos Aires"
            );

            expect(
                response.body
            ).to.have.property(
                "destination",
                "Mar del Plata"
            );

        });

        it("debería devolver 404 si el envío no existe", async function () {

            const nonexistentId =
                new mongoose.Types.ObjectId();

            const response =
                await request(app)
                    .get(
                        `/api/shipments/${nonexistentId}`
                    );

            expect(
                response.status
            ).to.equal(404);

            expect(
                response.body
            ).to.have.property(
                "status",
                "error"
            );

            expect(
                response.body
            ).to.have.property(
                "error",
                "SHIPMENT_NOT_FOUND"
            );

        });

    });

    describe("POST /api/shipments", function () {

        it("debería crear correctamente un envío", async function () {

            const orderId =
                new mongoose.Types.ObjectId();

            const shipmentData = {
                trackingNumber:
                    "SHIP-CREATE-001",

                order:
                    orderId.toString(),

                origin:
                    "Buenos Aires",

                destination:
                    "Mendoza",

                weight:
                    8.5,

                status:
                    "PENDING",
            };

            const response =
                await request(app)
                    .post(
                        "/api/shipments"
                    )
                    .send(
                        shipmentData
                    );

            expect(
                response.status
            ).to.equal(201);

            expect(
                response.body
            ).to.have.property(
                "trackingNumber",
                "SHIP-CREATE-001"
            );

            expect(
                response.body
            ).to.have.property(
                "origin",
                "Buenos Aires"
            );

            expect(
                response.body
            ).to.have.property(
                "destination",
                "Mendoza"
            );

            expect(
                response.body
            ).to.have.property(
                "status",
                "PENDING"
            );

            const shipmentInDatabase =
                await Shipment.findOne({
                    trackingNumber:
                        "SHIP-CREATE-001",
                });

            expect(
                shipmentInDatabase
            ).to.not.equal(null);

        });

        it("debería devolver 400 si faltan datos obligatorios", async function () {

            const response =
                await request(app)
                    .post(
                        "/api/shipments"
                    )
                    .send({
                        trackingNumber:
                            "SHIP-INVALID-001",
                    });

            expect(
                response.status
            ).to.equal(400);

            expect(
                response.body
            ).to.have.property(
                "status",
                "error"
            );

            expect(
                response.body
            ).to.have.property(
                "error",
                "INVALID_DATA"
            );

        });

        it("debería rechazar un trackingNumber duplicado", async function () {

            const orderId =
                new mongoose.Types.ObjectId();

            await Shipment.create({
                trackingNumber:
                    "SHIP-DUPLICATE-001",

                order:
                    orderId,

                origin:
                    "Buenos Aires",

                destination:
                    "Córdoba",

                weight:
                    4,

                status:
                    "PENDING",
            });

            const response =
                await request(app)
                    .post(
                        "/api/shipments"
                    )
                    .send({
                        trackingNumber:
                            "SHIP-DUPLICATE-001",

                        order:
                            new mongoose.Types.ObjectId()
                                .toString(),

                        origin:
                            "Rosario",

                        destination:
                            "Santa Fe",

                        weight:
                            3,
                    });

            expect(
                response.status
            ).to.equal(400);

            expect(
                response.body
            ).to.have.property(
                "status",
                "error"
            );

            expect(
                response.body
            ).to.have.property(
                "error",
                "TRACKING_NUMBER_ALREADY_EXISTS"
            );

        });

    });

    describe("PUT /api/shipments/:id", function () {

        it("debería actualizar correctamente un envío", async function () {

            const shipment =
                await Shipment.create({
                    trackingNumber:
                        "SHIP-UPDATE-001",

                    order:
                        new mongoose.Types.ObjectId(),

                    origin:
                        "Buenos Aires",

                    destination:
                        "La Plata",

                    weight:
                        2,

                    status:
                        "PENDING",
                });

            const response =
                await request(app)
                    .put(
                        `/api/shipments/${shipment._id}`
                    )
                    .send({
                        status:
                            "IN_TRANSIT",

                        destination:
                            "Quilmes",
                    });

            expect(
                response.status
            ).to.equal(200);

            expect(
                response.body
            ).to.have.property(
                "status",
                "IN_TRANSIT"
            );

            expect(
                response.body
            ).to.have.property(
                "destination",
                "Quilmes"
            );

            const updatedShipment =
                await Shipment.findById(
                    shipment._id
                );

            expect(
                updatedShipment.status
            ).to.equal(
                "IN_TRANSIT"
            );

            expect(
                updatedShipment.destination
            ).to.equal(
                "Quilmes"
            );

        });

        it("debería devolver 404 al actualizar un envío inexistente", async function () {

            const nonexistentId =
                new mongoose.Types.ObjectId();

            const response =
                await request(app)
                    .put(
                        `/api/shipments/${nonexistentId}`
                    )
                    .send({
                        status:
                            "IN_TRANSIT",
                    });

            expect(
                response.status
            ).to.equal(404);

            expect(
                response.body
            ).to.have.property(
                "error",
                "SHIPMENT_NOT_FOUND"
            );

        });

    });

});