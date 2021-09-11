song_1 = "";
song_2 = "";
song1_status = "";
song2_status = "";
leftWristY = 0;
leftWristX = 0;
rightWristX = 0;
rightWristY = 0;
scorerightWrist = 0;
scoreleftWrist = 0;
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

   song1_status = song_1.isPlaying();
   song2_status = song_2.isPlaying();

   fill("#FF0000");
   stroke("#FF0000");

   if(scoreleftWrist > 0.2){
       circle(leftWristX, leftWristY, 20);
       song_1.stop();
       if(song2_status == false){
           song_2.play();
           document.getElementById("song_name").innerHTML = 'Peter Pan';
       }
   }

   if(scorerightWrist > 0.2){
    circle(rightWristX, rightWristY, 20);
    song_2.stop();
    if(song1_status == false){
        song_1.play();
        document.getElementById("song_name").innerHTML = 'Harry Potter';
    }
}
    
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
        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist X = "+ leftWristX + "leftWrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist X = "+ rightWristX + "rightWrist Y = " + rightWristY);
    }
}

