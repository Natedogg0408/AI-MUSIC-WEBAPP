song_1 = "";
song_2 = "";
leftWristY = 0;
leftWristX = 0;
rightWristX = 0;
rightWristY = 0;
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

   
    
}



function preload(){
 song_1 = loadSound('music.mp3');
 song_2 = loadSound('music2.mp3');
}


function modelLoaded(){
    console.log("PoseNet is initialized!");
}


function gotPoses(results){
    if(results.length > 0 ){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist X = "+ leftWristX + "leftWrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist X = "+ rightWristX + "rightWrist Y = " + rightWristY);
    }
}

if(leftWristY > 250 && leftWristY < 600)
{
song_1.play();
song_1.volume(0.7)
document.getElementById("song_name").innerHTML = 'Song 1';
}

if(rightWristY > 250 && rightWristY < 600)
{
song_2.play();
song_2.volume(0.7)
document.getElementById("song_name").innerHTML = 'Song 2';
}

if(rightWristY<150 && leftWristY<150 && rightWristY>600 && leftWristY>600){
    song_1.stop();
    song_2.stop();
}