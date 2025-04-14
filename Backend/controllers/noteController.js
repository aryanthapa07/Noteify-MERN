const Note = require("../models/notes");

//CREATE NOTE
const createNote = async (req, res) => {
  const { title, content, tags, isPinned, isArchived, reminderDate } = req.body;
  try {
    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      tags,
      isPinned,
      isArchived,
      reminderDate,
    });
    res.status(201).json(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to Create Note", error: error.message });
  }
};

//GET ALL NOTES OF LOGGED IN USER
const getNotes = async (req, res) => {
  const { tag, search } = req.query;
  try {
    const query = {
      user: req.user._id,
    };
    if (tag) {
      query.tags = tag;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }
    const notes = await Note.find(query).sort({
      updatedAt: -1,
    });
    res.status(200).json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch notes", error: error.message });
  }
};

//UPDATE NOTE
const updateNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { ...req.body },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update note", error: error.message });
  }
};

//DELETE NOTE

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndDelete({ _id: id, user: req.user._id });
    if (!note) {
      res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note Deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete note", error: error.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
