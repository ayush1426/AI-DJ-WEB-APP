song="";

function preload(){
    song=loadSound("music.mp3");

}
scoreLeftWrist= 0;
scoreRightWrist= 0;

rightWristX= 0;
rightWristY=0 ;

leftWristX= 0;
leftWristY= 0;




function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}


function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    posNet = ml5.poseNet(video,modelloaded);
    poseNet.on('pose', gotPoses);

}


function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist>0.2){

    circle(rightWristX,rightWristY,20);
    if(rightWristY>0 && rightWristY<=100){
        document.getElementById("speed").innerHTML="Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML="Speed = 1.0x";
        song.rate(1.0);  
    }
    else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML="Speed = 1.5x";
        song.rate(1.5);  
    }
    else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("speed").innerHTML="Speed = 2.0x";
        song.rate(2.0);  
    }
    else if(rightWristY>400 && rightWristY<=500){
        document.getElementById("speed").innerHTML="Speed = 2.5x";
        song.rate(2.5);  
    }
    }
    if(scoreLeftWrist>0.2){

    
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY=Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="volume=space"+volume;
    song.setVolume(volume);
}


}
function modelloaded() {
    console.log("Posnet Is Initialized");
}

function gotPoses(results){
    if (results.length>0){
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log("scoreleftWristX = "+scoreLeftWrist+" scoreRightWrist = " + scoreRightWrist);

rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;

    
    console.log("rightWristX= "+ rightWristX+" rightWristY = "+ rightWristY);

leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;

     console.log("leftWristX= "+ leftWristX+" leftWristY = "+ leftWristY);

    scoreRightWrist=results[0].pose.keypoints[10].score;


}
}