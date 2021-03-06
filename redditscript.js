var uls = document.getElementsByClassName("flat-list buttons");
for(i = 0; i < uls.length; i++){
    (function(s) {
        var posttext = uls[s].parentElement;
        var post = posttext.parentElement;

        if(post.getAttribute("data-type") == "link"){
            var link = uls[s].firstChild.firstChild.getAttribute("data-inbound-url");
            //alert(link);
            var newbutton = document.createElement("button"); 
            newbutton.setAttribute("id", "investbutton");
            newbutton.innerText = "invest";

            newbutton.onclick = function() { 
                showInvestWindow(link);
            };

            uls[s].appendChild(newbutton);
        }

    })(i);
}

function showInvestWindow(link){
    chrome.storage.sync.get("name", function(item){
        var xhttp = new XMLHttpRequest();
        var str = link.toString().replace(/\//g, "|"),
            delimiter = '|',
            start = 6,
            tokens = str.split(delimiter).slice(0,start),
            cleanurl = tokens.join(delimiter);
        xhttp.open("GET", "https://149.125.136.182:4443/post/username=" + item.name + "/url-segment=" + cleanurl + "/shares=1");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onload = function() {
            var json = JSON.parse(xhttp.responseText)
            //alert(xhttp.responseText);
            openNav(link, cleanurl, json["bank"], json["purchase_arr"][0]["purchased_price_per_share"]);
        }
        xhttp.send();
    });
}

function openNav(dirtylink, link, bank, price) {
    var container = document.createElement("div");
    container.setAttribute("id", "popupcontainer");
    
    var window = document.createElement("div");
    window.setAttribute("id", "popupwindow");

    var title = document.createElement("h1");
    title.setAttribute("id", "xh1");
    title.innerText = "How many shares?";
    window.appendChild(title);

    var posturl = document.createElement("h3");
    posturl.setAttribute("id", "xh3");
    posturl.innerText = dirtylink.trunc(75);
    window.appendChild(posturl);

    var infocontainer = document.createElement("div");
    infocontainer.setAttribute("id", "infocontainer");

    var bankmoney = document.createElement("h2");
    bankmoney.setAttribute("id", "bankmoney");
    bankmoney.innerText = "Bank: $" + bank.toFixed(2).toString();
    infocontainer.appendChild(bankmoney);

    var pps = document.createElement("h2");
    pps.setAttribute("id", "pps");
    pps.innerText = "PpS: $" + price.toFixed(2).toString();
    infocontainer.appendChild(pps);

    var totalCost = document.createElement("h2");
    totalCost.setAttribute("id", "totalcost");
    totalCost.innerText = "Total: $0";
    infocontainer.appendChild(totalCost);


    window.appendChild(infocontainer);

    var btcontainer = document.createElement("div");
    btcontainer.setAttribute("id", "btcontainer");
    window.appendChild(btcontainer);
    
    var slider = document.createElement("INPUT");
    slider.setAttribute("type", "range");
    slider.setAttribute("id", "xslider");
    slider.setAttribute("value", 0);
    slider.onchange = function(){
        updateCashTextbox(slider.value);
        updateTotalMoney(slider.value, price);
    }
    btcontainer.appendChild(slider);

    var textbox = document.createElement("INPUT");
    textbox.setAttribute("type", "text");
    textbox.setAttribute("id","xtextbox");
    textbox.setAttribute("value", 0);
    textbox.onchange = function(){
        updateCashSlider(textbox.value);
        updateTotalMoney(textbox.value, price);
    }
    btcontainer.appendChild(textbox);
    

    var presetbuy1 = document.createElement("button");
    presetbuy1.setAttribute("id", "preset1");
    presetbuy1.innerText = "1";
    presetbuy1.onclick = function(){
        updateCashSlider(1);
        updateCashTextbox(1);
        updateTotalMoney(1, price);

    }
    btcontainer.appendChild(presetbuy1);

    var presetbuy2 = document.createElement("button");
    presetbuy2.setAttribute("id", "preset2");
    presetbuy2.innerText = "5";
    presetbuy2.onclick = function(){
        updateCashSlider(5);
        updateCashTextbox(5);
        updateTotalMoney(5, price);
    }
    btcontainer.appendChild(presetbuy2);

    var presetbuy3 = document.createElement("button");
    presetbuy3.setAttribute("id", "preset3");
    presetbuy3.innerText = "20";
    presetbuy3.onclick = function(){
        updateCashSlider(20);
        updateCashTextbox(20);
        updateTotalMoney(20, price);
    }
    btcontainer.appendChild(presetbuy3);

    var presetbuy4 = document.createElement("button");
    presetbuy4.setAttribute("id", "preset4");
    presetbuy4.innerText = "50";
    presetbuy4.onclick = function(){
        updateCashSlider(50);
        updateCashTextbox(50);
        updateTotalMoney(50, price);
    }
    btcontainer.appendChild(presetbuy4);

    var presetbuy5 = document.createElement("button");
    presetbuy5.setAttribute("id", "preset5");
    presetbuy5.innerText = "100";
    presetbuy5.onclick = function(){
        updateCashSlider(100);
        updateCashTextbox(100);
        updateTotalMoney(100, price);
    }
    btcontainer.appendChild(presetbuy5);

    var investbt = document.createElement("button");
    investbt.setAttribute("id", "investbt");
    investbt.innerText = "Purchase";
    investbt.onclick = function(){
        if(document.getElementById("xslider").value != 0){
            requestBuy(link, document.getElementById("xslider").value);
        }
    }
    window.appendChild(investbt);

    var closebt = document.createElement("button");
    closebt.setAttribute("id", "closebt");
    closebt.innerText = "Cancel";
    closebt.onclick = function(){
        closeNav();
    }
    window.appendChild(closebt);
    container.appendChild(window);
    document.body.appendChild(container);
}

function updateCashTextbox(val){
    document.getElementById('xtextbox').value=val;
}

function updateCashSlider(val){
    document.getElementById('xslider').value=val;
}

function updateTotalMoney(val, price){

    document.getElementById("totalcost").innerText = "Total: $" + (val*price).toFixed(2).toString();
}

function closeNav(){
    var nav = document.getElementById("popupcontainer");
    nav.parentNode.removeChild(nav);
}

function requestBuy(url, amt){
    chrome.storage.sync.get("name", function(item){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://149.125.136.182:4443/buy/username=" + item.name + "/url-segment=" + url + "/shares=" + amt);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onload = function() {
            var json = JSON.parse(xhttp.responseText);
            var success = json["changed"];
            var bank = json["bank"];
            //console.log(success);
            if(success){
                showPurchased("Purchase made", bank);
            }else{
                showPurchased("Purchaed failed", bank)
            }
        };
        xhttp.send();
        closeNav();
        
    });
}

function showPurchased(result ,money){
    var container = document.createElement("div");
    container.setAttribute("id", "popupcontainer");

    var window = document.createElement("div");
    window.setAttribute("id", "popupwindow");
    window.setAttribute("style", "text-align:center; height: 20%; width: 25%");

    var title = document.createElement("h1");
    title.setAttribute("id", "xh1");
    title.setAttribute("style", "position:static; padding-top:5%");
    title.innerText = result;

    var info = document.createElement("h3");
    info.setAttribute("id", "xh3");
    info.setAttribute("style", "position:static; display:inline; font-size:10pt;");
    info.innerText = "Current bank balance = ";

    var bankbal = document.createElement("h3");
    bankbal.setAttribute("id", "xh3");
    bankbal.setAttribute("style", "position:static; display:inline; font-size:10pt;");
    bankbal.innerText = money.toFixed(2);

    var bre = document.createElement("br");

    var closebt = document.createElement("button");
    closebt.setAttribute("id", "closebt");
    closebt.setAttribute("style","position:static; margin-top:1.5%;");
    closebt.innerText = "Ok";
    closebt.onclick = function(){
        closeNav();
    }

    window.appendChild(title);
    window.appendChild(info);
    window.appendChild(bankbal);
    window.appendChild(bre);
    window.appendChild(closebt);
    container.appendChild(window);
    document.body.appendChild(container);
}

/* Close when someone clicks on the "x" symbol inside the overlay */

String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0, n-1) + '[...]' : this;
      };
