let canvas;

let time = 0,
    wave = [],
    circleAmountSlider;
const radius = 70;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    const mainNodeDOM = canvas.parent();
    canvas.parent("canvas-container");
    mainNodeDOM.remove();
    circleAmountSlider = createSlider(1, 100, 3, 1).position(30, 30);
}

function draw() {
    background(0);
    const circleAmount = circleAmountSlider.value();

    let
        x = 0,
        y = 0;

    translate(width / 4, height / 2);

    for (let i = 0; i < circleAmount; i++) {
        const
            n = i * 2 + 1,
            prevX = x,
            prevY = y,
            perceptionRadius = radius * (4 / (PI * n));

        x += perceptionRadius * cos(n * time);
        y += perceptionRadius * sin(n * time);

        stroke(255, 100);
        strokeWeight(2);
        noFill();
        circle(prevX, prevY, perceptionRadius * 2);
        stroke(255);
        line(prevX, prevY, x, y);

        // draws wave at last circle
        if (i === circleAmount - 1) {
            wave.unshift(y);
            translate(perceptionRadius + 250, 0);
            stroke(255, 10, 80);
            strokeWeight(15);
            point(x - (perceptionRadius + 250), y);
            stroke(255);
            strokeWeight(2);
            beginShape();
            vertex(x - (perceptionRadius + 250), y);
            noFill();
            for (let i = 0; i < wave.length; i++)
                vertex(i, wave[i]);
            endShape();
        }
    }

    if (wave.length > 850) {
        const amount = wave.length - 850;
        wave.splice(851, amount);
    }

    time += 0.02;
}