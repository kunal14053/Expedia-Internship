
// var storedLegal = chrome.storage.local.get('objectArray', function (items) {
//     console.log(items); 
    
//     for (var i = 0; i < items.length; i++) {
//         console.log(items.obj_array[i]);
//     }

    
//   });


// var fruits = ["Banana", "Orange", "Apple", "Mango"];
// fruits[fruits.length] = "Lemon";     // adds a new element (Lemon) to fruits

document.addEventListener('DOMContentLoaded', function() {	
chrome.storage.local.get('objectArray', function (items) {
	
	
	d=[];
    l=[];
	//console.log(items);

    var result = items.objectArray;
    
    //console.log(result);

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
    //console.log(json_ProductArray);
    var json_ODArray=json_ProductArray[0].flightOriginDestinationDomainList
    var OD_list="";

    //console.log(json_ODArray);

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
    var code=json_Offer.currencyCode;
   // console.log(code);



   //console.log(s.value);

var ctx = document.getElementById("myChart").getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: l,
        datasets: [{
            label: 'Price',
            data:d ,
            backgroundColor: [
                'rgba(255, 255, 132, 0.1)',
                
            ],
            borderColor: [
                'rgba(0,99,132,1)',
                
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


