var uls = document.getElementsByClassName("flat-list buttons");
for(i = 0; i < uls.length; i++){
    var posttext = uls[i].parentElement;
    var post = posttext.parentElement;
    if(post.getAttribute("data-type") == "link"){
        var newbutton = document.createElement("button"); 
        newbutton.setAttribute("id", "investbutton");
        newbutton.innerText = "invest";
        uls[i].appendChild(newbutton);
    }
}
