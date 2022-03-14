const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    candidate: {
        type: Number,
        required: [true, "You must choose a candidate"],
    },
    news: {
        type: Boolean,
        required: [true, "Which newspaper is it ?"]
    },
    positivity: {
        type: Boolean,
        required: [true, "Do you want to be negative or positive"],

    },
    createdAt: {
        type: Date
    },
    template: {
        type: Number,
        required: [true, "Choose a template"],
    }
})

module.exports = mongoose.models.Article || mongoose.model('Article', ArticleSchema);