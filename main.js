function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier("MobileNet", modal_loaded);
}

function modal_loaded() {
    console.log("modal_loaded");
}

function draw() {
    image(video, 0, 0, 300, 300);
    classifier.classify(video, gotResult)
}

var preveous_result = "";

function gotResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        if ((result[0].confidence > 0.5) && (preveous_result != result[0].label)) {
            console.log(result);
            preveous_result = result[0].label;
            var synth = window.speechSynthesis;
            speak_data = " reslut object is =" + result[0].label;
            var utterThis = new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);

            document.getElementById("Object").innerHTML = result[0].label;
            document.getElementById("Accuracy").innerHTML = result[0].confidence;
        }
    }
}