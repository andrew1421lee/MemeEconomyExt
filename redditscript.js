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
    posturl.innerText = link;
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
    window.appendChild(textbox);

    var presetbuy1 = document.createElement("button");
    presetbuy1.setAttribute("id", "xbutton");
    presetbuy1.innerText = "1";

    var closebt = document.createElement("button");
    closebt.setAttribute("id", "xbutton");
    closebt.innerText = "cancel";
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

function closeNav(){
    var nav = document.getElementById("popupcontainer");
    nav.parentNode.removeChild(nav);
}

/* Close when someone clicks on the "x" symbol inside the overlay */
