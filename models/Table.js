
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tableSchema = new Schema({
    number: Number,
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;