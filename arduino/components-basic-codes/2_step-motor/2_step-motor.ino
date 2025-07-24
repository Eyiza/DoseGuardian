#include <Stepper.h>

const int stepsPerRevolution = 2048; // number of steps per rotation
int stepCount1 = 0;  // Keep track of steps for the first stepper
int stepCount2 = 0;  // Keep track of steps for the second stepper
const int stepIncrement = 1;  // Increment for each iteration
unsigned long previousMillis = 0; 
const long interval = 2;  // Time between steps (adjust for smooth motion)

Stepper myStepper = Stepper(stepsPerRevolution, 11, 9, 10, 8);
Stepper myStepper2 = Stepper(stepsPerRevolution, 7, 5, 6, 4);

void setup() {
  myStepper.setSpeed(15); 
  myStepper2.setSpeed(15); 
}

void loop() {
  unsigned long currentMillis = millis();
  
  // Alternate stepping both motors in non-blocking fashion
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    
    if (stepCount1 < stepsPerRevolution) {
      myStepper.step(stepIncrement);  // Take one step for Stepper 1
      stepCount1 += stepIncrement;    // Track steps
    }
    
    if (stepCount2 < stepsPerRevolution) {
      myStepper2.step(stepIncrement); // Take one step for Stepper 2
      stepCount2 += stepIncrement;    // Track steps
    }

    // Reset the counters after one full rotation
    if (stepCount1 >= stepsPerRevolution && stepCount2 >= stepsPerRevolution) {
      delay(5000);  // Delay between full rotations
      stepCount1 = 0; 
      stepCount2 = 0;
    }
  }
}
