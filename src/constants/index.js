export const USER_ROLES = Object.freeze({
    ADMIN: "ADMIN",
    USER: "USER",
    DELIVERER: "DELIVERER",
});

export const SHIPMENT_STATUS = Object.freeze({
    PENDING: "PENDING",
    IN_TRANSIT: "IN_TRANSIT",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
});

export const PRODUCT_STATUS = Object.freeze({
    AVAILABLE: "AVAILABLE",
    OUT_OF_STOCK: "OUT_OF_STOCK",
});

export const ORDER_STATUS = Object.freeze({
    PENDING: "PENDING",
    CONFIRMED: "CONFIRMED",
    PREPARING: "PREPARING",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
});

export const ORDER_PRIORITY = Object.freeze({
    LOW: "LOW",
    NORMAL: "NORMAL",
    HIGH: "HIGH",
    URGENT: "URGENT",
});