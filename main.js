console.log("V7")

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x6100ff, 1);
scene.background = new THREE.Color(0x00d8ff);
var Character
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
    color: 0x4985e5
});
var cube = new THREE.Mesh(geometry, material);
//scene.add( cube );

function layoutCodeFrame(){
    var CodeFrameElement = document.getElementById("CodeFrame")
    console.log(CodeFrameElement)
    CodeFrameElement.style.width = window.innerWidth*0.15
    CodeFrameElement.style.height = window.innerHeight*0.35
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize",layoutCodeFrame)
window.addEventListener("load",layoutCodeFrame)

//Load Ground/////////////////////////////////////////////
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setResourcePath('/learntocode/assets/');
mtlLoader.setPath('/learntocode/assets/');
mtlLoader.load('BaseForProjobj.mtl', function(materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/learntocode/assets/');
    objLoader.load('BaseForProjobj.obj', function(object) {
        scene.add(object);
        console.log(object)
        object.position.y -= 130;
        object.scale.set(75, 75, 75);
        console.log(object.position)

    });
});

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setResourcePath('/learntocode/assets/');
mtlLoader.setPath('/learntocode/assets/');
mtlLoader.load('Character.mtl', function(materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/learntocode/assets/');
    objLoader.load('Character.obj', function(character) {
        scene.add(character);
        console.log(character)
        character.position.y -= 120;
        character.scale.set(75, 75, 75);
        console.log(character.position)
        Character = character

    });
});
////////////////////////////////////////////////////////////

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

controls.update();



//Add Lighting\\ ///////////////////////////////////////////

// var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
// keyLight.position.set(-100, 0, 100);

// var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
// fillLight.position.set(100, 0, 100);

// var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
// backLight.position.set(100, 0, -100).normalize();

// scene.add(keyLight);
// scene.add(fillLight);
// scene.add(backLight);

var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);
/////////////////////////////////////////////////////////////


camera.position.z = 200;
var teapot;
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

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);

    for (var i = 0; i < intersects.length; i++) {
        console.log("Intersected")
        //intersects[ i ].object.material.color.set( 0xff0000 );

    }
    renderer.render(scene, camera);

    window.requestAnimationFrame(render)

}

window.addEventListener('mousemove', onMouseMove, false);

window.requestAnimationFrame(render);


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function animateVector3(vectorToAnimate, target, options) {
    options = options || {};
    // get targets from options or set to defaults
    var to = target || THREE.Vector3(),
        easing = options.easing || TWEEN.Easing.Quadratic.In,
        duration = options.duration || 2000;
    // create the tween
    console.log("174")
    var tweenVector3 = new TWEEN.Tween(vectorToAnimate)
        .to({
            x: to.x,
            y: to.y,
            z: to.z,
        }, duration)
        .easing(easing)
        .onUpdate(function(d) {
            console.log("Updated")
            if (options.update) {
                options.update(d);
            }
        })
        .onComplete(function() {
            console.log("Completed")
            if (options.callback) options.callback();
        });
    console.log("Before Start")
    tweenVector3.start();
    console.log("After Start")
    return tweenVector3;
}

function SendCode(Code) {
    if (Code == "MoveCharacter") {
        console.log("Moving Character")
        console.log(Character.position)
        var target = new THREE.Vector3(Character.position.x, Character.position.y, Character.position.z + 100); // create on init
        animateVector3(Character.position, target, {

            duration: 1500,

            easing: TWEEN.Easing.Quadratic.InOut,

            update: function(d) {
                console.log("Updating: " + d);
            },

            callback: function() {
                console.log("Completed");
            }
        });
        TWEEN.Tween.repeat(10)
        console.log("Done")
        /*var target = new THREE.Vector3(Character.position.x, Character.position.y+20, Character.position.z); // create on init
        animateVector3(Character.position, target, {

            duration: 200,

            easing: TWEEN.Easing.Quadratic.InOut,

            update: function(d) {
                console.log("Updating: " + d);
            },

            callback: function() {
                console.log("Completed");
            }
        });*/
    }

}

////////////////////////////////////////////////////////////////////////////

animate();