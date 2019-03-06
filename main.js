console.log("V10");
/*Create Globals*/
var globals = {};
var Character;
var Base;
var currentInstruction = 0;
var instructions = [
  {
    text:
      "Welcome to Learn to Code! This project was made by Wyatt Pfeil. Click next to begin!"
  },
  {
    text:
      "The purpose of this is to introduce you to the basics of programming. Play the game and figure out the secret message by coding!"
  },
  {
    text:
      "You are a character in a world. Your goal is to complete all of the challenges and come back to me with the secret message. I have been trying to figure out the secret code for years and you seem like the perfect person to assist me in completing the quest. Press next to accept the challenge.",
    onDisplay: function() {
      toggleCanvasVisibility(true);
    }
  },
  {
    text:
      "Your first challenge is to move your virtual character. The code to move your character will appear in the box when you press next."
  },
  {
    text:
      'There are a few parts to this code. The first part is the object. In this case, the object is "Character".',
    onDisplay: function() {
      toggleCodeFrameVisibility(true);
      toggleRunButtonVisibility(false);
    }
  },
  {
    text:
      'The second part is the method. This is the action that the object does. In this case, the method is "move".'
  },
  {
    text:
      'Now I bet you are probably wondering what that period is doing in between "Character" and "move". That period separates the object from the method. This is similar to putting a space in between words.'
  },
  {
    text:
      "Those parenthesis are what contains the arguments. In this case, the argument, 1, means how many steps the character should move."
  },
  {
    text: "Press run code and see what happens!",
    onDisplay: function() {
      toggleNextButtonVisibility(false);
      toggleRunButtonVisibility(true);
    },
    VerifyCode: function(Code) {
      const correct = "Character.Move(1)";
      if (Code == correct) {
        MoveCharacter(Code);
        onNextClicked();
        displayNextChallengeMessageLetter();
        toggleNextButtonVisibility(true);
        toggleRunButtonVisibility(false);
      } else {
        setInstructionText("Hmm.. That doesn't seem right. Try again.");
      }
    }
  },
  {
    text:
      "Look at that! You just ran your first program. You just got your first letter that will be used to figure out the secret message. Great job!"
  },
  {
    text:
      "Now, you are going to be doing a little bit of coding on your own. The next challenge is to move forward two steps."
  },
  {
    text:
      "I have given you the object and the method, you will have to fill in the arguments. Remember, the character needs to move forward *2* times.",
    onDisplay: function() {
      toggleNextButtonVisibility(false);
      toggleRunButtonVisibility(true);
    },
    VerifyCode: function(Code) {
      const correct = "Character.Move(2)";
      if (Code == correct) {
        MoveCharacter(Code);
        onNextClicked();
        displayNextChallengeMessageLetter();
        toggleNextButtonVisibility(true);
        toggleRunButtonVisibility(false);
      } else {
        setInstructionText("Hmm.. That doesn't seem right. Try again.");
      }
    }
  },
  {
    text:
      "Wow! You're getting really good at this. You just earned your second letter."
  },
  {
    text:
      "Now are going to have to do something a little bit more challenging. You need to make the character jump."
  },
  {
    text:
      "As you can see, I have given you the method and the argument. You need to fill in the object. Remember, it is the character we are moving.",
    onDisplay: function() {
      toggleNextButtonVisibility(false);
      toggleRunButtonVisibility(true);
      setCodeText(".Jump(1)");
    },
    VerifyCode: function(Code) {
      const correct = "Character.Jump(1)";
      if (Code == correct) {
        JumpCharacter(Code);
        onNextClicked();
        displayNextChallengeMessageLetter();
        toggleNextButtonVisibility(true);
        toggleRunButtonVisibility(false);
      } else {
        setInstructionText("Hmm.. That doesn't seem right. Try again.");
      }
    }
  },
  {
    text:
      "You are an amazing programmer! Now, for your final challenge. You only have one letter left to earn. "
  },
  {
    text:
      "For your final challenge, you are going to have to make the character spin around. I am not going to be giving you any code but I will be giving you some hints. Click next to view them."
  },
  {
    text:
      "The object is character, the method is spin, and the argument is 1. Good luck!",
    onDisplay: function() {
      toggleNextButtonVisibility(false);
      toggleRunButtonVisibility(true);
      setCodeText("");
    },
    VerifyCode: function(Code) {
      const correct = "Character.Spin(1)";
      if (Code == correct) {
        SpinCharacter(Code);
        onNextClicked();
        displayNextChallengeMessageLetter();
        toggleNextButtonVisibility(true);
        toggleRunButtonVisibility(false);
      } else {
        setInstructionText("Hmm.. That doesn't seem right. Try again.");
      }
    }
  },
  {
    text:
      "Wow! You got all of the letters! You can do exactly what it says. You can CODE!"
  },
  {
    onDisplay: function() {
      toggleNextButtonVisibility(false);
      toggleCodeFrameVisibility(false);
      setCodeText("");
    },
    text: "Thank you for learning to code."
  }
];
/*Create Globals*/
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
  toggleCodeFrameVisibility(false);
  toggleCanvasVisibility(false);
}

function toggleCodeFrameVisibility(visible) {
  var CodeFrameElement = document.getElementById("CodeFrame");
  CodeFrameElement.hidden = !visible;
}
function toggleNextButtonVisibility(visible) {
  var NextElement = document.getElementById("Next");
  NextElement.hidden = !visible;
}
function toggleRunButtonVisibility(visible) {
  var RunElement = document.getElementById("SubmitCode");
  RunElement.hidden = !visible;
}
function toggleCanvasVisibility(visible) {
  var canvasElement = document.getElementsByTagName("canvas")[0];
  canvasElement.hidden = !visible;
}

window.addEventListener("resize", layoutCodeFrame);
window.addEventListener("load", layoutCodeFrame);
window.addEventListener("load", initInstructions);

function setInstructionText(Text) {
  var instructionElement = document.getElementById("Instruction");
  instructionElement.innerText = Text;
}

function setCodeText(Text) {
  var codeInputElement = document.getElementById("CodeInput");
  codeInputElement.value = Text;
}

function getChallengeMessageText() {
  var ChallengeMessageElement = document.getElementById("ChallengeMessage");
  return ChallengeMessageElement.innerText;
}

function setChallengeMessageText(Text) {
  var ChallengeMessageElement = document.getElementById("ChallengeMessage");
  ChallengeMessageElement.innerText = Text;
}

var currentLetter = 0;
const endMessage = "CODE";
var splitEndMessage = endMessage.split("");
function displayNextChallengeMessageLetter() {
  setChallengeMessageText(
    getChallengeMessageText() + splitEndMessage[currentLetter]
  );
  currentLetter = currentLetter + 1;
}
function setInstruction(Index) {
  setInstructionText(instructions[Index].text);
}
function initInstructions() {
  setInstruction(currentInstruction);
}

function onNextClicked() {
  console.log("Next Clicked!");
  if (currentInstruction < instructions.length - 1) {
    currentInstruction = currentInstruction + 1;
    setInstruction(currentInstruction);
    var onDisplay = instructions[currentInstruction].onDisplay;
    if (onDisplay) {
      onDisplay();
    }
  }
}

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
    globals.Base = object;
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
    globals.Character = character;
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
        resolve();
      });

    tween.start();
  });
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
        resolve();
      });

    tween.start();
  });
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
async function WalkCharacter(Character) {
  var walkUpPosition = new THREE.Vector3(
    Character.position.x,
    Character.position.y + 10,
    Character.position.z + 20
  );
  var rotateRightPosition = new THREE.Vector3(
    Character.rotation.x,
    Character.rotation.y,
    0.1
  );
  await Promise.all([
    MoveObject(Character, walkUpPosition, 150),
    RotateObject(Character, rotateRightPosition, 75)
  ]);

  var walkDownPosition = new THREE.Vector3(
    Character.position.x,
    Character.position.y - 10,
    Character.position.z + 20
  );
  var rotateCenterPosition = new THREE.Vector3(
    Character.rotation.x,
    Character.rotation.y,
    0
  );
  await Promise.all([
    MoveObject(Character, walkDownPosition, 75),
    RotateObject(Character, rotateCenterPosition, 75)
  ]);

  walkUpPosition = new THREE.Vector3(
    Character.position.x,
    Character.position.y + 10,
    Character.position.z + 20
  );
  var rotateLeftPosition = new THREE.Vector3(
    Character.rotation.x,
    Character.rotation.y,
    -0.1
  );
  await Promise.all([
    MoveObject(Character, walkUpPosition, 150),
    RotateObject(Character, rotateLeftPosition, 75)
  ]);

  walkDownPosition = new THREE.Vector3(
    Character.position.x,
    Character.position.y - 10,
    Character.position.z + 20
  );
  rotateCenterPosition = new THREE.Vector3(
    Character.rotation.x,
    Character.rotation.y,
    0
  );
  await Promise.all([
    MoveObject(Character, walkDownPosition, 75),
    RotateObject(Character, rotateCenterPosition, 75)
  ]);
}

async function TurnCharacter(Character) {
  var RotateCharacter = new THREE.Vector3(
    Character.rotation.x,
    Character.rotation.y + 1,
    Character.rotation.z
  );
  await RotateObject(Character, RotateCharacter, 500);
}
async function HopCharacter(Character) {
  var JumpCharacterUp = new THREE.Vector3(
    Character.position.x,
    Character.position.y + 10,
    Character.position.z
  );
  var JumpCharacterDown = new THREE.Vector3(
    Character.position.x,
    Character.position.y - 10,
    Character.position.z
  );
  await MoveObject(Character, JumpCharacterUp, 250);
  await MoveObject(Character, JumpCharacterDown, 250);
}
async function MoveCharacter(Code) {
  console.log(globals.Character);
  var leftParend = Code.indexOf("(");
  var rightParend = Code.indexOf(")");
  var StringObj = Code.split(".")[0];
  var Obj = globals[StringObj];
  console.log(`StringObj=${StringObj}`);
  console.log(`Obj=${Obj}`);
  var Times = Code.substr(leftParend + 1, rightParend - leftParend - 1);
  for (i = 0; i < Times; i++) {
    await WalkCharacter(Obj);
  }
}

async function JumpCharacter(Code) {
  console.log(globals.Character);
  var leftParend = Code.indexOf("(");
  var rightParend = Code.indexOf(")");
  var StringObj = Code.split(".")[0];
  var Obj = globals[StringObj];
  console.log(`StringObj=${StringObj}`);
  console.log(`Obj=${Obj}`);
  var Times = Code.substr(leftParend + 1, rightParend - leftParend - 1);
  for (i = 0; i < Times; i++) {
    await HopCharacter(Obj);
  }
}

async function SpinCharacter(Code) {
  console.log(globals.Character);
  var leftParend = Code.indexOf("(");
  var rightParend = Code.indexOf(")");
  var StringObj = Code.split(".")[0];
  var Obj = globals[StringObj];
  console.log(`StringObj=${StringObj}`);
  console.log(`Obj=${Obj}`);
  var Times = Code.substr(leftParend + 1, rightParend - leftParend - 1);
  for (i = 0; i < Times; i++) {
    await TurnCharacter(Obj);
  }
}

async function SendCode(Code) {
  var VerifyCode = instructions[currentInstruction].VerifyCode;
  if (VerifyCode) {
    VerifyCode(Code.trim());
  }
  /*if (Code.includes("Move")) {
    MoveCharacter(Code)
    console.log("Done");
  }
  if (Code.includes("test")) {
      await TurnCharacter(Character)
  }*/
}

////////////////////////////////////////////////////////////////////////////

animate();
