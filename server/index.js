const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PenggunaModel = require('./models/Pengguna');
const UserModel = require('./models/Users');

const app = express();
app.use(express.json());
app.use(cors());

// Menghubungkan ke database MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/pengguna", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rute untuk login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  PenggunaModel.findOne({ email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("The password is incorrect");
        }
      } else {
        res.json("No user found with the provided email");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json("An error occurred");
    });
});

// Rute untuk register
app.post('/register', (req, res) => {
  PenggunaModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json("An error occurred");
    });
});

// Rute untuk pengambilan data pengguna
app.get('/users', (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => {
      console.log(err);
      res.status(500).json("An error occurred");
    });
});

// Rute untuk pengambilan data pengguna berdasarkan ID
app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById(id)
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occurred");
    });
});

// Rute untuk pembaruan pengguna berdasarkan ID
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, tanggal, toDo } = req.body;

  UserModel.findByIdAndUpdate(
    id,
    {
      name,
      tanggal,
      toDo: toDo, // Change empty string to null to avoid trimming
    },
    { new: true }
  )
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occurred");
    });
});
  

// Rute untuk penghapusan pengguna berdasarkan ID
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id)
    .then(() => res.json("User delete successful"))
    .catch(err => {
      console.log(err);
      res.status(500).json("An error occurred");
    });
});

// Rute untuk pembuatan pengguna baru
app.post('/create', (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json("An error occurred");
    });
});

// Menjalankan server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});