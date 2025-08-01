var mouse = {};
var dragging;
var cursor = document.getElementsByClassName("cursor")[0];
var chowderCount = 2;
var exe = document.getElementById("exe");
var exe2 = document.getElementById("exe2");
var sel;
exe.addEventListener("mousedown", ()=>startDrag());
exe.addEventListener("dblclick", ()=>spawn(0));
exe.addEventListener("click", ()=>select(exe));
exe2.addEventListener("mousedown", ()=>startDrag());
exe2.addEventListener("dblclick", ()=>spawn(1));
exe2.addEventListener("click", ()=>select(exe2));
document.onmousemove = mouseMove;
function mouseMove(){
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	x = mouse.sx - mouse.x;
	y = mouse.sy - mouse.y;
	mouse.sx = mouse.x;
	mouse.sy = mouse.y;
	cursor.style.left = mouse.x + 1;
	cursor.style.top = mouse.y + 1;
	if(dragging){
		dragging.style.left = dragging.offsetLeft - x;
		dragging.style.top = dragging.offsetTop - y;
	}
}
function startDrag(){
	event.preventDefault();
	mouse.sx = event.clientX;
	mouse.sy = event.clientY;
	event.target.parentElement.localName == "div" ? event.target.parentElement.classList.add("dragging") : event.target.classList.add("dragging");
	dragging = document.getElementsByClassName("dragging")[0];
	dragging.style.zIndex = parseInt(dragging.style.zIndex) + 20;
	document.onmouseup = stopDrag;
}
function stopDrag(){
	dragging.style.zIndex -= 20;
	dragging.classList.remove("dragging");
	dragging = null;
	document.onmouseup = null;
}
function changeCursor(x){
	cursor.id = x > 0 ? "drag" : "";

}
function spawn(x){
	const newChowder = document.createElement(x > 0 ? "img" : "div");
	if(newChowder.localName == "img"){
		newChowder.src="assets/chowder(2).png";
	}
	newChowder.id="chowder_" + chowderCount;
	newChowder.classList.add("chowder");
	newChowder.style.left = Math.random() * window.innerWidth;
	newChowder.style.top = Math.random() * window.innerHeight;
	newChowder.style.zIndex = 1;
	document.body.appendChild(newChowder);
	el=document.getElementsByClassName("chowder")[chowderCount];
	el.addEventListener("mousedown", ()=>startDrag(event));
	el.addEventListener("mouseenter", ()=>changeCursor(1));
	el.addEventListener("mouseleave", ()=>changeCursor(0));
	chowderCount++;
}
function select(el){
	if(!sel){
		el.classList.add("selected");
		sel = document.getElementsByClassName("selected")[0];
		sel.children[sel.children.length-1].focus();
		document.onkeydown = (checkEvent);
		document.onmousedown = (deselect);
	}
}
function deselect(){
	if(sel && event.target != sel){
		document.onkeydown = null;
		document.onmousedown = null;
		sel.classList.remove("selected");
		sel.children[sel.children.length-1].blur();
		sel = null;
	}
}
function checkEvent(){
	if(event.keyCode === 13){
		spawn(sel.id == "exe2" ? 1 : 0);
	}
}