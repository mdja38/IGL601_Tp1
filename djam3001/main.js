"use strict"

main();

function main (){
	const ClassFile = require('./File.js');

	var countSync = 0;
	var dataWArray = [];
	var data="";
	//Create an instance of ClassFile and read the file CompareA.
	var fileA = new ClassFile("CompareA");
	fileA.readFile(_cbCount);

	//Create an instance of ClassFile and read the file CompareB.
	var fileB = new ClassFile("CompareB");
	fileB.readFile(_cbCount);

	//Create an instance of ClassFile and read the file CompareO.
	var fileO = new ClassFile("CompareOriginal");
	fileO.readFile(_cbCount);

	/*Function callback after reading one file.
	* FileData is an array of ASCII code
	* To compare files, all files must be read. That's why I use a counter.
	* dataWArray is an Array of ASCII code, which allows to write the file.
	*/
	function _cbCount(){
		countSync = countSync+1;
		if(countSync==3){
			var file1 = max(fileA, max(fileO, fileB));
			var file2 = max(fileA, min(fileO, fileB));
			var file3 = min(fileA, min(fileO,fileB));
			_compare(file1, file2, file3);
			// Convert ASCII code in string and create a string data.
			for(var j=0; j<dataWArray.length; j++){
				dataWArray[j]=String.fromCharCode(dataWArray[j]); 
				data = data+dataWArray[j];
			}
			_writeBufOut();
		}
	}

	/*Function compare the three files and create a data to write in a future file.
	* file1 = the file with the maximum size
	* file3 = the file with the minimum size
	* file2 = the file between both.
	* ASCII Code : 32 -> ! (the first visible char).
	* Based on the biggest file between the three ones : CompareB.
	* By index, if all have the same ASCII code : that's okay
	* 			if CompareB has a whole, data(index) take the CompareA(index) or CompareOriginal(index)
	* 			if CompareB has a difference, and CompareA and CompareOriginal are the same value, data(index) take their value.
	* 			if all have different values, data(index) take the value of CompareB.
	*/
	function _compare(file1, file2, file3){
		for(var i=0; i<file1.getSize(); i++){
			if(file1.getDataArray()[i]==file2.getDataArray()[i] && file2.getDataArray()[i]==file3.getDataArray()[i])
				dataWArray.push(file1.getDataArray()[i]);
			else{
				if(file1.getDataArray()[i]>32 && (file2.getDataArray()[i]!=10 && file2.getDataArray()[i]!=13 && file2.getDataArray()[i]!=null)){ //Code ASCII
					if(file1.getDataArray()[i]!=file2.getDataArray()[i] && file2.getDataArray()[i]==file3.getDataArray()[i])
						dataWArray.push(file2.getDataArray()[i]);
					else
						dataWArray.push(file1.getDataArray()[i]);
				}
				else if(file1.getDataArray()[i]==10 && file1.getDataArray()[i+1]==13){
					if(file2.getDataArray()[i]>32){
						dataWArray.push(10);
						dataWArray.push(file2.getDataArray()[i]);
					}
					else if(file3.getDataArray()[i]>32){
						dataWArray.push(10);
						dataWArray.push(file3.getDataArray()[i]);
					}
				}
				else
					dataWArray.push(file1.getDataArray()[i]);
			}
		}
	}

	/* Function to create a new File, our Out File.
	* Call method to create and write the file with the data String.
	*/
	function _writeBufOut(){
		var fileOut = new ClassFile("CompareSortie");
		if(!fileOut.ifExist())
			fileOut.writeFile(data);
		else
			console.log("File already existed");
	}
}

function max(file1, file2){
	if(file1.getSize()>=file2.getSize())
		return file1;
	else
		return file2;
}


function min(file1, file2){
	if(file1.getSize()>=file2.getSize())
		return file2;
	else
		return file1;
}

