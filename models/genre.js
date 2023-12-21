const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: { type: String, required: true }
});

//Virtual for book's URL
 GenreSchema.virtual("url").get(function (){
    //We dont use an arrow function as we will need to use 'this' object
    return `/catalog/genre/${this._id}`

 });

 //Export model
 module.exports = mongoose.model("Genre", GenreSchema);