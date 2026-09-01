import { expect } from "chai";
import request from "supertest";
import mongoose from "mongoose";

import app from "../src/app.js";
import User from "../src/models/user.js";
import Product from "../src/models/product.js";
import Order from "../src/models/order.js";

describe("Orders API", function () {

    let testUser;
    let testProduct;

    beforeEach(async function () {

        // Limpiamos primero las colecciones dependientes
        await Order.deleteMany({});
        await Product.deleteMany({});
        await User.deleteMany({});

        // Usuario controlado para cada test
        testUser = await User.create({
            name: "Usuario Orders Test",
            email: "orders.user@shipnow.test",
            role: "USER",
        });

        // Producto controlado para cada test
        testProduct = await Product.create({
            name: "Producto Test",
            description: "Producto utilizado para testing",
            price: 1500,
            stock: 20,
        });
    });

    afterEach(async function () {

        // Limpieza después de cada test
        await Order.deleteMany({});
        await Product.deleteMany({});
        await User.deleteMany({});
    });

    describe("GET /api/orders", function () {

        it(
            "debería obtener la lista paginada de pedidos",
            async function () {

                await Order.create({
                    user: testUser._id,
                    products: [
                        {
                            product: testProduct._id,
                            quantity: 2,
                        },
                    ],
                    priority: "NORMAL",
                });

                const response = await request(app)
                    .get("/api/orders");

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

                const order =
                    response.body.payload[0];

                expect(order).to.have.property("_id");

                expect(order).to.have.property(
                    "status",
                    "PENDING"
                );

                expect(order).to.have.property(
                    "priority",
                    "NORMAL"
                );

                expect(order).to.have.property(
                    "user"
                );

                expect(order.user).to.have.property(
                    "name",
                    "Usuario Orders Test"
                );

                expect(order).to.have.property(
                    "products"
                );

                expect(
                    order.products
                ).to.be.an("array");

                expect(
                    order.products
                ).to.have.lengthOf(1);

                expect(
                    order.products[0]
                ).to.have.property(
                    "quantity",
                    2
                );

                expect(
                    order.products[0].product
                ).to.have.property(
                    "name",
                    "Producto Test"
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

    describe("GET /api/orders/:id", function () {

        it(
            "debería obtener un pedido por ID",
            async function () {

                const order = await Order.create({
                    user: testUser._id,
                    products: [
                        {
                            product: testProduct._id,
                            quantity: 1,
                        },
                    ],
                    priority: "HIGH",
                });

                const response = await request(app)
                    .get(`/api/orders/${order._id}`);

                expect(response.status).to.equal(200);

                expect(response.body).to.have.property(
                    "_id",
                    order._id.toString()
                );

                expect(response.body).to.have.property(
                    "status",
                    "PENDING"
                );

                expect(response.body).to.have.property(
                    "priority",
                    "HIGH"
                );

                expect(response.body.user).to.have.property(
                    "_id",
                    testUser._id.toString()
                );

                expect(
                    response.body.products
                ).to.be.an("array");

                expect(
                    response.body.products[0]
                ).to.have.property(
                    "quantity",
                    1
                );

                expect(
                    response.body.products[0].product
                ).to.have.property(
                    "_id",
                    testProduct._id.toString()
                );
            }
        );

        it(
            "debería devolver 404 si el pedido no existe",
            async function () {

                const fakeId =
                    new mongoose.Types.ObjectId();

                const response = await request(app)
                    .get(`/api/orders/${fakeId}`);

                expect(response.status).to.equal(404);

                expect(response.body).to.have.property(
                    "status",
                    "error"
                );

                expect(response.body).to.have.property(
                    "error",
                    "ORDER_NOT_FOUND"
                );

                expect(response.body).to.have.property(
                    "message",
                    "El pedido no fue encontrado."
                );
            }
        );
    });

    describe("POST /api/orders", function () {

        it(
            "debería crear un pedido válido",
            async function () {

                const newOrder = {
                    user: testUser._id.toString(),
                    products: [
                        {
                            product:
                                testProduct._id.toString(),
                            quantity: 3,
                        },
                    ],
                    priority: "NORMAL",
                };

                const response = await request(app)
                    .post("/api/orders")
                    .send(newOrder);

                expect(response.status).to.equal(201);

                expect(response.body).to.have.property(
                    "_id"
                );

                expect(response.body).to.have.property(
                    "user",
                    testUser._id.toString()
                );

                expect(response.body).to.have.property(
                    "status",
                    "PENDING"
                );

                expect(response.body).to.have.property(
                    "priority",
                    "NORMAL"
                );

                expect(
                    response.body.products
                ).to.be.an("array");

                expect(
                    response.body.products
                ).to.have.lengthOf(1);

                expect(
                    response.body.products[0]
                ).to.have.property(
                    "quantity",
                    3
                );

                expect(
                    response.body.products[0]
                ).to.have.property(
                    "product",
                    testProduct._id.toString()
                );
            }
        );

        it(
            "debería devolver 400 si faltan datos obligatorios",
            async function () {

                const response = await request(app)
                    .post("/api/orders")
                    .send({
                        user:
                            testUser._id.toString(),
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
                    "message",
                    "Los datos proporcionados no son válidos."
                );
            }
        );
    });

    describe("PUT /api/orders/:id/status", function () {

        it(
            "debería actualizar correctamente el estado de un pedido",
            async function () {

                const order = await Order.create({
                    user: testUser._id,
                    products: [
                        {
                            product:
                                testProduct._id,
                            quantity: 1,
                        },
                    ],
                });

                const response = await request(app)
                    .put(
                        `/api/orders/${order._id}/status`
                    )
                    .send({
                        status: "CONFIRMED",
                    });

                expect(response.status).to.equal(200);

                expect(response.body).to.have.property(
                    "_id",
                    order._id.toString()
                );

                expect(response.body).to.have.property(
                    "status",
                    "CONFIRMED"
                );

                expect(response.body).to.have.property(
                    "user"
                );

                expect(response.body).to.have.property(
                    "products"
                );
            }
        );

        it(
            "debería devolver 400 si el estado es inválido",
            async function () {

                const order = await Order.create({
                    user: testUser._id,
                    products: [
                        {
                            product:
                                testProduct._id,
                            quantity: 1,
                        },
                    ],
                });

                const response = await request(app)
                    .put(
                        `/api/orders/${order._id}/status`
                    )
                    .send({
                        status:
                            "ESTADO_INVENTADO",
                    });

                expect(response.status).to.equal(400);

                expect(response.body).to.have.property(
                    "status",
                    "error"
                );

                expect(response.body).to.have.property(
                    "error",
                    "INVALID_STATUS"
                );

                expect(response.body).to.have.property(
                    "message",
                    "El estado proporcionado no es válido."
                );
            }
        );
    });
});