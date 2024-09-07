const Host = "https://maryapi.laimonah-scc.com/api"

export const api_Routes = {
    auth: {
        login: `${Host}/auth/admins`,
    },
    role: {
        view: `${Host}/roles`,
        add: `${Host}/roles`,
        bulkDelete: (id) => (`${Host}/roles/${id}`),
        getOne: (id) => (`${Host}/roles/${id}`),
        update: (id) => (`${Host}/roles/${id}`),
    },
    permission: {
        view: `${Host}/permissions`,
        add: `${Host}/permissions/assign`,
        bulkDelete: (id) => (`${Host}/permissions/${id}`),
        getOne: (id) => (`${Host}/permissions/${id}`),
        update: (id) => (`${Host}/permissions/${id}`),
    },
    admin: {
        view: `${Host}/admins`,
        add: `${Host}/admins`,
        bulkDelete: (id) => (`${Host}/admins/${id}`),
        getOne: (id) => (`${Host}/admins/${id}`),
        update: (id) => (`${Host}/admins/${id}`),
    },
    user: {
        view: `${Host}/users`,
        add: `${Host}/users`,
        bulkDelete: (id) => (`${Host}/users/${id}`),
        getOne: (id) => (`${Host}/users/${id}`),
        update: (id) => (`${Host}/users/${id}`),
    },
    dresses: {
        view: `${Host}/dresses`,
        add: `${Host}/dresses`,
        bulkDelete: (id) => (`${Host}/dresses/${id}`),
        getOne: (id) => (`${Host}/dresses/${id}`),
        update: (id) => (`${Host}/dresses/${id}`),
    },
    reservation: {
        view: `${Host}/reservations`,
        add: `${Host}/reservations`,
        bulkDelete: (id) => (`${Host}/reservations/${id}`),
        getOne: (id) => (`${Host}/reservations/${id}`),
        update: (id) => (`${Host}/reservations/${id}`),
    },
    specifications: {
        view: `${Host}/specifications`,
        add: `${Host}/specifications`,
        bulkDelete: (id) => (`${Host}/specifications/${id}`),
        getOne: (id) => (`${Host}/specifications/${id}`),
        update: (id) => (`${Host}/specifications/${id}`),
    },
    specificationOptions: {
        view: `${Host}/specificationOptions`,
        add: `${Host}/specificationOptions`,
        bulkDelete: (id) => (`${Host}/specificationOptions/${id}`),
        getOne: (id) => (`${Host}/specificationOptions/${id}`),
        update: (id) => (`${Host}/specificationOptions/${id}`),
    },
    
}
