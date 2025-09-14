module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'root',
    DB: 'cobblestone_library_db',
    dialect: 'mysql',

    /**Pooling is for having a pre-set of connections
     * for the client so it doesn't have to create new connections for
     * each request
      */
    pool :{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}