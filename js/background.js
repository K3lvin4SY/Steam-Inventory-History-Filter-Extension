function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie.value);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var checkButton = document.getElementById('popupBtn');
    checkButton.addEventListener('click', function() {
        //alert("Hey your button is working!");
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            //chrome.tabs.sendMessage(tabs[0].id, { type: "change-color" });
            console.log("testBG");
            getCookies("https://steamcommunity.com/", "sessionid", function(id) {
                alert(id);
            });
        });
    }, false);
}, false);

//usage:
getCookies("https://steamcommunity.com/", "sessionid", function(id) {
    alert(id);
});