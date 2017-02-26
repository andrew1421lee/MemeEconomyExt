document.addEventListener('DOMContentLoaded', function() {
    var uname;
    chrome.storage.sync.get("name", function(item){
        uname = item.name;
        var usertext = document.getElementById("usertext");
        usertext.innerText = uname;

        var button = document.getElementById("namebutton");
        button.onclick = function(){
            changename();
        }
    });
    

    function changename(){
        var newname = prompt("Please enter a new name", uname);
        if(newname != null){
            chrome.storage.sync.set({"name": newname});
            usertext.innerText = newname;
        }
    }
});