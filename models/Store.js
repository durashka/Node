const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const slug = require('slugs')

const storeSchema = new mongoose.Schema({
name: {
    type: String,
    trim: true, 
    require: 'Please enter store name'
},
slug: String,
description: {
    type: String,
    trim: true
},
tags: [String],
created: {
    type: Date, default: Date.now
},
location: {
    type: {
        type: String, default: 'Point'
    },
    coordinates: [{
        type: Number,
        required: 'You must supply coordinates!'
    }],
    address:{
        type: String,
        required: 'Must have address'
    }
}
})

storeSchema.pre('save', function(next){
    if(!this.isModified('name')){
        next()
        return;
    }
    this.slug = slug(this.name)
    next()
})

module.exports = mongoose.model('Store', storeSchema)