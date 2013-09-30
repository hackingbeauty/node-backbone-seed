(function(){

    var messages =[],
        socket = io.connect('http://localhost:3700'),
        chatInput = document.getElementById('chat-input'),
        sendButton = document.getElementById('chat-send-button');

    window.CHAT_WIDGET = {
        init: function(){
            this.receiveMsg();
            this.sendMsg();
        },
        receiveMsg: function(){
            socket.on('message', function (data) {
                if(data.message) {
                    messages.push(data);
                    var html = '';
                    for(var i=0; i<messages.length; i++) {
                        html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                        html += messages[i].message + '<br />';
                    }
                    content.innerHTML = html;
                } else {
                    console.log("There is a problem:", data);
                }
            });
        },
        sendMsg: function(){
            sendButton.onclick = function() {
                socket.emit('send', { message: "oh hello there", username: name.value });

                // alert("clicked sendButton")
                // if(name.value == "") {
                //     alert("Please type your name!");
                // } else {
                //     var text = field.value;
                // }
                // return false;
            };
        }
    }

    window.CHAT_WIDGET.init();

})();


