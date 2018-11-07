const fs = require('fs');
const uuid = require('uuid/v4');
const path = require('path');

function getAll () {
    const costumes = fs.readFileSync(path.join(__dirname,'../../data/costumes.json'),'utf-8');
    const allCostumes = JSON.parse(costumes);
    return allCostumes;
};

function getOne (id) {
    const costumes = fs.readFileSync(path.join(__dirname,'../../data/costumes.json'), 'utf-8');
    const allCostumes = JSON.parse(costumes);
    let result = allCostumes.data.find(outfit => outfit.id === id)
    if (!result) {
        result = null;
    }
    return result;
}

function deleteOne(id) {
    const costumes = fs.readFileSync(path.join(__dirname,'../../data/costumes.json'), 'utf-8');
    const allCostumes = JSON.parse(costumes);
    const result = allCostumes.data.find(outfit => outfit.id === id);
    const index = allCostumes.data.findIndex(outfit => outfit.id === id);
    console.log(result);
    allCostumes.data.splice(index,1);
    fs.writeFileSync(path.join(__dirname,'../../data/costumes.json'), JSON.stringify(allCostumes), 'utf-8');
    return result;
};

function newCostume (name, price, description, tags) {
    let newCostume = { id: uuid(), name, price, description, tags };
    const errors = [];
    const costumes = fs.readFileSync(path.join(__dirname,'../../data/costumes.json'), 'utf-8');
    const allCostumes = JSON.parse(costumes);
    if(!newCostume.name) {
        errors.push('name is required');
        newCostume = { errors };
    } else if (!newCostume.price) {
        errors.push('Hey this must cost something??');
        newCostume = { errors};
    } else {
    allCostumes.data.push(newCostume);
    fs.writeFileSync(path.join(__dirname,'../../data/costumes.json'), JSON.stringify(allCostumes), 'utf-8');
};
    return newCostume;
  };

  function updateCostume (id, name, price, description, tags) {
    const updatedCostume = { id, name, price, description, tags };
    const costumes = fs.readFileSync(path.join(__dirname,'../../data/costumes.json'), 'utf-8');
    const allCostumes = JSON.parse(costumes);
    let result = allCostumes.data.find(outfit => outfit.id === updatedCostume.id);
    if (updatedCostume.name) {
        result.name = updatedCostume.name;
    };
    if(updatedCostume.price){
        result.price = updatedCostume.price;
    };
    if(updateCostume.description) {
        result.description = updatedCostume.description;
    }
    if(updateCostume.tags) {
        result.tags = updatedCostume.tags;
    }
    fs.writeFileSync(path.join(__dirname,'../../data/costumes.json'), JSON.stringify(allCostumes), 'utf-8');
    return result;
  };
// getAll();
// newCostume('MasterChief', 79.99, 'Full body suilt w plastic helmet and MA5-B Assault Rifle', 'test tag')
// getOne('1b3f4156-09ad-42c7-a11a-69fc2934f9e7');
// deleteOne('1b3f4156-09ad-42c7-a11a-69fc2934f9e7');
// console.log(updateCostume('0d23cd67-f0cc-4a60-a090-f61cf68cef86', 'MasterChief mk6', 59.95,));

module.exports = {
    getAll,
    getOne,
    deleteOne,
    newCostume,
    updateCostume
}