/*
just attach to GO, press load or save check mark. for unity 2017 should work fine in unity 5 and 2020. its JS. 
- file saved to assets/saved animations (must create that folder)
- file loads and plays if option selected
- To save the array to file at the end of a play, you have to press S + V keys. 
- only one file name 00000.bin, if you wanna record many GOS, just give them unique names. and put a script on every GO. 
- movement interferes with some physics if physics is conflicting the position update command, it will throw a NaN error. 
- only really works for cartoon type stuff, 2D, animations, nto physics integrated, but you can change the position commands into key press commands for that. 
- sorry it's rough code. 
- length can be set in options, for them moment it's like 1000 frames so 20 seconds of play, but you can make that 500 seconds. you can add localscale didnt have time. 
-antialias is not running, it's at teh end, you can use it to run through the array and anti-alias it prior to writing for replay at higher FPS.
*/
#pragma strict

import System.Collections.Generic;
import System.Runtime.Serialization.Formatters.Binary;
import System.IO;

private var myArray : float[] ;
private var myArray2 : float[] ;





	

	//var cam : Camera;
	
	 var Rarray : float[] ;
	private var num    = 1000   ; // index length to jump in 2D array 
	
	public var grecnow = false;
	public var gplaynow = false; 
	var Ptime = 0;
	 
	function Start()
	{	
		if( gplaynow == true )LoadList();
		Rarray = new float[num*60000];	
		for (vma in Rarray) vma = float.NaN;
		//restPosition = gameObject.transform.position;		
	}	

	
	function LateUpdate()
	{
		if(Input.GetKey ("s") && Input.GetKeyDown ("v")) SaveList();
		//print ("timeis"+Time.frameCount);

		 Ptime = Time.frameCount;
		

		
		if(grecnow == true) //record button
		{		
			recordNow(); //important function ===================--------------------------
		}		
		
		if( gplaynow == true  ) // REPLAY button

		{
			playFrame()	;		
		}	
	}
	
	function recordNow()
	{
		
		var gt = gameObject.transform;


				  var var1 = 0*num + Ptime ;	
				Rarray[ var1 ]   = gt.localPosition.x ;  //RECORD XY MOVES
				Rarray[ var1 +1] = gt.localPosition.x ;
				Rarray[ var1 +2] = gt.localPosition.x ;
				
				  var1 = 1*num + Ptime ;
				Rarray[ var1 ]   = gt.localPosition.y ;
				Rarray[ var1 +1] = gt.localPosition.y ;
				Rarray[ var1 +2] = gt.localPosition.y ;


				  var1 = 2*num + Ptime ;
				Rarray[ var1 ]   = gt.localPosition.z; //RECORD DIR
				Rarray[ var1 +1] = gt.localPosition.z;
				Rarray[ var1 +2] = gt.localPosition.z;
				



				  var1 = 3*num + Ptime ;
				Rarray[ var1 ]   = gt.eulerAngles.x; //RECORD ROTATION
				Rarray[ var1 +1] = gt.eulerAngles.x;
				Rarray[ var1 +2] = gt.eulerAngles.x;


			
				  var1 = 4*num + Ptime ;
				Rarray[ var1 ]   = gt.eulerAngles.y; //RECORD ROTATION
				Rarray[ var1 +1] = gt.eulerAngles.y;
				Rarray[ var1 +2] = gt.eulerAngles.y;

				
				  var1= 5*num + Ptime ;
				Rarray[ var1 ]   = gt.eulerAngles.z; //RECORD ROTATION
				Rarray[ var1 +1] = gt.eulerAngles.z;
				Rarray[ var1 +2] = gt.eulerAngles.z;

			
		}			
	
	
	function playFrame(){
		
		var gt = gameObject.transform;

		gt.localPosition.x    = Rarray[ 0*num + Ptime ]; //pos X
		gt.localPosition.y    = Rarray[ 1*num + Ptime ]; //pos Y
		gt.localPosition.z    = Rarray[ 2*num + Ptime ]; //pos Z
		
		gt.eulerAngles.x = Rarray[ 3*num + Ptime ]; //Rot 
		gt.eulerAngles.y = Rarray[ 4*num + Ptime ]; //Rot		
		gt.eulerAngles.z = Rarray[ 5*num + Ptime ]; //Rot
		
	}
	
		
	function printFrame()
	{	
	
		var gt = gameObject.transform;	
		for (var i:int = 0; i < 10000; i ++) 
		{
	
			print(" "+i+"  "+ Rarray[ 0*num + i ]+"  "+"  "+ Rarray[ 1*num + i ]+"  "+ Rarray[ 2*num + i ]);
		
		}
		
	}
	
	function AntiAlias(  ){
		for (var i:int = 0; i < Rarray.length-3; i ++)
			if ( Rarray[i] == Rarray[i+2] ) { Rarray[i+2] = ( Rarray[i] + Rarray[i+2] + Rarray[i+2] ) / 3 ; }
			if ( Rarray[i] == Rarray[i+1] ) { Rarray[i+2] = ( Rarray[i] + Rarray[i+1] ) / 2 ; }
	}


function SaveList() {
//getscript =
//getcontrols =
myArray = Rarray;
//herojs = Camera.main.GetComponent.<Controls>();
//var version = herojs.MYSAVE; // get save version number to prefix to save file
//var guid : String = GetComponent.<PersistentObject>().guid;// get guid from other script
//var guid15 : String = guid.Substring(0, 15); // only use 15 first chars of guid for shorter filenames
var filename : String;
var myFileStream : FileStream;
filename = Path.Combine(Application.dataPath+ "/saved animations/", ("00000")+".bin");
myFileStream = new FileStream(filename, FileMode.Create);
var binaryFormat : BinaryFormatter = new BinaryFormatter();
binaryFormat.Serialize(myFileStream, myArray);


myFileStream.Close();
print( " array saved ok");
}


function LoadList () {
	
//myArray = GetComponent.<Test>().Rarray;
//herojs = Camera.main.GetComponent.<Controls>();
//var version = herojs.MYSAVE; // get save version number to prefix to save file
//var guid15 : String = guid.Substring(0, 15); // only use 15 first chars of guid for shorter filenames
var filename : String;
var myFileStream : FileStream;
filename = Path.Combine(Application.dataPath+ "/saved animations/", ("00000") + ".bin");
myFileStream = new FileStream(filename, FileMode.Open, FileAccess.Read);
var binaryFormat : BinaryFormatter = new BinaryFormatter();
myArray2 = binaryFormat.Deserialize(myFileStream) as float[];
Rarray = myArray2;
//yield WaitForFixedUpdate();
printFrame();
myFileStream.Close();
print( " array loaded ok");



}

function OnApplicationQuit() {
//SaveList();
}






