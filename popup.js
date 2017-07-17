


var x=null,y=null,z=null;
var xhr = new XMLHttpRequest();

xhr.open("GET", "http://insurance-flights-pdp-trends.us-west-2.test.expedia.com/trends/getAllS", false);
xhr.send();
var result = xhr.responseText;
obj = JSON.parse(result);
console.log(obj);

var regrex=null;

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  //console.log("tabs: "+tabs[0].url);
  xhr.open("GET",tabs[0].url, false);
  xhr.send();
  var page = xhr.responseText;
//  console.log(page);
  regrex=page.match(/(piid)(":")(\w+(-)\w+(-)\w+)/);
  regrex=regrex[0].match(/\w+(-)\w(-)\w/g);
 // console.log(regrex[0]);
});


document.addEventListener('DOMContentLoaded', function() {
  

//Fetching the records from the table in the database.

  for (var i = 0; i < obj.length; i++) {
      
    
    var table = document.getElementById("myTableData");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var json_Offer=JSON.parse(obj[i].offer);
   //console.log(json_Offer);
    var json_ProductArray=json_Offer.flightProductDomainList;
    //console.log(json_ProductArray);
    var json_ODArray=json_ProductArray[0].flightOriginDestinationDomainList
    var OD_list="";

    console.log(json_ODArray);

    for(var j=0;j<json_ODArray.length-1;j++)
    {
      var json_flightSegmentDomainList=json_ODArray[j].flightSegmentDomainList;
      OD_list=OD_list+json_flightSegmentDomainList[0].carrierCode+"-";
    }
    
    json_flightSegmentDomainList=json_ODArray[json_ODArray.length-1].flightSegmentDomainList;
    OD_list=OD_list+json_flightSegmentDomainList[0].carrierCode;    

    row.insertCell(0).innerHTML=json_Offer.tpid+"/"+json_Offer.eapid;
    row.insertCell(1).innerHTML=OD_list ;
    row.insertCell(2).innerHTML=json_Offer.tripType;
    row.insertCell(3).innerHTML="<img id="+rowCount+" type='button' src='./cancel.png'  />";
    //Inserted the 4th row but it will not ne seen
    row.insertCell(4).innerHTML=obj[i].offer;
    table.rows[rowCount].cells[4].style.display="none";

    row.insertCell(5).innerHTML=obj[i].price;
    table.rows[rowCount].cells[5].style.display="none";

    row.insertCell(6).innerHTML="<img id="+"Analyze"+rowCount+" type='button' src='./analyze.png'  />";

    //console.log(table.rows[rowCount].cells[4].innerText);
    document.getElementById(rowCount).addEventListener('click', function() {
      var index = this.parentNode.parentNode.rowIndex;
      var table = document.getElementById("myTableData");
      console.log("Going To Delete.........."); 
      xhr.open("POST", "http://insurance-flights-pdp-trends.us-west-2.test.expedia.com/trends/deleteOffer");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      var test=JSON.stringify({
        offer: table.rows[index].cells[4].innerText,
        DateTime: table.rows[index].cells[1].innerText,
        price: Number(table.rows[index].cells[5].innerText),  
      });
      xhr.send(test);
      
      console.log("Deleted Offer: "+ test);
      table.deleteRow(index);
      
    });

    document.getElementById("Analyze"+rowCount).addEventListener('click', function() {
        
        var index = this.parentNode.parentNode.rowIndex;
        var table = document.getElementById("myTableData");
        
        console.log('We are Analyzing, please wait..............');
        
        xhr.open("POST", "http://insurance-flights-pdp-trends.us-west-2.test.expedia.com/trends/analyzeOffer");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        var test=JSON.stringify({
        offer: table.rows[index].cells[4].innerText,
        DateTime: table.rows[index].cells[1].innerText,
        price: Number(table.rows[index].cells[5].innerText),  
        });
        xhr.send(test);
        
        
        var result_list;
        var obj_array ;
        
        
        window.setTimeout(function () { 
          result_list=xhr.responseText;
          obj_array=JSON.parse(result_list);
          console.log(obj_array);
          chrome.storage.local.set({
            'objectArray': obj_array
          });
          chrome.tabs.create({url: chrome.extension.getURL('./graph.html')});
        }, 1000);

        
        
       
        
        console.log('Redirected to graph.html');
    });
  };

  //inserting record into table as well as database   
  document.getElementById('create').addEventListener('click', function() {
    //getting the pid.
    if(regrex!=null)
    console.log(regrex[0]);

    //just testing
    
     // xhr.open("POST", "http://insurance-flight-pdp-trends.us-west-2.test.expedia.com/trends/getPiid");
    //     xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //     var test=regrex[0];
    //     xhr.send(test);
    //     window.setTimeout(function () { 
    //       var result2 = xhr.responseText;
    //       console.log(result2);
    //     }, 1000);

    
    

  });

});


