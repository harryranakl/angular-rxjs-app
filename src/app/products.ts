
interface Products {
    _id?: string,
    title?: string,
    quantity?: string,
    description?: string,
    price?: string,
    status?: string
    // title: "camera", description: "nixon camera", price: "300", available: true, status: "active" 
}
interface Order {
    _id?: string,
    user?: string,
    deliveryAddress?: string,
    items?: Products[],
    totalAmount?: string,
    status?: string
    message?: string
    //"user":"abc","deliveryAddress":"Somewhere in kl","items":[{"title":"camera","quantity":"4"},{"title":"phone","quantity":"2"}],"totalAmount":2200,"status":"declined","_id":"0bc06160bda54b6fb94f2d67f6707ffd"
}
interface Orders extends Order{}

export {
	Products, Orders
}