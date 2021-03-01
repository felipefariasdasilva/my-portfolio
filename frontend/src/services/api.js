const baseURL = 'http://localhost:8181'

const request = async (method, endpoint, params, token = null) => {

    method = method.toLowerCase()
    let fullURL = `${baseURL}${endpoint}`
    let body = null
    
    switch(method){
        case 'get':
            let queryString = new URLSearchParams(params).toString()
            fullURL += `?${queryString}`
            break
        case 'post':
        case 'put':
        case 'delete':
            body = JSON.stringify(params)
            break
    }
    
    let headers = {'Content-Type': 'application/json'}

    let req = await fetch(fullURL, {method, headers, body})
    let json = await req.json()
    return json

}

export default () => {

    return {

        getArticles: async () => {
            let json = await request('get', '/articles', {}, null)
            return json
        },

        getArticleById: async (id) => {
            let json = await request('get', `/articles/${id}`, {}, null)
            return json
        },

        createArticle: async (data) => {
            let json = await request('post', '/articles', data, null)
            return json
        },

        deleteArticle: async (id) => {
            let json = await request('delete', `/articles/${id}`, {}, null)
            return json
        },

        updateArticle: async (id, data) => {
            console.log(data);
            let json = await request('put', `/articles/${id}`, data, null)
            return json
        }

    }
}