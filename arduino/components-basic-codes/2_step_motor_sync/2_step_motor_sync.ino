#include <Stepper.h>

const int stepsPerRevolution = 2048; // number of steps per rotation

// Create instances of the Stepper class for each motor
Stepper myStepper1(stepsPerRevolution, 11, 9, 10, 8);
Stepper myStepper2(stepsPerRevolution, 7, 5, 6, 4);

void setup() {
  // Set the speed of both steppers
  myStepper1.setSpeed(15); 
  myStepper2.setSpeed(15); 
}

void loop() {
  // Run the first stepper for one revolution
  myStepper1.step(stepsPerRevolution); 

  // Wait 5 seconds after the first stepper finishes
  delay(1000);

  // Run the second stepper for one revolution
  myStepper2.step(stepsPerRevolution); 
  
  // Wait 5 seconds after the second stepper finishes
  delay(1000);
}
