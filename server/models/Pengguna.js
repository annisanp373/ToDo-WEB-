const mongoose = require('mongoose')

const PenggunaSchema = new mongoose.Schema({
    nama: String,
    email: String,
    password: String
})

const PenggunaModel = mongoose.model("pengguna", PenggunaSchema)
module.exports = PenggunaModel;