const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const storage = multer.diskStorage({
	destination: "saves/",
	filename: function (req, file, cb) {
		//req.body is empty...
		//How could I get the new_file_name property sent from client here?
		cb(null, "currentsave.txt");
	},
});

var upload = multer({ storage: storage });

// Serve frontend files
app.use(express.static(path.join(__dirname, "dist")));

// Upload file
app.post("/save", upload.single("file"), (req, res) => {
	res.send("File uploaded!");
});

// Read file
app.get("/read", (req, res) => {
	const filePath = path.join(__dirname, "../saves", "currentsave.txt");
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.send(data);
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
