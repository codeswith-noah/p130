song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status = "";
song2_status = "";
camOn = false;

function preload(){
    song1 = loadSound("imperial march.mp3");
    song2 = loadSound("gfalls.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    //I added a canvas ID so I could style it to not come up on top of the heading and button

    canvas.id('myCanvas');
    video = createCapture(VIDEO);
    video.hide();
    camOn = true;

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("FF0000");

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        if(song2_status = true){
            song2.stop();
        }
        if(song1_status = false && camOn == true){
            song1.play();
            song1.setRate(1);
            song1.setVolume(1);

            document.getElementById("songname").innerHTML = "Song Being Played | The Imperial March";
        }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        if(song1_status = true){
            song1.stop();
        }
        if(song2_status = false && camOn == true){
            song2.play();
            song2.setRate(1);
            song2.setVolume(1);

            document.getElementById("songname").innerHTML = "Song Being Played | Gravity Falls Theme";
        }
    }
}

function modelLoaded(){
    console.log('PoseNet has been successfully initialized.');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x = " + leftWristX + " Left wrist y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);
    }
}