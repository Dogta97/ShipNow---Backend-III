import { USER_ROLES } from "../constants/index.js";

const firstNames = [
    "Juan",
    "Carlos",
    "Lucía",
    "María",
    "Pedro",
    "Sofía",
    "Martín",
    "Laura",
];

const lastNames = [
    "Gómez",
    "Pérez",
    "Rodríguez",
    "Fernández",
    "López",
    "Martínez",
    "García",
    "Sánchez",
];

const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const generateRandomEmail = (name, lastName, index) => {
    return `${name.toLowerCase()}.${lastName.toLowerCase()}${index}@shipnow.test`;
};

export const generateMockUsers = (quantity = 10) => {
    const users = [];

    for (let i = 0; i < quantity; i++) {
        const name = getRandomElement(firstNames);
        const lastName = getRandomElement(lastNames);

        const role =
            Math.random() < 0.8
                ? USER_ROLES.USER
                : USER_ROLES.ADMIN;

        users.push({
            name: `${name} ${lastName}`,
            email: generateRandomEmail(name, lastName, i),
            role,
        });
    }

    return users;
};