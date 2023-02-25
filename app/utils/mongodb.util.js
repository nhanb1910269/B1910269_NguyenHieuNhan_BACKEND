const   {MongoClient} = require("mongodb");

class MongoDB{
    static connect = async (url) => {
        if (this.client) return this.client;
        this.client = await MongoClient.connect(url);
        return this.client;
    }
}

module.exports = MongoDB;