const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const posts = require('./posts.json');

const getFilteredItem = (post, str) => {
    if (str) {
        return post.length > 0 && post.filter(post => {
            return (post.address.indexOf(str) > -1)
        })
    }
    return post;

}


app.get('/api/posts', (req, res) => {
    const postCount = posts.length;

    const perPage = 10;
    const pageCount = Math.ceil(postCount / perPage);

    let page = parseInt(req.query.p);
    let address = req.query.address;
    if (page < 1) page = 1;
    if (page > pageCount) page = pageCount;

    const from = (page == 1 ? page : (page * perPage)) - 1;
    let to = (from + perPage);
    const getFilteredPosts = getFilteredItem(posts, address);
    res.json({
        posts: getFilteredPosts.slice(from, to),
        page,
        pageCount,
        address
    });
});



app.listen(port, () => console.log(`Pagination  app listening on port ${port}!`))