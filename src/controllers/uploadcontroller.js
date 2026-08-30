import uploadService from "../services/uploadservice.js";

class UploadController {

    async uploadUserDocument(
        req,
        res,
        next
    ) {

        try {

            const { id } = req.params;

            const { documentType } =
                req.body ?? {};

            const user =
                await uploadService.uploadUserDocument(
                    id,
                    req.file,
                    documentType
                );

            return res
                .status(200)
                .json({
                    status: "success",
                    message:
                        "Documento cargado correctamente.",
                    payload: user,
                });

        } catch (error) {
            next(error);
        }
    }

    async uploadOrderReceipt(
        req,
        res,
        next
    ) {

        try {

            const { id } = req.params;

            const order =
                await uploadService.uploadOrderReceipt(
                    id,
                    req.file
                );

            return res
                .status(200)
                .json({
                    status: "success",
                    message:
                        "Comprobante cargado correctamente.",
                    payload: order,
                });

        } catch (error) {
            next(error);
        }
    }
}

export default new UploadController();