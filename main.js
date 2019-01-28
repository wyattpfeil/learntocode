console.log("V8");

function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x6100ff, 1);
scene.background = new THREE.Color(0x00d8ff);
var Character;
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
  color: 0x4985e5
});
var cube = new THREE.Mesh(geometry, material);

function layoutCodeFrame() {
  var CodeFrameElement = document.getElementById("CodeFrame");
  console.log(CodeFrameElement);
  CodeFrameElement.style.width = window.innerWidth * 0.15;
  CodeFrameElement.style.height = window.innerHeight * 0.35;
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", layoutCodeFrame);
window.addEventListener("load", layoutCodeFrame);

//Load Ground/////////////////////////////////////////////
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setResourcePath("/learntocode/assets/");
mtlLoader.setPath("/learntocode/assets/");
mtlLoader.load("BaseForProjobj.mtl", function(materials) {
  materials.preload();
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath("/learntocode/assets/");
  objLoader.load("BaseForProjobj.obj", function(object) {
    scene.add(object);
    console.log(object);
    object.position.y -= 130;
    object.scale.set(75, 75, 75);
    console.log(object.position);
  });
});

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setResourcePath("/learntocode/assets/");
mtlLoader.setPath("/learntocode/assets/");
mtlLoader.load("Character.mtl", function(materials) {
  materials.preload();
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath("/learntocode/assets/");
  objLoader.load("Character.obj", function(character) {
    scene.add(character);
    console.log(character);
    character.position.y -= 120;
    character.scale.set(75, 75, 75);
    console.log(character.position);
    Character = character;
  });
});
////////////////////////////////////////////////////////////

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

controls.update();

//Add Lighting\\ ///////////////////////////////////////////
var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);
/////////////////////////////////////////////////////////////

camera.position.z = 200;
var animate = function() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

//Add Music\\ //////////////////////////////////////////////////
var listener = new THREE.AudioListener();
camera.add(listener);
// create a global audio source
/*var sound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();
audioLoader.load('/learntocode/assets/BackroundMusic.mp3', function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
});*/
//////////////////////////////////////////////////////////////////

//Mouse Click\\ /////////////////////////////////////////////////////////////

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function render() {
  TWEEN.update();

  //console.log(scene.children)
  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  renderer.render(scene, camera);

  window.requestAnimationFrame(render);
}

window.addEventListener("mousemove", onMouseMove, false);

window.requestAnimationFrame(render);

function MoveObject(mesh, toPosition, duration) {
    return new Promise((resolve, reject) => {
        var tween = new TWEEN.Tween(mesh.position)
        .to(
          {
            x: toPosition.x,
            y: toPosition.y,
            z: toPosition.z
          },
          duration
        )
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function(d) {})
        .onComplete(function() {
            resolve()
        });
      
        tween.start();    
    })
}

function RotateObject(mesh, toRotation, duration) {
    return new Promise((resolve, reject) => {
        var tween = new TWEEN.Tween(mesh.rotation)
        .to(
          {
            x: toRotation.x,
            y: toRotation.y,
            z: toRotation.z
          },
          duration
        )
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function(d) {})
        .onComplete(function() {
            resolve()
        });
      
        tween.start();    
    })
}
function animateVector3(vectorToAnimate, target, options) {
  options = options || {};
  // get targets from options or set to defaults
  var to = target || THREE.Vector3(),
    easing = options.easing || TWEEN.Easing.Quadratic.In,
    duration = options.duration || 2000;
  // create the tween
  console.log("174");
  var tweenVector3 = new TWEEN.Tween(vectorToAnimate)
    .to(
      {
        x: to.x,
        y: to.y,
        z: to.z
      },
      duration
    )
    .easing(easing)
    .onUpdate(function(d) {
      //   console.log("Updated");
      //   if (options.update) {
      //     options.update(d);
      //   }
    })
    .onComplete(function() {
      console.log("Completed");
      if (options.callback) options.callback();
    });
  console.log("Before Start");
  tweenVector3.start();
  console.log("After Start");
  return tweenVector3;
}

async function MoveCharacter(Code){
    var leftParend = Code.indexOf("(");
    var rightParend = Code.indexOf(")");
    var Times = Code.substr(leftParend + 1, rightParend - leftParend - 1);
    for (i = 0; i < Times; i++) {
      var walkUpPosition = new THREE.Vector3(Character.position.x, Character.position.y + 10, Character.position.z + 20); 
      var rotateRightPosition = new THREE.Vector3(Character.rotation.x, Character.rotation.y, 0.1);
      await Promise.all([MoveObject(Character, walkUpPosition, 150), RotateObject(Character, rotateRightPosition, 75)])

      var walkDownPosition = new THREE.Vector3(Character.position.x, Character.position.y - 10, Character.position.z + 20);
      var rotateCenterPosition = new THREE.Vector3(Character.rotation.x, Character.rotation.y, 0);
      await Promise.all([MoveObject(Character, walkDownPosition, 75), RotateObject(Character, rotateCenterPosition, 75)])

      walkUpPosition = new THREE.Vector3(Character.position.x, Character.position.y + 10, Character.position.z + 20); 
      var rotateLeftPosition = new THREE.Vector3(Character.rotation.x, Character.rotation.y, -0.1);
      await Promise.all([MoveObject(Character, walkUpPosition, 150), RotateObject(Character, rotateLeftPosition, 75)])

      walkDownPosition = new THREE.Vector3(Character.position.x, Character.position.y - 10, Character.position.z + 20);
      rotateCenterPosition = new THREE.Vector3(Character.rotation.x, Character.rotation.y, 0);
      await Promise.all([MoveObject(Character, walkDownPosition, 75), RotateObject(Character, rotateCenterPosition, 75)])
    }
}

async function SendCode(Code) {
  if (Code.includes("MoveCharacter")) {
    MoveCharacter(Code)
    console.log("Done");
  }
  if (Code.includes("test")) {
    var target1 = new THREE.Vector3(
        Character.position.x,
        Character.position.y + 10,
        Character.position.z + 20
      );
      var target2 = new THREE.Vector3(Character.position.x, Character.position.y + 100, Character.position.z + 20);      
      await MoveObject(Character, target1,2000)
      await sleep(2000)
      await MoveObject(Character, target2)
      
  }
}

////////////////////////////////////////////////////////////////////////////

animate();
