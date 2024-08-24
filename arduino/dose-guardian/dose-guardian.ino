#include <Stepper.h>

const int Motor1IN1 = 4;
const int Motor1IN2 = 5;
const int Motor1IN3 = 6;
const int Motor1IN4 = 7;

const int Motor2IN1 = 8;
const int Motor2IN2 = 9;
const int Motor2IN3 = 10;
const int Motor2IN4 = 11;

const int Buzzer = 2;
const int IRSensor = 3;
const int greenLED = 12;
const int redLED = 13;

Stepper Container1 = Stepper(2048, Motor1IN1, Motor1IN3, Motor1IN2, Motor1IN4); // For Cartridge 1
Stepper Container2 = Stepper(2048, Motor2IN1, Motor2IN3, Motor2IN2, Motor2IN4); // For Cartridge 2

const int stepsPerRevolution = 2048;
const int initialSpeed = 0;
const int movingSpeed = 18;

int drugDropped = 0;
int drugExpectedFromContainer1 = 2;
int drugExpectedFromContainer2 = 3;
char status = "in-progress";


void setup() {
  pinMode(Buzzer, OUTPUT);
  pinMode(IRSensor, INPUT);
  pinMode(greenLED, OUTPUT);
  pinMode(redLED, OUTPUT);

  digitalWrite(greenLED, LOW);
  digitalWrite(redLED, HIGH);

  Container1.setSpeed(initialSpeed);
  Container2.setSpeed(initialSpeed);
}

void loop() {
  if (status == "in-progress") {
    dispenseMedication();
  }

  medicationReady();
  status = "completed";
}

void dispenseMedication() {
  while (drugDropped < drugExpectedFromContainer1) {
    moveContainer(1);
    int sensorStatus = digitalRead(IRSensor);
    if (sensorStatus == 1) {
      drugDropped += 1;
    }
  }
  stopContainer(1);
  drugDropped = 0;
  
  while (drugDropped < drugExpectedFromContainer2) {
    moveContainer(2);
    int sensorStatus = digitalRead(IRSensor);
    if (sensorStatus == 1) {
      drugDropped += 1;
    }
  }
  stopContainer(2);
  drugDropped = 0;
}

void moveContainer(int container) {
  if (container == 1) {
    Container1.setSpeed(movingSpeed);
    Container1.step(stepsPerRevolution);
    Container1.setSpeed(initialSpeed);
  } else if (container == 2) {
    Container2.setSpeed(movingSpeed);
    Container2.step(stepsPerRevolution);
    Container2.setSpeed(initialSpeed);
  }
}

void stopContainer(int container) {
  if (container == 1) {
    Container1.setSpeed(initialSpeed);
  } else if (container == 2) {
    Container2.setSpeed(initialSpeed);
  }
}

void medicationReady() {
  digitalWrite(greenLED, HIGH);
  digitalWrite(redLED, LOW);
  tone(Buzzer, 1000);
  delay(1000);
  noTone(Buzzer);
}