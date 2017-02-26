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
    openNav(link);
}

function openNav(link) {
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
    posturl.innerText = link.trunc(75);
    window.appendChild(posturl);

    var slider = document.createElement("INPUT");
    slider.setAttribute("type", "range");
    slider.setAttribute("id", "xslider");
    slider.setAttribute("value", 0);
    slider.onchange = function(){
        updateCashTextbox(slider.value);
    }
    window.appendChild(slider);

    var textbox = document.createElement("INPUT");
    textbox.setAttribute("type", "text");
    textbox.setAttribute("id","xtextbox");
    textbox.setAttribute("value", 0);
    textbox.onchange = function(){
        updateCashSlider(textbox.value);
    }
    window.appendChild(textbox);

    var btcontainer = document.createElement("div");
    btcontainer.setAttribute("id", "btcontainer");
    window.appendChild(btcontainer);

    var presetbuy1 = document.createElement("button");
    presetbuy1.setAttribute("id", "preset1");
    presetbuy1.innerText = "1";
    presetbuy1.onclick = function(){
        updateCashSlider(1);
        updateCashTextbox(1);
    }
    btcontainer.appendChild(presetbuy1);

    var presetbuy2 = document.createElement("button");
    presetbuy2.setAttribute("id", "preset2");
    presetbuy2.innerText = "5";
    presetbuy2.onclick = function(){
        updateCashSlider(5);
        updateCashTextbox(5);
    }
    btcontainer.appendChild(presetbuy2);

    var presetbuy3 = document.createElement("button");
    presetbuy3.setAttribute("id", "preset3");
    presetbuy3.innerText = "20";
    presetbuy3.onclick = function(){
        updateCashSlider(20);
        updateCashTextbox(20);
    }
    btcontainer.appendChild(presetbuy3);

    var presetbuy4 = document.createElement("button");
    presetbuy4.setAttribute("id", "preset4");
    presetbuy4.innerText = "50";
    presetbuy4.onclick = function(){
        updateCashSlider(50);
        updateCashTextbox(50);
    }
    btcontainer.appendChild(presetbuy4);

    var presetbuy5 = document.createElement("button");
    presetbuy5.setAttribute("id", "preset5");
    presetbuy5.innerText = "100";
    presetbuy5.onclick = function(){
        updateCashSlider(100);
        updateCashTextbox(100);
    }
    btcontainer.appendChild(presetbuy5);

    var investbt = document.createElement("button");
    investbt.setAttribute("id", "investbt");
    investbt.innerText = "Purchase";
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

function closeNav(){
    var nav = document.getElementById("popupcontainer");
    nav.parentNode.removeChild(nav);
}

/* Close when someone clicks on the "x" symbol inside the overlay */

String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0, n-1) + '[...]' : this;
      };
