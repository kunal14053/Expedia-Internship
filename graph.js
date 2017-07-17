
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
	console.log(items);

    var result = items.objectArray;
    
    console.log(result);

    for (var i = 0; i < result.length; i++) {
	   l[l.length]=result[i].DateTime;
       d[d.length]=result[i].price;
    }




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
            borderWidth: 5
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

});

});


