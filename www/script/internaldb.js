function WriteToFile(filename,filedata){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    function gotFS(fileSystem) {
        fileSystem.root.getFile(""+filename, {create: true, exclusive: false}, gotFileEntry, fail);
    }
    
    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }
    
    function gotFileWriter(writer) {
        writer.write(""+filedata);
		writer.onwriteend = function(evt) {
			//alert("Write file Successful: "+filedata);
			//location.reload();
        };
    }
    function fail(error) {
        console.log("Error: Write file(" +error.code+ ")");
    }
}

function ReadForWrite(filename,data)
{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	
    function gotFS(fileSystem) {
        fileSystem.root.getFile(""+filename, {create: true, exclusive: false}, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
		fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
		readAsText(file);
    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as text"+evt.target.result);
			dataRead = evt.target.result;
            var DataRead = evt.target.result;;
            //alert("DataRead :: "+ DataRead);
			if (DataRead != ""){
                //alert("dataRead : "+DataRead);
				var tempData = DataRead+""+data+",";
				//WriteToFile("readme.txt",tempData);
				WriteToFile("backlog.txt",tempData);
			}
			else{
                //alert("dataRead : NULL");
				//WriteToFile("readme.txt",data);
                var tempData = data+",";
                //WriteToFile("readme.txt",tempData);
                WriteToFile("backlog.txt",tempData);
			}
            backlogStatus = "done";
		};
		reader.readAsText(file);
    }

    function fail(evt) {
        console.log(evt.target.error.code);
    }
}
function ReadFile(filename,receive)
{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	
    function gotFS(fileSystem) {
        //fileSystem.root.getFile(""+filename, null, gotFileEntry, fail);
        fileSystem.root.getFile(""+filename, {create:true, exclusive:false}, gotFileEntry,fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
        readAsText(file);
    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as text"+evt.target.result);
			dataRead = evt.target.result;
			receive = dataRead;
            //alert("SS : "+ receive);
            testDB = dataRead;
            //WriteToFile("backlog.txt","");

                WriteToFile("backlog.txt","");
                if(testDB!==""){
                    //WriteToFile("backlog.txt","");
                    //var backlogarr = data.split(",");
                    testDBArray = testDB.split(",");
                    testDB = "";
                    testDBArray = testDBArray.filter(function(n){ return n != "" });
                    testDBArray = testDBArray.filter(function(n){ return n != undefined });
                    var testDBArrayCount = testDBArray.length;
                    //alert(testDBArrayCount+" ; ");



                    //for(var i=0;i<testDBArrayCount;i++){
                        
                        //alert("["+i+"]"+testDBArray[i]);
                        //print_testDBArray();
                        /*
                        var temp = backlogarr[backlogarr.length - 1];
                        backlogarr.splice(backlogarr.length-1,1);
                        console.log("Length : "+backlogarr.length);
                        backlogarr.forEach(function(entry) {
                            console.log(entry);
                        });
                        */
                        
                        //var temp = testDBArray[i];
                        //testDBArray.splice(i,1);
                        //testDBArray = testDBArray.filter(function(n){ return n != undefined });
                        //backlogarr.push(temp);

                        //sent data
                        //console.log("delete and sending...");
                        //
                    //}
					sentDataBacklog();
                }

        };
		reader.readAsText(file);
    }

    function fail(evt) {
        console.log(evt.target.error.code);
    }
}
