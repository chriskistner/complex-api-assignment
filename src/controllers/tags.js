const model = require('../models/tags');

function getAllTags (req, res, next) {
    const tagID = req.params.id
    const result = model.getAllTags(tagID)
    if (!result)
    return next({status: 404, message: "Costume has no Tags!"})
    res.status(200).send(result);

  };

function getTag (req, res, next) {
    const costumeID = req.params.id;
    const tagID = req.params.tagID;
    const result = model.getTag(costumeID, tagID)
    if (!result)
    return next({status: 404, message: "Tag Not Found!"})
    res.status(200).send(result);
  };

function deleteTag (req, res, next) {
    const costumeID = req.params.id;
    const tagID = req.params.tagID;
    const result = model.deleteTag(costumeID, tagID);
    if (!result)
    return next({status: 404, message: "Tag Not Found!"})
    res.status(200).send(result);
  };

function addTag (req, res, next) {
    const costumeID = req.params.id;
    const {name, color} = req.body;
    if (name.length > 10)
    return next({status: 400, message: "Your Name is too long!"})
    if (color[0] !== "#" || color.length < 4)
    return next({status: 400, message: "color must be valid Hex Color"})
    const result = model.addTag(costumeID, name, color);
    res.status(200).send(result);
  }

function updateTag (req, res, next) {
    const costumeID = req.params.id;
    const tagID = req.params.tagID;
    const tagToChange = model.getTag(costumeID, tagID);
    const {name, color} = req.body;
    if (name.length > 10)
    return next({status: 400, message: "Your Name is too long!"});
    if (color[0] !== "#")
    return next({status: 400, message: "color must be valid Hex Color"});
    const result = model.updateTag(tagToChange[0].id, name, color);
    res.status(200).send(result);
}

  module.exports = { getAllTags, getTag, deleteTag, addTag, updateTag };