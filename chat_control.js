$(document).ready(function() {

    var messageSendButton = $("#msg_send_btn");
    var messageInput = $("#message_input");

    var dateFormat = function(date) {
        var str = date.getHours() < 10 ? "0" : "";
        str += date.getHours() + ":"; 
        str += date.getMinutes() < 10 ? "0" : "";
        str += date.getMinutes();
        return str;
    }
    
    var scrollDown = function() {
        var msgHistoryHeight = document.querySelector("#msg_history").scrollHeight;
        console.log("scroll height: " + msgHistoryHeight);
        document.querySelector("#msg_history").scrollTo(0,msgHistoryHeight);
    }

    var appendIncomingMessageDOM = function(messageText) {
        var incomingMsgDiv = $("<div></div>").attr("class", "incoming_msg").appendTo("#msg_history");
        
        var incomingMsgImgDiv = $("<div></div>").attr("class", "incoming_msg_img").appendTo(incomingMsgDiv);
        $("<img></img>").attr({"src" : "robot-chef-cap-pizza-red-2.jpg", "alt" : "PizzaBot"} )
                        .appendTo(incomingMsgImgDiv);
        
        var receivedMsgDiv = $("<div></div>").attr("class", "received_msg").appendTo(incomingMsgDiv);
        var receivedWithMsgDiv = $("<div></div>").attr("class", "received_withd_msg").appendTo(receivedMsgDiv);
        $("<p></p>").text(messageText).appendTo(receivedWithMsgDiv);
        $("<span></span>").attr("class", "time_date")
                          .text("Today - " + dateFormat(new Date()))
                          .appendTo(receivedWithMsgDiv);
        scrollDown();                                        
    }

    var appendOutgoingMessageDOM = function(messageText) {
        var outgoingMsgDiv = $("<div></div>").attr("class", "outgoing_msg").appendTo("#msg_history");
        var sentMsgDiv = $("<div></div>").attr("class", "sent_msg").appendTo(outgoingMsgDiv);
        $("<p></p>").text(messageText).appendTo(sentMsgDiv);
        $("<span></span>").attr("class", "time_date")
                          .text("Today - " +dateFormat(new Date()))
                          .appendTo(sentMsgDiv);
        scrollDown();                                        
    }
 
    var chatbot = new ChatBot("7f7477c649f044c8ae2ec2dc24936701", appendIncomingMessageDOM);
 
    messageSendButton.click(function(){
        appendOutgoingMessageDOM(messageInput.val());
        chatbot.send(messageInput.val());
    });
    
    messageInput.keypress(function(event){
        if (event.keyCode == 13) {
            appendOutgoingMessageDOM(messageInput.val());
            chatbot.send(messageInput.val());
        }
    });
});
