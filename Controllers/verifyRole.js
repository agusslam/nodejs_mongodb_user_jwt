const userModel = require('../Models/user')

module.exports = {
    async isMember (req,res,next) {
        try {
            const userSearch = await userModel.findOne({username: req.userId})
            if(userSearch.role == "member"){ next(); return userSearch}
            else{res.status(403).send({message: "Not Otoris Here",})}return
        } catch (error) {
            res.status(403).send({message:`Not Autoris ${error.message}`})
        }
    }

} 