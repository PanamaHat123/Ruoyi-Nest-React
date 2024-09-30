module.exports = {
    "server":{
        "port": 8081
    },
    "redis":{
        "host": "localhost",
        "port": 6379,
        "password": "",
        "db": 0
    },
    "typeOrm":{
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '*****',
        database: 'ruoyi-en',
        synchronize: false,
        logging: true,
        connectorPackage: 'mysql2',
        "extra": {
            "connectionLimit": 10, // 根据需要调整连接池大小
            "acquireTimeout": 10000, // 获取连接的超时时间
            "waitForConnections": true, // 当没有连接可用时是否等待
            "queueLimit": 0, // 排队等待连接的请求数量限制
            "idleTimeout": 60000, // 空闲连接超时时间（毫秒）
            "connectTimeout": 30000, // 连接超时时间（毫秒）
        },
        "keepConnectionAlive": true,
        retryDelay: 3000, // 重试间隔时间（毫秒）
        retryAttempts: 10, // 重试次数
    },
    "swagger":{
        enable:true,
        title:"nest-react-app",
        desc:"Background system based on Nest.js + Umi full stack development",
        version:"1.0.0"
    }

}