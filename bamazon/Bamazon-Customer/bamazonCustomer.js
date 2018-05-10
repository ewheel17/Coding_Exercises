var mysql = require('mysql');
var inquirer = require('inquirer');

var db = mysql.createConnection({
    host:"localhost",
    port:3306,

    user: "root",
    password: "Geiger1225",
    database: "bamazon"
});

// Start Connect to the SQL DB.
db.connect(err => {
    if (err) throw err;
    printItems();
})

// Print the initial list of items in the DB and then prompt options.
function printItems() {
    let query = "SELECT item_id, product_name, price, stock_quantity FROM products"
    
    db.query(query, (err, res) => {
        if (err) throw err;
        for (i in res) {
            console.log("-----------------------");
            console.log("Item ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nPrice: $" + res[i].price + "\nIn Stock: " + res[i].stock_quantity);
            console.log("-----------------------");
        }
        startPrompt();
    })
}

// Ask User what they want to do.
function startPrompt() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Buy an item.",
            "Leave the store."
        ]
    }).then(ans => {
        switch(ans.action) {
            case "Buy an item.":
                chooseItem();
            break;

            case "Leave the store.":
                return;
            break;
        }
    })
}

// Choose an item by id and then choose a quantity. 
function chooseItem() {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Type the ID of the item you want to buy."
    },
    {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?"
    }]).then(ans => {
        let query1 = "SELECT price, stock_quantity FROM products WHERE ?";
        db.query(query1, {item_id: ans.id},(err, res) => {
            if (res[0].stock_quantity < ans.quantity) {
                console.log("Sorry, but we only have " + res[0].stock_quantity + " of that item left in stock.");
                return;
            } else {
                let query2 = "UPDATE products SET ? WHERE ?";
                let changes = [{stock_quantity: (res[0].stock_quantity - ans.quantity)}, {item_id: ans.id}]
                db.query(query2, changes, (err,res) => {});
                console.log("Your total is $" + (ans.quantity * res[0].price) +". Thank you for your purchase!")
            }
        })

    });
}