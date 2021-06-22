const { SuccessModel, ErrorModel } = require("../model/responoseModel")
const { getBlogList, getBlogDetail, createNewBlog, updateBlog, deleteBlog } = require('../controllers/blog')

// 定义博客相关的路由
const handleBlogRoute = (req, res) => {
    // 定义处理路由的逻辑
    const method = req.method
    const id = req.query.id
    const blogData = req.body // 博客内容（获取到的post信息）

    // 指定url才返回
    if (method === 'GET' && req.path === '/api/blog/list') {
        // 博客列表路由
        // /api/blog/list?author=zhangsan&keyword=123
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listDataPromis = getBlogList(author, keyword)
        return listDataPromis.then(listData => {
            return new SuccessModel(listData)
        })
    }
    else if (method === 'GET' && req.path === '/api/blog/detail') {
        // 博客详情路由
        const detailDataPromise = getBlogDetail(id)
        return detailDataPromise.then(detailData => {
            return new SuccessModel(detailData)
        })
    }
    else if (method === 'POST' && req.path === '/api/blog/new') {
        // 新建博客路由
        const author = '张三' // 假定登录用户是张三
        req.body.author = author
        const newBlogDataPromise = createNewBlog(blogData)
        return newBlogDataPromise.then(newBlogData => {
            return new SuccessModel(newBlogData)
        })
    }
    else if (method === 'POST' && req.path === '/api/blog/update') {
        // 更新博客路由
        const updatedBlogDataPromise = updateBlog(id, blogData)
        return updatedBlogDataPromise.then(updatedBlogData => {
            if (updatedBlogData) {
                return new SuccessModel('更新博客成功！')
            }
            else {
                return new ErrorModel('更新博客失败...')
            }
        })
    }
    else if (method === 'POST' && req.path === '/api/blog/delete') {
        // 删除博客路由
        const author = '张三' // 假定登录用户是张三
        req.body.author = author
        const deleteBlogDataPromise = deleteBlog(id, author)
        return deleteBlogDataPromise.then(deleteBlogData => {
            if (deleteBlogData) {
                return new SuccessModel('删除博客成功！')
            }
            else {
                return new ErrorModel('删除博客失败...')
            }
        })
    }
}

module.exports = handleBlogRoute