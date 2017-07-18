

document.addEventListener('DOMContentLoaded', function() {	
chrome.storage.local.get('objectArray', function (items) {
	
	
	d=[];
    l=[];

    var result = items.objectArray;
    
   

    for (var i = 0; i < result.length; i++) {
	   l[l.length]=result[i].DateTime;
       d[d.length]=result[i].price;
    }


    document.getElementById("demo").onclick = function() {myFunction()};

    function myFunction() {
            if(document.getElementById("json").style.display=="none"){
                document.getElementById("json").style.display="block";
            }
            else{
                document.getElementById("json").style.display="none"
            }
        }
    
    var json_Offer= JSON.parse(result[result.length-1].offer) ;
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
   



   

var ctx = document.getElementById("myChart").getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: l,
        datasets: [{
            label: 'Price',
            data:d ,
            backgroundColor: [
                'rgba(255, 255, 0, 0.5)',
                
            ],
            borderColor: [
                'rgba(255,0,0,1)',
                
            ],
            borderWidth: 2
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
                
                scaleLabel: {
                display: true,
                labelString: "Date-Time "
                }
            }],

        }
    }
});

});

});


