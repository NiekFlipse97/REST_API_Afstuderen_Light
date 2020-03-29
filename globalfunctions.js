function getResponse(promise, res) {
    promise
        .then(repoObject => {
            res.status(repoObject.status).json(repoObject)
        })
        .catch(repoObject => {
            res.status(repoObject.status).json(repoObject)
        })
}

module.exports = {
    getResponse
};