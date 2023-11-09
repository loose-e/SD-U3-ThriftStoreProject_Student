//? This array is not to be changed.
const salesTax = [
    {state: 'Alabama', tax: .04},
    {state: 'Alaska', tax: .00},
    {state: 'Arizona', tax: .056},
    {state: 'Arkansas', tax: .065},
    {state: 'California', tax: .0725},
    {state: 'Colorado', tax: .029},
    {state: 'Connecticut', tax: .0635},
    {state: 'Delaware', tax: .00},
    {state: 'DC', tax: .06},
    {state: 'Florida', tax: .06},
    {state: 'Georgia', tax: .04},
    {state: 'Hawaii', tax: .04166},
    {state: 'Idaho', tax: .06},
    {state: 'Illinois', tax: .0625},
    {state: 'Indiana', tax: .07},
    {state: 'Iowa', tax: .06},
    {state: 'Kansas', tax: .065},
    {state: 'Kentucky', tax: .06},
    {state: 'Louisiana', tax: .0445},
    {state: 'Maine', tax: .055},
    {state: 'Maryland', tax: .06},
    {state: 'Massachusetts', tax: .0625},
    {state: 'Michigan', tax: .06},
    {state: 'Minnesota', tax: .06875},
    {state: 'Mississippi', tax: .07},
    {state: 'Missouri', tax: .04225},
    {state: 'Montana', tax: .00},
    {state: 'Nebraska', tax: .055},
    {state: 'Nevada', tax: .0685},
    {state: 'New Hampshire', tax: .00},
    {state: 'New Jersey', tax: .06625},
    {state: 'New Mexico', tax: .05125},
    {state: 'New York', tax: .04},
    {state: 'North Carolina', tax: .0475},
    {state: 'North Dakota', tax: .05},
    {state: 'Ohio', tax: .0575},
    {state: 'Oklahoma', tax: .045},
    {state: 'Oregon', tax: .00},
    {state: 'Pennsylvania', tax: .06},
    {state: 'Rhode Island', tax: .07},
    {state: 'South Carolina', tax: .06},
    {state: 'South Dakota', tax: .06},
    {state: 'Tennessee', tax: .07},
    {state: 'Texas', tax: .0625},
    {state: 'Utah', tax: .061},
    {state: 'Vermont', tax: .06},
    {state: 'Virginia', tax: .053},
    {state: 'Washington', tax: .065},
    {state: 'West Virginia', tax: .06},
    {state: 'Wisconsin', tax: .05},
    {state: 'Wyoming', tax: .04},
];

//! Classes
class Store {
    static createStore(name, city, state, balance) {
        let tempTax = salesTax.find(function (checkState) {return checkState.state == state});
        tempTax = tempTax.tax;

        return new Store(name, city, state, balance, tempTax)
    }
    constructor(name, city, state, balance, salesTax) {
        this.name = name;
        this.city = city;
        this.state = state;
        this.salesTax = salesTax;
        this.inventory = [];
        this.balance = balance;
        this.expenses = 0;
        this.profit = 0;
        this.paidTax = 0;
    }

    stock(item) {
        var afterBalance = this.balance - (item.purchase_price * item.quantity);
        if (afterBalance < 0) {
            console.log(`Error when purchasing ${item.name}. $${Math.abs(afterBalance)} is required by ${this.name}`);
            return 'bye-bye';
        }

        var upcs = [];
        this.inventory.forEach(it => upcs.push(it.upc));

        if (upcs.includes(item.upc)) {
            this.balance -= item.purchase_price * item.quantity;
            this.expenses += item.purchase_price * item.quantity;
            this.inventory.find(i => i.upc).quantity += item.quantity;
            // console.log(this.inventory.find(i => i.upc));
        } else {
            this.balance -= item.purchase_price * item.quantity;
            this.expenses += item.purchase_price * item.quantity;
            this.inventory.push(item);
        }
    }
    
}

class Item {
    constructor(upc, name, type, quantity, purchase_price, markup) {
        this.upc = upc;
        this.name = name;
        this.type = type;
        this.quantity = quantity;
        this.purchase_price = purchase_price;
        this.markup = markup; // markup is a multiplier
    }
}

//! CREATE STORES
// Generate 3 different stores, each in a different state.
let martMart = Store.createStore('Mart-Mart', 'Tucson', 'Arizona', 100);
let quickSale = Store.createStore('Quick Sale', 'Madison Heights', 'Virginia', 1000);
let sallyShop = Store.createStore('Sally\'s Shop', 'Sanford', 'Maine', 25);

//! Inventory
grandpaClothes = new Item(37, 'Grandpa\'s hand-me-downs', 'Clothing', 2, 10, 2);
grandmaClothes = new Item(37, 'same but from gma', 'clothing', 2, 2, 1000000000);
normalPants = new Item(2, 'Normal Pants', 'Clothing', 5, 10, 3);
lamp = new Item(6, 'Average Lamp', 'Furniture', 1, 5, 4);

oldRadio = new Item(211, 'Big Old Radio', 'Electronics', 1, 500, 1.2);
fineChina = new Item(700, 'China of China', 'Dining', 5 , 20, 1.5)

grossFridge = new Item(18080808081, 'Disgusting Fridge', 'Kitchenware', 10, 1, 8);

//! Stocking

//* First Store
martMart.stock(grandpaClothes);
martMart.stock(grandmaClothes);
martMart.stock(normalPants);
martMart.stock(lamp);
martMart.stock(normalPants);

//* Second Store
quickSale.stock(oldRadio);
quickSale.stock(fineChina);
quickSale.stock(fineChina);

//* Third Store

//! Selling

//* First Store

//* Second Store

//* Third Store

//! Testing
// Simply console log each store to check the completed details.
console.log(martMart);
console.log(quickSale);