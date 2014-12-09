// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 17-3: Scrolling headlines

// An array of news headlines
String[] headlines = {
  "Autori:" ,
  "Author1." ,
  "Author2." ,
};

PFont f; // Global font variable
float x; // Horizontal location
int index = 0;

void setup() {
  size(400,200);
  f = createFont( "Arial" ,16,true);

  // Initialize headline offscreen
  y = height;
}

void draw() {
  background(255);
  fill(0);

  // Display headline at x location
  textFont(f,16);
  textAlign (LEFT);

  // A specific String from the array is displayed according to the value of the "index" variable.
  for(int i=0;i<3;i++)
  {
    text(headlines[i],10,y+i*20);
  }
  // Decrement y
  y = y - 1;

  if(y< -20*3) y=height;
}
