document.addEventListener('DOMContentLoaded', function() {
    updateTable();
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
        button.disabled = true;
        updateTable();
        setTimeout(function(){
            button.disabled = false;
        }, 5000);

    }

    function updateTable(){
        var oldtable = document.getElementById("infotable");
        if(oldtable != null){
            oldtable.parentNode.removeChild(oldtable);
        }
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://149.125.136.182:1234/request/username=Etirps/url-segment=xd/shares=1");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onload = function() {
            var json = JSON.parse(xhttp.responseText)
            var tr;
            var bankmoney = document.getElementById("money");
            bankmoney.innerText = json["bank"].toFixed(2);
            for (var i = 0; i < json["purchase_arr"].length; i++) {
                tr = $('<tr id="infotable"/>');
                tr.append("<td>" + json["purchase_arr"][i].segment_url.trunc(70) + "</td>");
                tr.append("<td>" +  "$" + json["purchase_arr"][i].purchased_price_per_share.toFixed(2) + "</td>");
                if(json["purchase_arr"][i]["data_avaliable"]){
                    tr.append("<td>" + "$" + json["purchase_arr"][i].value.toFixed(2) + "</td>");
                }else{
                    tr.append("<td>" + "N/A" + "</td>");
                }
                $('table').append(tr);
            }
        };
        xhttp.send();
    }
});

String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0, n-1) + '[...]' : this;
      };
