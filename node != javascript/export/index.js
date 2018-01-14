exports.id = 1; // this is okay

exports = { id: 1 } // this is not okay

// when we need to exports an object, we need to use module.exports
module.exports = { id: 1 } // this is okay