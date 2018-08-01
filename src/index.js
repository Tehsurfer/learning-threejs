var THREE = require('three')
var $ = require('jquery')

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var cube;

var t = 0;
var u = 0;
var v = 0;
var maxt = 100;
var maxu = 300;
var maxv = 5000;

var loader = new THREE.TextureLoader();
loader.setCrossOrigin( 'Anonymous');

var light = new THREE.AmbientLight('rgb(0,0,255)'); // soft white light
scene.add(light);

var spotLight = new THREE.SpotLight('rgb(255,255,255)');
spotLight.position.set( 100, 1000, 1000 );
spotLight.castShadow = true;
scene.add(spotLight);

loader.load( 'https://raw.githubusercontent.com/Tehsurfer/learning-threejs/master/Firefox-logo.svg.png', function (texture) {
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	// texture.repeat.set(2, 2);

	var geometry = new THREE.BoxGeometry(2.4,2.4,2.4);
	var material = new THREE.MeshLambertMaterial( { map: texture, shading: THREE.FlatShading } );
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	draw();
});


$("body").mousemove(function(event) {


        // Use event.pageX / event.pageY here
        camera.position.x = event.pageX/window.innerWidth
        camera.position.y = event.pageY/window.innerHeight


 })


var bslider = 1;
var gslider = 1;
var start = {
	x: 0,
	y: 0
}
function printMousePos(event) {
  start.x =  event.pageX;
  start.y = event.pageY;
  (function() {
    document.onmousemove = handleMouseMove2;
    function handleMouseMove2(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        // Use event.pageX / event.pageY here
        bslider = (event.pageX - start.x) / window.innerWidth;
  		gslider = (event.pageY - start.y) / window.innerHeight;


    }
})();
}

document.addEventListener("click", printMousePos);





window.addEventListener('mouseup', function(event){
  $("body").mousemove(function(event) {


        // Use event.pageX / event.pageY here
        camera.position.x = event.pageX/window.innerWidth
        camera.position.y = event.pageY/window.innerHeight


 })
})




function draw() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.position.y = Math.sin(t*Math.PI/maxt)
  cube.position.x = Math.cos(u*Math.PI*2/maxu)
  renderer.render(scene, camera);
  light.color.g = bslider;
  light.color.b = gslider;
  light.color.r = Math.acos(v*Math.PI/maxt )
  t ++;
  if (t > maxt){
  	t = 0
  }
  u++;
  if (u > maxu){
  	u = 0
  }

  if (t == 0){
    window.navigator.vibrate(60);
    console.log('vibrating now for bounce');
    
  } 

	requestAnimationFrame(draw);
}
