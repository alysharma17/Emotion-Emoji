prediction_1="";
prediction_2="";

Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:8000

});
camera=document.getElementById("camera");
Webcam.attach("#camera");

function snapshot() {
     Webcam.snap(function(data_uri){
    image="<img id='img_snap' src='"+data_uri+"'>" ;
    document.getElementById("result").innerHTML=image;
     });
}    

console.log("ml5 version ", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/K2yvJYNBZ/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}
function speak() {
    synth=window.speechSynthesis;
    var speak_data1= "The first prediction is " + prediction_1;
    var speak_data2="The second prediction is " + prediction_2;
    var utter_this=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utter_this);


}

function check() {
img= document.getElementById("img_snap");
classifier.classify(img, gotResult);
     
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("name1").innerHTML=results[0].label;
        document.getElementById("name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
       speak();
  
       if (results[0].label=="Happy") {
        document.getElementById("emojiname").innerHTML="&#128522;";
    }
    if (results[0].label=="Sad") {
        document.getElementById("emojiname").innerHTML="&#128532;";
    }
    if (results[0].label=="Angry") {
        document.getElementById("emojiname").innerHTML="&#128548;";
    }
    if (results[1].label=="Happy") {
        document.getElementById("emojiname2").innerHTML="&#128522;";
        
    }

    if (results[1].label=="Sad") {
        document.getElementById("emojiname2").innerHTML="&#128532;";
    }
    if (results[1].label=="Angry") {
        document.getElementById("emojiname2").innerHTML="&#128548;";
    }
    }
}