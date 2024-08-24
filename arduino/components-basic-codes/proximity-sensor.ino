int IRSensor = 9;
int LED = 13; // connect LED to Arduino pin 13

void setup(){
  pinMode(IRSensor, INPUT); // Initialize the sensor pin as input
  pinMode(LED, OUTPUT); // Initialize the LED pin as output

    Serial.begin(300);
}

void loop(){
  int sensorStatus = digitalRead(IRSensor); // Set the GPIO as Input
  Serial.println(sensorStatus);
  if (sensorStatus == 1) // Check if the pin high or not
  {
    // if the pin is high turn on the onboard Led
    digitalWrite(LED, HIGH); // LED LOW
    Serial.println("Motion Detected!"); // print Motion Detected! on the serial monitor window
  }
  else  {
    //else turn off the onboard LED
    digitalWrite(LED, LOW); // LED Low
    Serial.println("Motion Ended!"); // print Motion Ended! on the serial monitor window
  }
}