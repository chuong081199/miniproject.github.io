module.exports = function Cart(oldCart){
    this.items = oldCart.items || {}
    this.Qty = oldCart.Qty || 0
    this.Price = oldCart.Price || 0

    this.add = (item, id) =>{
        var storedItem = this.items[id]      
        if(!storedItem){
            storedItem = this.items[id] = {item: item, qty : 0, price : 0}
        }
        storedItem.qty++
        storedItem.price = (storedItem.item.price - (storedItem.item.price * storedItem.item.sale ) / 100) * storedItem.qty
        this.Qty++
        this.Price += (storedItem.item.price - (storedItem.item.price * storedItem.item.sale ) / 100)
    }
}