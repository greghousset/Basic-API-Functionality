// CUSTOM JS FILE //

function init() {
  renderPeeps();
}

function renderPeeps(){
	jQuery.ajax({
		url : '/api/get/people',
		dataType : 'json',
		success : function(response) {
			console.log(response);

			var people = response.people;

			for(var i=0;i<people.length;i++){
				var peepName = people[i].name;
				var peepImage = people[i].imageUrl;
				//console.log(peepImage);
				calculateUserContributions(peepName,peepImage);
			}



		}
	})	
}

function calculateUserContributions(peepName,peepImage){
	jQuery.ajax({
		url : '/api/get/places/'+peepName,
		dataType : 'json',
		success : function(response) {
			console.log(response);

			var places = response.places;

			var peepContributions = places.length;

			//console.log(peepContributions);

			appendHTML(peepName,peepImage,peepContributions);

		}
	})	
}

function appendHTML(peepName,peepImage,peepContributions){
	console.log(peepImage);
	var htmlToAppend = 
	  '<div class="indPeepContainer">'+
        '<div class="imageContainer">'+
          '<img src="'+peepImage+'" alt="" class="imageClip">'+
        '</div>'+
        '<div class="nameHolder">'+
          '<p>'+peepName+'</p>'+
        '</div>'+
        '<div class="placeHolder">'+
          '<p>'+peepContributions+' spots</p>'+
        '</div>'+
      '</div>';

      return $('#peopleHolder').append(htmlToAppend);
}


window.addEventListener('load', init())