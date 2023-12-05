var express = require("express")
var router = express.Router()

router.get('/', (req,res, next) => {
    res.render("trackers/index", {title: "Tracker"})
})

module.exports = router
