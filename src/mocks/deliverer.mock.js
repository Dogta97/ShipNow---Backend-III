import { USER_ROLES } from "../constants/index.js";

const delivererNames = [
    "Carlos Rodríguez",
    "Martín González",
    "Lucas Fernández",
    "Diego Martínez",
    "Santiago López",
    "Nicolás García",
    "Matías Pérez",
    "Federico Sánchez",
];

export const generateMockDeliverers = (quantity) => {

    const deliverers = [];

    for (let i = 0; i < quantity; i++) {

        const name = delivererNames[
            Math.floor(Math.random() * delivererNames.length)
        ];

        deliverers.push({
            name,
            email: `deliverer${Date.now()}${i}@shipnow.test`,
            role: USER_ROLES.DELIVERER,
        });

    }

    return deliverers;

};