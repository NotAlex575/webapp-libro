const errorsHandler = (err, req, res, next) => {
    //inernal server error
    res.status(500).json({
        error: err.message
    })
}

module.exports = errorsHandler;