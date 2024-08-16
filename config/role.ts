const allRoles = {
    user: [],
    admin: [
        "product_view",
        "product_edit",
        "product_delete",
        "product_create",
        "order_view",
        "order_edit",
        "order_delete",
        "user_view",
        "user_edit",
        "user_delete"]
}

export const role = Object.keys(allRoles)
export const roleRights = new Map(Object.entries(allRoles))