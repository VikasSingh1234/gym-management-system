function showButton(data)
{

    var log = document.getElementById('log');
    var sign = document.getElementById('sign');
    var join = document.getElementById('join');
    var logout = document.getElementById('logout');

    if(data === '1'){
        log.style.display = "None";
        sign.style.display = "None";
    }
    else{
        join.style.display = "None";
        logout.style.display = "None";
    }
    
}