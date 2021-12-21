var close1 = false;
function life(){
	close1 = !close1;
	if(close1 == false)
		document.getElementById("manu").style.display = "block";
	else
		document.getElementById("manu").style.display = "none";
}
function lifeclose(){
	
	document.getElementById("manu").style.display = "none";
}
function conclose(){
	
	
	document.getElementById("conex").style.display = "none";
	//document.getElementById("info").style.display = "none";
	
}
var ii = 0;
var imgs=["123-1.png","123.png"];
function changeImg(){
	document.getElementById("P2").src=imgs[ii];
	if(ii===0){
		ii=1;
		document.getElementById("P3").style.display = "none";
	}
	
}
