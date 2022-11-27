const client = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/ourdb";

// client.connect(url, (err, inst) => {
//     errorChecker(err, inst);
// })

let errorChecker = (err, inst) => {
    if (err) {
        console.log("Something went wrong with ", err);
    } else {
        console.log("Successfully connected! \n", inst);
    }
}

let makeCollection = (collectionName) => {
    client.connect(url, (err, inst) => {
        if (err) {
            console.log("Something went wrong with ", err);
        } else {
            let dbo = inst.db('ourdb');
            dbo.createCollection(collectionName, (error, result) => errorChecker(error, result));
        }
    })
};

let insertData = (obj) => {
    client.connect(url, (error, inst) => {
        if (error) {
            console.log("Something went wrong with ", error);
        } else {
            let dbo = inst.db('ourdb');
            // dbo.collection('users').insertMany(obj, (error, result) => errorChecker(error, result));
            dbo.collection('users').findOne({}, (error, result) => {
                obj.forEach((sob) => {
                    sob.userId = result._id;
                    dbo.collection('orders').insertMany(obj, (error, result) => errorChecker(error, result));
                });
            });
        }
    })
};

let findUser = () => {
    client.connect(url, (error, inst) => {
        if (error) {
            console.log("Something went wrong with ", err);
        } else {
            let dbo = inst.db('ourdb');
            // // find one
            // dbo.collection('users').findOne({}, (error, result) => errorChecker(error, result));
            // // find all
            // dbo.collection('users').find({}).toArray((error, result) => errorChecker(error, result));
            // // find by query
            // let query = {age : 30}
            // dbo.collection('users').find(query).toArray((error, result) => errorChecker(error, result));
            // find all user's name
            dbo.collection('users').find({}, { projection: { name: 1 } }).toArray((error, result) => errorChecker(error, result));
        }
    })
};

let getUserWithSort = () => {
    client.connect(url, (error, inst) => {
        if (error) {
            console.log("Something went wrong with ", err);
        } else {
            let dbo = inst.db('ourdb');
            let mySort = { name: 1 };
            dbo.collection('users').find({}).sort(mySort).toArray((error, result) => errorChecker(error, result));
        }
    })
};

let deleteUser = () => {
    client.connect(url, (error, inst) => {
        if (error) {
            console.log("Something went wrong with ", err);
        } else {
            let dbo = inst.db('ourdb');
            // delete one
            let query = { name: "Mg Mg" };
            dbo.collection('users').deleteOne(query, (error, result) => errorChecker(error, result));
            // drop collection
            dbo.collection('users').drop((error, result) => errorChecker(error, result));
        }
    })
};

let updateUser = () => {
    client.connect(url, (error, inst) => {
        if (error) {
            console.log("Something went wrong with ", err);
        } else {
            let dbo = inst.db('ourdb');
            // delete one
            let query = { name: "Su Su" };
            dbo.collection('users').updateOne(query, { $set: { password: "456" } }, (error, result) => errorChecker(error, result));
        }
    })
};

let joinTable = () => {
    client.connect(url, (error, inst) => {
        if (error) {
            console.log("Something went wrong with", error);
        } else {
            let dbo = inst.db('ourdb');
            dbo.collection('users').aggregate([
                {
                    $lookup: {
                        from: "orders",
                        localField: "_id",
                        foreignField: "userId",
                        as: "user_orders"
                    }
                }
            ]).toArray((error, result) => errorChecker(error, result));
        }
    });
};

// // create collection
// makeCollection('order');

// // insert data
// insertData(
//     [
//         {name: "Aung Aung", email: "mgmg@gmail.com", password : "123", age: 21},
//         {name: "Su Su", email: "mgmg@gmail.com", password : "123"},
//         {name: "Mya Mya", email: "mgmg@gmail.com", password : "123"},
//         {name: "Tun Tun", email: "mgmg@gmail.com", password : "123", age : 30}
//     ]
// );

// // insert order
// insertData(
//     [
//         { userId: "user_id", name: "computer", price: 12000, count: 2 },
//         { userId: "user_id", name: "keyboard", price: 12000, count: 1 },
//         { userId: "user_id", name: "mouse", price: 12000, count: 3 },
//         { userId: "user_id", name: "printer", price: 12000, count: 5 },
//     ]
// );

// // find user
// findUser();

// // get user with sorting
// getUserWithSort();

// update user's password
// updateUser();


// join table
joinTable();
