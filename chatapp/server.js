const  mongo = require('mongodb').MongoClient;
const httpServer = require("http").createServer((req, res) => {
    res.setHeader({'Access-Control-Allow-Origin': '*'});
});
const io = require("socket.io")(httpServer, {
    cors:{
        origin: "*"
    }
});
const cors = require("cors")



httpServer.listen(4000, () => {
    // connect to mongo
    mongo.connect('mongodb://127.0.0.1/mongochat', (err, db) => {
        if (err) {
            throw err;
        }
            console.log('MongoDB connected...');

        

        // connect to socket.io
        io.on('connection', (socket) => {
            const chat = db.collections('chats');

            //create function to send status
            const sendStatus = (s) => {
                socket.emit('status', s);
            }
            // get chat from mongo collection
            chat.find().limit(100).sort({ _id: 1 }).toArray((err, res) => {
                if (err) {
                    throw err;
                }
                //Emit messages
                socket.emit('output', res);
            });
            socket.on('input', (data) => {
                const name = data.name;
                const message = data.message;

                // check for name and message
                if (name == '' || message == '') {
                    // send error status
                    sendStatus('please enter a name and message');
                } else {
                    // insert messages
                    chat.insert({ name: name, message: message }, () => {
                        client.emit('output', [data]);
                        // send status object
                        sendStatus({
                            message: 'message sent',
                            clear: true
                        })
                    });
                }
            });
            // Handle clear
            socket.on('clear', (data) => {
                /// remove all chat from collection
                chat.remove({}, () => {
                    // emit cleared 
                    socket.emit('cleared');
                })
            })
        });
    });
})


