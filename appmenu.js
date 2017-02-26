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
        var oldtable = document.getElementById("infotable0");
        if(oldtable != null){
            oldtable = oldtable.parentNode.childNodes;
            for(var i = 1; i < oldtable.length; i++){
                oldtable[i].parentNode.removeChild(oldtable[i]);
            }
        }
        
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://149.125.136.182:4443/request/username=Etirps");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onload = function() {
            var json = JSON.parse(xhttp.responseText)
            var tr;
            var bankmoney = document.getElementById("money");
            var status = document.getElementById("state");
            status.innerText = "Connected to server";
            bankmoney.innerText = json["bank"].toFixed(2);
            for (var i = 0; i < json["purchase_arr"].length; i++) {
                (function(s) {
                    tr = $('<tr id="infotable' + s.toString() + '"' + '/>');
                    tr.append("<td><a href='" + "https://reddit.com" + json["purchase_arr"][s].segment_url + "'>" + json["purchase_arr"][s].segment_url.trunc(60) + "</a></td>");
                    tr.append("<td>" + json["purchase_arr"][s].shares + "</td>");
                    tr.append("<td>" +  "$" + json["purchase_arr"][s].purchased_price_per_share.toFixed(2) + "</td>");
                    if(json["purchase_arr"][s]["data_available"]){
                        tr.append("<td>" + json["purchase_arr"][s].multiplier.toFixed(1) + "</td>");
                        try{
                            tr.append("<td >" + "$" + json["purchase_arr"][s].value.toFixed(2) + "</td>");
                        }
                        catch(err){
                            tr.append("<td >" + "N/A" + "</td>");
                        }
                    }else{
                        tr.append("<td>" + "N/A" + "</td>");
                        tr.append("<td>" + "N/A" + "</td>");
                    }
                    tr.append("<td><button id='sell" + s + "'>Sell</button></td>");
                    $('table').append(tr);
                    var mbutton = document.getElementById("sell" + s.toString());
                    mbutton.onclick = function(){
                        SellStock(mbutton, json["purchase_arr"][s].purchase_id);
                    }
                    
                })(i);
                
            }
        };
        xhttp.send();
    }
});

function SellStock(ele, id){
    if(confirm("Sell this stock?")){
        //alert(id);
        var index = ele.getAttribute("id");
        index = index.substr(index.length-1);

        var urlsnip = document.getElementById("infotable" + index.toString());
        urlsnip = (urlsnip.childNodes[0].childNodes[0].getAttribute("href"));
        //alert(urlsnip);
        urlsnip = urlsnip.substring(18).replace(/\//g, "|");
        //alert(urlsnip);
        alert("https://149.125.136.182:4443/sell/username=Etirps/url-segment='" + urlsnip + "'/shares=" + id);
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://149.125.136.182:4443/sell/username=Etirps/url-segment='" + urlsnip + "'/shares=" + id);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onload = function() {
            var json = JSON.parse(xhttp.responseText);
            if(json["changed"]){
                var updateBank = document.getElementById("money");
                updateBank.innerText = json["bank"].toFixed(2);
                updateTable();
            }else{
                alert("Failed to sell");
            }
        }
        xhttp.send();
    }else{
        //
    }
    
}

String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0, n-1) + '[...]' : this;
      };
