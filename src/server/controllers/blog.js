const { execSQL } = require('../db/mysql.js')

// 博客相关的方法
const getBlogList = (author, keyword) => {
    // 从数据库里拿数据
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    console.log('sql', sql);
    return execSQL(sql)
}

const getBlogDetail = (id) => {
    let sql = `select * from blogs where id='${id}'`
    return execSQL(sql).then(rows => {
        console.log('rows', rows);
        return rows[0]
    })
}

const createNewBlog = (blogData = {}) => {
    // blogData的内容
    const {title, content, author} = blogData
    const createdAt = Date.now()

    let sql = `insert into blogs (title, content, author, createdAt) values ('${title}', '${content}', '${author}', ${createdAt});`
    return execSQL(sql).then(insertedResult => {
        console.log('insertedResult', insertedResult);
        return {
            id: insertedResult.insertId
        }
    })
}

const updateBlog = (id, blogData={}) => {
    const {title, content} = blogData
    let sql = `update blogs set title='${title}', content='${content}' where id=${id};`
    return execSQL(sql).then(updateResult => {
        console.log('updateResult', updateResult);
        if(updateResult.affectedRows > 0) {
            return true
        }
        return false
    })
}

const deleteBlog = (id, author) => {
    let sql = `delete from blogs where id=${id} and author='${author}';`
    return execSQL(sql).then(deleteResult => {
        if(deleteResult.affectedRows > 0){
            return true
        }
        return false
    })
}

module.exports = {
    getBlogList,
    getBlogDetail,
    createNewBlog,
    updateBlog,
    deleteBlog
}