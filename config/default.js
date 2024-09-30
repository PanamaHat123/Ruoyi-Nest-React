module.exports = {
    "server":{
        "port": 3000
    },
    jwt:{
        "secretkey": "you_secretkey",
        "expiresIn": 1000*60*60*2, //2 an hour
        "refreshExpiresIn": "2h"
    },
    perm:{
        router:{
            whitelist:[
                { path: '/code', method: 'GET' },
                { path: '/register', method: 'POST' },
                { path: '/auth/login', method: 'POST' },
                { path: '/auth/logout', method: 'POST' },
                { path: '/perm/{id}', method: 'GET' },
                { path: '/upload', method: 'POST' },
            ]
        }
    },
    gen:{
        "author":"ruoyi",
        "packageName":"system/src",
        "moduleName":"system",
        "autoRemovePre":true,
        "tablePrefix": ['sys_','t_','o_','i_','c_','d_'],
    }
}