import request from "supertest";
import { expect } from "chai";
import fs from "fs";
import path from "path";

import app from "../src/app.js";
import User from "../src/models/user.js";
import Order from "../src/models/order.js";
import Product from "../src/models/product.js";
import Shipment from "../src/models/shipment.js";

const uploadsUsersPath = path.resolve(
    "uploads",
    "users"
);

const uploadsReceiptsPath = path.resolve(
    "uploads",
    "receipts"
);

const clearDirectory = (directory) => {

    if (!fs.existsSync(directory)) {

        fs.mkdirSync(
            directory,
            {
                recursive: true,
            }
        );

        return;

    }

    const files =
        fs.readdirSync(directory);

    for (const file of files) {

        fs.unlinkSync(
            path.join(
                directory,
                file
            )
        );

    }

};

describe("Uploads API", function () {

    let user;
    let product;
    let order;
    let shipment;

    before(async function () {

        clearDirectory(
            uploadsUsersPath
        );

        clearDirectory(
            uploadsReceiptsPath
        );

        await Shipment.deleteMany({});
        await Order.deleteMany({});
        await Product.deleteMany({});
        await User.deleteMany({});

        user = await User.create({
            name:
                "Upload Test User",

            email:
                "uploadtest@shipnow.test",

            role:
                "USER",
        });

        product =
            await Product.create({
                name:
                    "Producto Upload",

                description:
                    "Producto utilizado para testing de uploads",

                price:
                    1500,

                stock:
                    20,

                status:
                    "AVAILABLE",
            });

        order =
            await Order.create({
                user:
                    user._id,

                products: [
                    {
                        product:
                            product._id,

                        quantity:
                            1,
                    },
                ],

                status:
                    "PENDING",

                priority:
                    "NORMAL",
            });

        shipment =
            await Shipment.create({
                trackingNumber:
                    "SHIP-UPLOAD-001",

                order:
                    order._id,

                origin:
                    "Buenos Aires",

                destination:
                    "La Plata",

                weight:
                    3.5,

                status:
                    "PENDING",
            });

    });

    after(async function () {

        await Shipment.deleteMany({});
        await Order.deleteMany({});
        await Product.deleteMany({});
        await User.deleteMany({});

        clearDirectory(
            uploadsUsersPath
        );

        clearDirectory(
            uploadsReceiptsPath
        );

    });

    it(
        "debe subir correctamente un documento de usuario",
        async function () {

            const response =
                await request(app)
                    .post(
                        `/api/uploads/users/${user._id}/documents`
                    )
                    .field(
                        "documentType",
                        "DNI"
                    )
                    .attach(
                        "file",
                        Buffer.from(
                            "contenido de prueba"
                        ),
                        {
                            filename:
                                "dni-test.png",

                            contentType:
                                "image/png",
                        }
                    );

            expect(
                response.status
            ).to.equal(200);

            expect(
                response.body.status
            ).to.equal(
                "success"
            );

            expect(
                response.body.message
            ).to.equal(
                "Documento cargado correctamente."
            );

            expect(
                response.body.payload.documents
            ).to.be.an(
                "array"
            );

            expect(
                response.body.payload.documents
            ).to.have.lengthOf(1);

            expect(
                response.body.payload
                    .documents[0]
                    .documentType
            ).to.equal(
                "DNI"
            );

            expect(
                response.body.payload
                    .documents[0]
                    .mimetype
            ).to.equal(
                "image/png"
            );

            expect(
                fs.existsSync(
                    path.resolve(
                        response.body.payload
                            .documents[0]
                            .path
                    )
                )
            ).to.equal(true);

        }
    );

    it(
        "debe devolver FILE_REQUIRED si no se envía archivo",
        async function () {

            const response =
                await request(app)
                    .post(
                        `/api/uploads/users/${user._id}/documents`
                    )
                    .field(
                        "documentType",
                        "DNI"
                    );

            expect(
                response.status
            ).to.equal(400);

            expect(
                response.body.status
            ).to.equal(
                "error"
            );

            expect(
                response.body.error
            ).to.equal(
                "FILE_REQUIRED"
            );

        }
    );

    it(
        "debe devolver INVALID_DOCUMENT_TYPE si el tipo de documento no es válido",
        async function () {

            const filesBefore =
                fs.readdirSync(
                    uploadsUsersPath
                ).length;

            const response =
                await request(app)
                    .post(
                        `/api/uploads/users/${user._id}/documents`
                    )
                    .field(
                        "documentType",
                        "DOCUMENTO_FALSO"
                    )
                    .attach(
                        "file",
                        Buffer.from(
                            "contenido inválido"
                        ),
                        {
                            filename:
                                "documento.png",

                            contentType:
                                "image/png",
                        }
                    );

            expect(
                response.status
            ).to.equal(400);

            expect(
                response.body.error
            ).to.equal(
                "INVALID_DOCUMENT_TYPE"
            );

            const filesAfter =
                fs.readdirSync(
                    uploadsUsersPath
                ).length;

            expect(
                filesAfter
            ).to.equal(
                filesBefore
            );

        }
    );

    it(
        "debe rechazar tipos de archivo no permitidos",
        async function () {

            const response =
                await request(app)
                    .post(
                        `/api/uploads/users/${user._id}/documents`
                    )
                    .field(
                        "documentType",
                        "DNI"
                    )
                    .attach(
                        "file",
                        Buffer.from(
                            "archivo webp"
                        ),
                        {
                            filename:
                                "archivo.webp",

                            contentType:
                                "image/webp",
                        }
                    );

            expect(
                response.status
            ).to.equal(400);

            expect(
                response.body.error
            ).to.equal(
                "INVALID_FILE_TYPE"
            );

        }
    );

    it(
        "debe subir correctamente un comprobante de pedido",
        async function () {

            const response =
                await request(app)
                    .post(
                        `/api/uploads/orders/${order._id}/receipt`
                    )
                    .attach(
                        "file",
                        Buffer.from(
                            "comprobante"
                        ),
                        {
                            filename:
                                "receipt.png",

                            contentType:
                                "image/png",
                        }
                    );

            expect(
                response.status
            ).to.equal(200);

            expect(
                response.body.status
            ).to.equal(
                "success"
            );

            expect(
                response.body.message
            ).to.equal(
                "Comprobante cargado correctamente."
            );

            expect(
                response.body.payload.receipt
            ).to.exist;

            expect(
                response.body.payload
                    .receipt
                    .documentType
            ).to.equal(
                "RECEIPT"
            );

            expect(
                response.body.payload
                    .receipt
                    .mimetype
            ).to.equal(
                "image/png"
            );

            expect(
                fs.existsSync(
                    path.resolve(
                        response.body.payload
                            .receipt
                            .path
                    )
                )
            ).to.equal(true);

        }
    );

    it(
        "debe devolver ORDER_NOT_FOUND si el pedido no existe",
        async function () {

            const filesBefore =
                fs.readdirSync(
                    uploadsReceiptsPath
                ).length;

            const fakeOrderId =
                "64b64cfa1234567890123456";

            const response =
                await request(app)
                    .post(
                        `/api/uploads/orders/${fakeOrderId}/receipt`
                    )
                    .attach(
                        "file",
                        Buffer.from(
                            "comprobante inválido"
                        ),
                        {
                            filename:
                                "receipt.png",

                            contentType:
                                "image/png",
                        }
                    );

            expect(
                response.status
            ).to.equal(404);

            expect(
                response.body.error
            ).to.equal(
                "ORDER_NOT_FOUND"
            );

            const filesAfter =
                fs.readdirSync(
                    uploadsReceiptsPath
                ).length;

            expect(
                filesAfter
            ).to.equal(
                filesBefore
            );

        }
    );

    it(
        "debe subir correctamente un comprobante de envío",
        async function () {

            const response =
                await request(app)
                    .post(
                        `/api/uploads/shipments/${shipment._id}/receipt`
                    )
                    .attach(
                        "file",
                        Buffer.from(
                            "comprobante de envío"
                        ),
                        {
                            filename:
                                "shipment-receipt.png",

                            contentType:
                                "image/png",
                        }
                    );

            expect(
                response.status
            ).to.equal(200);

            expect(
                response.body.status
            ).to.equal(
                "success"
            );

            expect(
                response.body.message
            ).to.equal(
                "Comprobante del envío cargado correctamente."
            );

            expect(
                response.body.payload.receipt
            ).to.exist;

            expect(
                response.body.payload
                    .receipt
                    .documentType
            ).to.equal(
                "RECEIPT"
            );

            expect(
                response.body.payload
                    .receipt
                    .mimetype
            ).to.equal(
                "image/png"
            );

            expect(
                fs.existsSync(
                    path.resolve(
                        response.body.payload
                            .receipt
                            .path
                    )
                )
            ).to.equal(true);

            const shipmentInDatabase =
                await Shipment.findById(
                    shipment._id
                );

            expect(
                shipmentInDatabase.receipt
            ).to.exist;

            expect(
                shipmentInDatabase
                    .receipt
                    .documentType
            ).to.equal(
                "RECEIPT"
            );

        }
    );

    it(
        "debe devolver SHIPMENT_NOT_FOUND si el envío no existe",
        async function () {

            const filesBefore =
                fs.readdirSync(
                    uploadsReceiptsPath
                ).length;

            const fakeShipmentId =
                "64b64cfa1234567890123456";

            const response =
                await request(app)
                    .post(
                        `/api/uploads/shipments/${fakeShipmentId}/receipt`
                    )
                    .attach(
                        "file",
                        Buffer.from(
                            "comprobante inválido"
                        ),
                        {
                            filename:
                                "shipment-receipt.png",

                            contentType:
                                "image/png",
                        }
                    );

            expect(
                response.status
            ).to.equal(404);

            expect(
                response.body.status
            ).to.equal(
                "error"
            );

            expect(
                response.body.error
            ).to.equal(
                "SHIPMENT_NOT_FOUND"
            );

            const filesAfter =
                fs.readdirSync(
                    uploadsReceiptsPath
                ).length;

            expect(
                filesAfter
            ).to.equal(
                filesBefore
            );

        }
    );

});