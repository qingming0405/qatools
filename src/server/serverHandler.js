const handleBlogRoute = require('./routes/blog.js')
const querystring = require('querystring')

// 处理POST数据
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST') {
            resolve({})
            return
        }

        if(req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        // post请求的信息
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })

        req.on('end', () => {
            if(!postData) {
                resolve({})
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })

    return promise
}

const serverHandler = (req, res) => {
    // 设置响应格式
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','X-Request-With');
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1');
    // res.setHeader("Content-Type", "text/html");

    // 获取path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析query
    req.query = querystring.parse(url.split('?')[1])

    // 处理POST数据
    getPostData(req).then(postData => {
        req.body = postData

        // 博客相关的路由
        const blogDataPromise = handleBlogRoute(req, res)
        if(blogDataPromise) {
            blogDataPromise.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        // 未匹配到任何路由
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('404 Not Found')
        res.end()
    })

    
}

module.exports = serverHandler;