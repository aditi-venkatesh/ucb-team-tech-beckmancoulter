int ledPin = 5;
int ledPin2 = 4;
int buttonApin = 9;
int buttonBpin = 8;

void setup() 
{
  pinMode(ledPin, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(buttonApin, INPUT_PULLUP);  
  pinMode(buttonBpin, INPUT_PULLUP);  
}

void loop() 
{
  if(digitalRead(buttonApin) == LOW)
  {
    digitalWrite(ledPin, HIGH);
    while(digitalRead(buttonBpin) != LOW)
     {
       loop2();
     }
  }
  if(digitalRead(buttonBpin) == LOW)
  {
    digitalWrite(ledPin2, LOW);
    digitalWrite(ledPin, LOW);
  }
}

void loop2()
{
    digitalWrite(ledPin2, HIGH);
    delay(1000);
    digitalWrite(ledPin2, LOW);
    delay(1000);
}
