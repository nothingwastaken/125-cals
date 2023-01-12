song = "";
LWx = 0;
LWy = 0;
LWs = 0;
RWx = 0;
RWy = 0;
RWs = 0;



function preload(){
    song = loadSound("music.mp3");

}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("ready");
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#000000");

    circle(RWx,RWy, 20);
if (RWs > 0.02){
    if (RWy > 0 && RWy <= 100){
        song.rate(0.5);
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
    }

    if (RWy > 100 && RWy <= 200){
        song.rate(1);
        document.getElementById("speed").innerHTML = "Speed = 1x";
    }

    if (RWy > 200 && RWy <= 300){
        song.rate(1.5);
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
    }

    if (RWy > 300 && RWy <= 400){
        song.rate(2);
        document.getElementById("speed").innerHTML = "Speed = 2";
    }

    if (RWy > 400 && RWy <= 500){
        song.rate(2.5);
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
    }
}

    if (LWs > 0.02){
      circle(LWx,LWy, 20);
      LWyA = Number(LWy);
      nd = floor(LWyA);
      volume = nd/500;
      document.getElementById("volume").innerHTML = "Volume" + volume;
      song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(0.3);
    song.rate(1);
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        LWs = results[0].pose.keypoints[9].score;
        console.log(LWs);
        RWs = results[0].pose.keypoints[10].score;
        console.log(RWs);

        LWx = results[0].pose.leftWrist.x;
        LWy = results[0].pose.leftWrist.y;
        console.log("Left wrist x = " + LWx + " Left wrist y = " + LWy);
        RWx = results[0].pose.rightWrist.x;
        RWy = results[0].pose.rightWrist.y;
        console.log("Right wrist x = " + RWx + " Right wrist y = " + RWy);

    }
}




