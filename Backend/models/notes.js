const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
        },
        tags: {
            type: [String],
            default: [],
        },
        isPinned: {
            type: Boolean,
            default: false,
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
        reminderDate: {
            type: Date,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;