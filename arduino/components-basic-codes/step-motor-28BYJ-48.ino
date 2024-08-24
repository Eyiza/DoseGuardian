#include <Stepper.h>

const int stepsPerRevolution = 2048; // number of steps per rotation

// Creates an instance of stepper class
// Pins entered in sequence IN1-IN3-IN2-IN4 for proper step sequence
Stepper myStepper = Stepper(stepsPerRevolution, 8, 10, 9, 11);


void setup() {
  myStepper.setSpeed(18);  // 15 RPM or 20RPM
  // Stepper Library sets pins as outputs so no need to set them
}

void loop() {
  // Rotate in One Direction and complete one complete rotation i.e 2048 steps
  myStepper.step(stepsPerRevolution);  
  delay(200);  // Delay between rotations
  // For Rotation in opposite direction provide the variable to the parameter with negative Sign
  myStepper.step(-stepsPerRevolution);  
  delay(200);  // Delay between rotations
}