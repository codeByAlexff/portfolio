

export default function createSketch(onWin) {
    return function sketch(p) {
        const particles = [];
        const numParticles = 1;
        let achievementFired = false;

        p.setup = () => {
            let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
            cnv.style("display", "block");
            cnv.style("position", "absolute");
            cnv.style("inset", 0);
            cnv.style("z-index", -1);


            for (let i = 0; i < numParticles; i++){
                particles.push(new Particle())
            }
        }

        p.draw = () => {
            p.background(38, 43, 64);

            particles.forEach((particle, index) => {
                particle.update();
                particle.drawParticle();
                particle.drawLines(particles.slice(index));
            });

            const allTouched = particles.every((particle) => particle.touched);
            if (allTouched && !achievementFired) {
            achievementFired = true;
            onWin();
            }
        };

        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight)
        }

        class Particle {
            constructor() {
                this.position = p.createVector(p.random(p.width), p.random(p.height))
                this.velocity = p.createVector(p.random(-2,2), p.random(-2,2))
                this.acceleration = p.createVector();
                this.touched = false;
            }

            update() {
                this.detectMouseInteraction();
                this.position.add(this.velocity);
                this.detectEdges();
            }

            detectMouseInteraction() {
                let mouse = p.createVector(p.mouseX, p.mouseY);
                let direction = mouse.sub(this.position);
                let distance = direction.mag();

                if (distance < 100) {
                    direction.normalize();
                    direction.mult(0.5);
                    this.acceleration = direction;
                    this.velocity.add(this.acceleration);
                    this.velocity.limit(4)
                }

                this.touched = distance < 20;
            }

            detectEdges() {
                if (this.position.x < 0 || this.position.x > p.width) {
                    this.velocity.x *= -1
                }
                if (this.position.y < 0 || this.position.y > p.height) {
                    this.velocity.y *= -1
                }
            }

            drawLines(particles) {
                particles.forEach(particle => {
                    let distance = p.dist(this.position.x, this.position.y, particle.position.x, particle.position.y);
                    
                    const maxDistance = 100

                    if (distance < maxDistance) {
                        let alpha = p.map(distance, 0, maxDistance, 255, 0);
                        p.stroke(83, 121, 174, alpha);
                        p.line(this.position.x, this.position.y, particle.position.x, particle.position.y);
                    }
                })

            }

            drawParticle() {
                if (this.touched) p.fill(34, 211, 238);
                else p.fill(168, 197, 236);
                p.noStroke();
                p.ellipse(this.position.x, this.position.y, 5)
            }
        }
    }
}