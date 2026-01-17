const mongoose = require('mongoose');
const{Schema,SchemaTypes,model} = mongoose;

const categorySchema = new Schema({
    Name:{
        type : SchemaTypes.String,
        required : true,
        minLength : 3
    },
    Color:{
        type : SchemaTypes.String,
        required : true,
    }
});

const Category = model('Category',categorySchema);
module.exports = {Category};