const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    const posts = await Post.find({}).sort({$natural:-1});
    res.render("index", {
        posts
    });
}