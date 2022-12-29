song = "";
LWx = 0;
LWy = 0;
RWx = 0;
RWy = 0;



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
}

function play(){
    song.play();
    song.setVolume(0.3);
    song.rate(1);
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        LWx = results[0].pose.leftWrist.x;
        LWy = results[0].pose.leftWrist.y;
        console.log("Left wrist x = " + LWx + " Left wrist y = " + LWy);
        RWx = results[0].pose.rightWrist.x;
        RWy = results[0].pose.rightWrist.y;
        console.log("Right wrist x = " + RWx + " Right wrist y = " + RWy);

    }
}




