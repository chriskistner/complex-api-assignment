const model = require('../models/tags');

function getAllTags (req, res, next) {
    const tagID = req.params.id
    const result = model.getAllTags(tagID)
    res.status(200).send(result);

  };

  function getTag (req, res, next) {
    const costumeID = req.params.id;
    const tagID = req.params.tagID;
    const result = model.getTag(costumeID, tagID)
    res.status(200).send(result);
  };

  function deleteTag (req, res, next) {
    const costumeID = req.params.id;
    const tagID = req.params.tagID;
    const result = model.deleteTag(costumeID, tagID)
    res.status(200).send(result);
  };

  function addTag (req, res, next) {
      const costumeID = req.params.id;
      const {name, color} = req.body;
      const result = model.addTag(costumeID, name, color);
      res.status(200).send(result);
  }

  function updateTag (req, res, next) {
    const costumeID = req.params.id;
    const tagID = req.params.tagID;
    const tagToChange = model.getTag(costumeID, tagID);
    const {name, color} = req.body;
    const result = model.updateTag(tagToChange[0].id, name, color);
    res.status(200).send(result);
}

  module.exports = { getAllTags, getTag, deleteTag, addTag, updateTag };