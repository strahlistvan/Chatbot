
    function ChatBot(accessToken, responseHandlerFunction) {
        
        this.accessToken = "7f7477c649f044c8ae2ec2dc24936701";
        this.baseUrl = "https://api.api.ai/v1/";
        this.responseHandlerFunction = responseHandlerFunction;
        
        this.send = function(messageText, handler = this.responseHandlerFunction) {
            function setResponse(val) {
                var responseObject = JSON.parse(val);
                var responseText   = responseObject.result.fulfillment.speech;
                //custom function parameter to handle response
                handler(responseText);
            };

            $.ajax({
                type: "POST",
                url: this.baseUrl + "query?v=20150910",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    "Authorization": "Bearer " + this.accessToken
                },
                data: JSON.stringify({ query: messageText, lang: "en", sessionId: "somerandomthing" }),
        
                success: function(data) {
                    setResponse(JSON.stringify(data, undefined, 2));
                },
                error: function() {
                    setResponse("Internal Server Error");
                }
            });
        };
        
    }
    
