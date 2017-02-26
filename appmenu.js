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

    var button = document.getElementById("refreshbutton");
    button.onclick = function(){
        updateTable();
    }

    function updateTable(){
        var json = [{"User_Name":"John Doe","score":"10","team":"1"},{"User_Name":"Jane Smith","score":"15","team":"2"},{"User_Name":"Chuck Berry","score":"12","team":"2"}];
        var tr;
        for (var i = 0; i < json.length; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + json[i].User_Name + "</td>");
            tr.append("<td>" + json[i].score + "</td>");
            tr.append("<td>" + json[i].team + "</td>");
            $('table').append(tr);
        }
    }
});