const fs = require('fs');
const uuid = require('uuid/v4');
const path = require('path');

function getAllTags(id) {
    const tags = fs.readFileSync(path.join(__dirname,'../../data/tags.json'),'utf-8');
    const costumes = fs.readFileSync(path.join(__dirname,'../../data/costumes.json'),'utf-8');
    const allTags = JSON.parse(tags);
    const allCostumes = JSON.parse(costumes);
    let specificCostume = allCostumes.data.find(costume => costume.id === id)
    if (!specificCostume) {
        return null;
    }
    const result = [];
    for (let specificTags of specificCostume.tags) {
        for (let tag in allTags.data) {
            let assignedTags = allTags.data
            if(assignedTags[tag].id === specificTags) {
                result.push(assignedTags[tag]);
        }
    }
}
    return result;
};

function getTag(costumeID, tagID) {
    const tags = fs.readFileSync(path.join(__dirname,'../../data/tags.json'),'utf-8');
    const costumes = fs.readFileSync(path.join(__dirname,'../../data/costumes.json'),'utf-8');
    const allTags = JSON.parse(tags);
    const allCostumes = JSON.parse(costumes);
    let specificCostume = allCostumes.data.find(costume => costume.id === costumeID);
    if (!specificCostume) {
        return null;
    }
    const result = [];
    for (let specificTag of specificCostume.tags) {
        if (specificTag === tagID) {
            const index = allTags.data.findIndex(tag=> tag.id === specificTag);
            result.push(allTags.data[index]);
        }
    }
    return result;
};

function deleteTag(costumeID, tagID) {
    const tags = fs.readFileSync(path.join(__dirname,'../../data/tags.json'),'utf-8');
    const costumes = fs.readFileSync(path.join(__dirname,'../../data/costumes.json'),'utf-8');
    const allTags = JSON.parse(tags);
    const allCostumes = JSON.parse(costumes);
    let specificCostume = allCostumes.data.find(costume => costume.id === costumeID);
    const result = allTags.data.find(tag => tag.id === tagID);
    for (let specificTag of specificCostume.tags) {
        if (specificTag === tagID) {
            const index = specificCostume.tags.findIndex(tag=> tag.id === specificTag);
            console.log(index);
            specificCostume.tags.splice(index,1);
            const dbIndex = allTags.data.findIndex(tag=> tag.id === specificTag);
            allTags.data.splice(dbIndex,1);
        }
    }
    fs.writeFileSync(path.join(__dirname,'../../data/tags.json'), JSON.stringify(allTags), 'utf-8');
    fs.writeFileSync(path.join(__dirname,'../../data/costumes.json'), JSON.stringify(allCostumes), 'utf-8');
    return result;
};

function newTag (name, color) {
    let newTag = { id: uuid().slice(0,8), name, color };
    const tags = fs.readFileSync(path.join(__dirname,'../../data/tags.json'), 'utf-8');
    const allTags = JSON.parse(tags);
    allTags.data.push(newTag);
    fs.writeFileSync(path.join(__dirname,'../../data/tags.json'), JSON.stringify(allTags), 'utf-8');
    return newTag;
  };

  function addTag (costumeID, name, color) {
    const tags = fs.readFileSync(path.join(__dirname,'../../data/tags.json'),'utf-8');
    const costumes = fs.readFileSync(path.join(__dirname,'../../data/costumes.json'),'utf-8');
    const allTags = JSON.parse(tags);
    const allCostumes = JSON.parse(costumes);
    let specificCostume = allCostumes.data.find(costume => costume.id === costumeID);
    const returnTag = newTag(name, color);
    allTags.data.push(returnTag);
    specificCostume.tags.push(returnTag.id);
    fs.writeFileSync(path.join(__dirname,'../../data/tags.json'), JSON.stringify(allTags), 'utf-8');
    fs.writeFileSync(path.join(__dirname,'../../data/costumes.json'), JSON.stringify(allCostumes), 'utf-8');
    return returnTag;
  }

  function updateTag ( tagID, name, color) {
    const tags = fs.readFileSync(path.join(__dirname,'../../data/tags.json'),'utf-8');
    const allTags = JSON.parse(tags);
    let specificTag = allTags.data.find(tag => tag.id === tagID);
    specificTag.name = name;
    specificTag.color = color;
    fs.writeFileSync(path.join(__dirname,'../../data/tags.json'), JSON.stringify(allTags), 'utf-8');
    return specificTag;
  };

module.exports = {
    getAllTags,
    getTag,
    deleteTag,
    newTag,
    addTag,
    updateTag,
}