const model = require('../models/costumes');

function getAll (req, res, next) {
    const result = model.getAll()
    res.status(200).send(result);
  };

  function getOne (req, res, next) {
    const costumeID = req.params.id;
    const result = model.getOne(costumeID);
    if (!result)
    return next({ status: 404, message: "Costume Does Not Exist" });
    res.status(302).send(result);
  }

  function deleteOne(req, res, next) {
      const costumeID = req.params.id;
      const result = model.deleteOne(costumeID);
      if (!result)
      return next({ status: 404, message: "Can't delete what doesn't exist" });
      res.status(200).send(result);
  }

  function newCostume(req, res, next) {
    const {name, price, description, tags} = req.body;
    console.log(tags);
    let result = model.newCostume(name, price, description, tags);
    if (!result)
    return next({ status: 400, message: "Hey you forgot your costume!" });
    res.status(201).send(result);
  }

  function updateCostume(req, res, next) {
    const id = req.params.id;
    const {name, price, description, tags} = req.body;
    if (!id)
    return next({ status: 400, message: "Hey I can't update what you don't give me!" });
    let result = model.updateCostume(id, name, price, description, tags);
    res.status(201).send(result);
  }

  module.exports = { getAll, getOne, deleteOne, newCostume, updateCostume };