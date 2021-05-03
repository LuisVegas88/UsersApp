/////DEPENDENCIES/////
///Server///
const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors({
	origin:"http://localhost:3000", 
	credentials:true,
}));
const listeningPort = 8888;
///Others///
const mysql = require("mysql");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
server.use(bodyParser.json());
const myPublicFiles = express.static("../public");
server.use(myPublicFiles);
const dotenv = require("dotenv").config();

/////SQL CONNECTION/////
function openDB() {
	return mysql.createConnection({
		"host": process.env.HOST_SQL,
		"user": process.env.USER_SQL,
		"password": process.env.PASSWORD_SQL,
		"database": process.env.DATABASE_SQL
	})
}

function connect() {
	connection.connect(function (err) {
		if (err) {
			console.error(`error connecting: ${err.stack}`);
			return;
		}

		console.log(`connected as id ${connection.threadId}`);
	});
	return connection;
}

//////VALIDATORS//////
function EmailValidator(Email) {
	let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return emailRegex.test(Email);
}

/////EndPoints/////

// GET ALL: Get all users from database

server.get("/getAllUsers", (req, res) => {
    let connection = openDB();
    connection.query("SELECT * FROM users", (err, result) => {
        if(err) {
            res.send(err);
        }else {
            const Users = result.map(user =>{
				return {
					"id":user.id,
					"avatar":user.avatar,
					"name":user.name, 
					"email":user.email,
					"birthdate":user.birthdate.toLocaleDateString()
				}
			});
			console.log(Users);
			res.send(Users);
        }
    })
    connection.end();
})

//GET: Specify and user id to get a user

server.get("/userDetail", (req, res) => {
	const {id} = req.query;
	let connection = openDB();
	connection.query(`SELECT * FROM users WHERE id = ?;`, [id], (err,result) => {
		if(err){
			console.log("error");
			res.send(err);
		}
		if(result){
			const user = {
				"avatar":result[0].avatar,
				"name":result[0].name, 
				"email":result[0].email,
				"birthdate":result[0].birthdate.toLocaleDateString()
			}
			console.log(user);
			res.send(user);
		}
	})
	connection.end();
})

//CREATE: Create a new user

server.post("/createUser", (req, res) => {
	newUser = req.body;
	if(newUser.name && newUser.email && newUser.birthdate) {
		let validated = EmailValidator(newUser.email);
		if (validated){
			let connection = openDB();
			connection.query(`SELECT id FROM users WHERE email = "${newUser.email}";`,(err, result) => {
				if(err){
					console.log(err);
					return;
				}
				//if user doesn't exis in our database...
				if(!result.length){
					connection.query(`INSERT INTO users (avatar, name, email, birthdate) VALUES ("${newUser.avatar}","${newUser.name}","${newUser.email}","${newUser.birthdate}");`, (err, result) => {
						if (err){
							throw err;
						}
						else {
							
							res.send({msg:`New user has been created, welcome: ${newUser.name}¡`});
						}
					})
				}
				else {
					res.send({msg:"User email already exists"});
				} 
			})
		}
		else {
			res.send({msg:"Please, Complete Credentials"});
		}
	}else {
		res.send({msg:"Email not valid"});
		connection.end();
	}

})

//UPDATE: Update an existing user

server.put("/userUpdate", (req, res) => {
	//first at all we get the user that we want to update
	const {id} = req.query;
	let connection = openDB();
	connection.query(`SELECT * FROM users WHERE id =?;`, [id], (err, result) => {
		if (err) {
			res.send(err);
		}
		if (result) {
			const updates = req.body;
			const userUp = {
				"id":id,
				"email":updates.email,
				"name": updates.name,
				"birthdate": updates.birthdate
			}
			
			if (updates.email && updates.name && updates.birthdate) {
				connection = openDB();
				connection.query(`UPDATE users SET email= "${userUp.email}", name = "${userUp.name}", birthdate = "${userUp.birthdate}" WHERE id = ${id};`);
				res.send("User has been updated");
			}
			else {
				res.send("Complete all credentials");
			}

		}else{	
			res.send("User doesn't exists");
		}
	})
	connection.end();
})

//REMOVE: Remove an existing user

server.get("/removeUser", (req, res) => {
	const {id} = req.query;
	let connection = openDB();
	connection.query(`DELETE FROM users WHERE id=?;`,[id], (err,result) => {
		if (err) {
			res.send(err);
		}
		if(result){
			res.send({msg:"Fav Deleted"});
		}
	})
	connection.end();
})


////////Server Listening////////
server.listen(listeningPort, () => {console.log(`server listening on port ${listeningPort}`)});