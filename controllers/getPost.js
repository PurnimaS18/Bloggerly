const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    const post = await Post.findById(req.params.id);
    const lines = post.content.split('\n');
    res.render("post", {
        post,
        lines
    });
}