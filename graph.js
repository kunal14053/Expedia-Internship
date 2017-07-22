

document.addEventListener('DOMContentLoaded', function() {	
chrome.storage.local.get('objectArray', function (items) {
	
	
	d=[];
    l=[];
    data=[];
    var result = items.objectArray[0];
    
    document.getElementById('OfferNumber').innerHTML="Analyzing Offer: "+items.objectArray[3];


    data[data.length]=["DateTime","Price"];
       

    for (var i = 0; i < result.length; i++) {
        var res = result[i].DateTime.split(".");
        var res1=res[0].split("T");
        var resd=res1[0].split("-");
        var rest=res1[1].split(":");
        
	   l[l.length]=new Date(resd[0],resd[1],resd[2],rest[0],rest[1],rest[2]) ;
       d[d.length]=result[i].price;
       data[data.length]=[result[i].DateTime,result[i].price];
    }

    var csvContent = "data:text/csv;charset=utf-8,";
        data.forEach(function(infoArray, index){

            dataString = infoArray.join(",");
            csvContent += index < data.length ? dataString+ "\n" : dataString;

        }); 

   

     document.getElementById("download").onclick = function() {exportData()};

    

    document.getElementById("demo").onclick = function() {myFunction()};

    function myFunction() {
            if(document.getElementById("json").style.display=="none"){
                document.getElementById("json").style.display="block";
            }
            else{
                document.getElementById("json").style.display="none"
            }
        }
    
    var json_Offer= JSON.parse(items.objectArray[1]) ;
    document.getElementById("json").innerHTML = JSON.stringify(json_Offer, undefined, 30);
    var json_ProductArray=json_Offer.flightProductDomainList;
    var json_ODArray=json_ProductArray[0].flightOriginDestinationDomainList
    var OD_list="";
    var date=json_ODArray[0].localDepartureDate;

    for(var j=0;j<json_ODArray.length-1;j++)
    {
      var json_flightSegmentDomainList=json_ODArray[j].flightSegmentDomainList;
      OD_list=OD_list+json_flightSegmentDomainList[0].carrierCode+"-";
    }
    json_flightSegmentDomainList=json_ODArray[json_ODArray.length-1].flightSegmentDomainList;
    OD_list=OD_list+json_flightSegmentDomainList[0].carrierCode;  

        
    document.getElementById('trip-type').innerHTML="Trip Type: "+json_Offer.tripType;
    document.getElementById('eapid-tpid').innerHTML="TPID-EAPID: "+json_Offer.tpid+"/"+json_Offer.eapid;
    document.getElementById('carrier-code').innerHTML="Carrier Code: "+OD_list ;
    document.getElementById('date').innerHTML="Date: "+date ;
    var code=json_Offer.currencyCode;
   

    function exportData() {
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", json_Offer.tripType+"_"+json_Offer.tpid+"|"+json_Offer.eapid+"_"+OD_list+"_"+date+".csv");
        document.body.appendChild(link); 
        link.click();
    }



   
var ctx = document.getElementById("myChart").getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',
    title: {
            text: "Date Time Formatting"               
        },
      
             
     
    data: {
        labels: l,
        datasets: [{
            label: 'Price',
            data:d ,
            backgroundColor: [
                'rgba(133, 193, 233  , 0.65)',
                
            ],
            borderColor: [
                'rgba(28, 46, 75  ,1)',
                
            ],
            borderWidth: 3
        }]
    },  
    options: {



        legend: {
        display: false
        },
    

        scales: {
            
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                display: true,
                labelString: "Offer Price "+"("+code+")"
                }
            }],

            xAxes: [{
                valueFormatString: "DDDD MMM YYYY HH:mm:ss k",
                
                scaleLabel: {
                display: true,
                labelString: "Date-Time "
                }
            }],

        }
    }
});


//myChart.update();

document.getElementById("filter").onclick = function() {applyFilter()};
function applyFilter()
{
        
        var start=document.getElementById('StartDate').value+"T"+document.getElementById('StartTime').value+"Z";
        var end=document.getElementById('EndDate').value+"T"+document.getElementById('EndTime').value+"Z";
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://insurance-flights-pdp-trends.us-west-2.prod.expedia.com/trends/filterOffer");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        var test1=JSON.stringify({
        "subscriberOffers": items.objectArray[2] ,
        "dateTime1": start,
        "dateTime2": end  
        });
        xhr.send(test1);
        
        window.setTimeout(function () { 
        var filteredOffer=xhr.responseText;
        result1=JSON.parse(filteredOffer);
        console.log(result1)
        data=[];
        l=[];
        d=[];
        data=[];
        data[data.length]=["DateTime","Price"];
       

        for (var i = 0; i < result1.length; i++) {
            var res = result1[i].DateTime.split(".");
            var res1=res[0].split("T");
            var resd=res1[0].split("-");
            var rest=res1[1].split(":");
        
            l[l.length]=new Date(resd[0],resd[1],resd[2],rest[0],rest[1],rest[2]) ;
            d[d.length]=result1[i].price;
            data[data.length]=[result1[i].DateTime,result1[i].price];
        }

        var myChart = new Chart(ctx, {
    type: 'line',
    title: {
            text: "Date Time Formatting"               
        },
      
             
     
    data: {
        labels: l,
        datasets: [{
            label: 'Price',
            data:d ,
            backgroundColor: [
                'rgba(133, 193, 233  , 0.65)',
                
            ],
            borderColor: [
                'rgba(28, 46, 75  ,1)',
                
            ],
            borderWidth: 3
        }]
    },  
    options: {



        legend: {
        display: false
        },
    

        scales: {
            
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                display: true,
                labelString: "Offer Price "+"("+code+")"
                }
            }],

            xAxes: [{
                valueFormatString: "DDDD MMM YYYY HH:mm:ss k",
                
                scaleLabel: {
                display: true,
                labelString: "Date-Time "
                }
            }],

        }
    }
});
        

        },1000); 
        
        

       

}



});

});


