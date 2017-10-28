"use strict"

function File(title){
	const fs = require('fs');

	this.title = title;
	var size = 0;
	var dataArray;

	var paths = "../"+title;

	this.getSize = function(){
		return size;
	}

	this.setSize = function(newSize){
		this.size = newSize;
	}

	this.getDataArray = function(){
		return dataArray;
	}

	this.setDataArray = function(newData){
		this.dataArray = newData;
	}

	this.readFile = function(callback){
		fs.readFile(paths, (err, dataBuffer)=>{
			if(err)
				throw err;
			else{
				dataArray = Array.prototype.slice.call(dataBuffer, 0);
				size = dataArray.length;
			}
			callback();
		});
	}

	this.writeFile = function(bufferWrite){
		//console.log("DataString : ", bufferWrite);
		fs.writeFile(title, bufferWrite, (err)=>{
			if(err)
				throw err;
			else{
				console.log("CompareSorti written");
			}
		});
	}

	this.ifExist = function(){
		return fs.existsSync(paths);
	};
}

module.exports = File;
