$(function() {

var $trackName = $('#track');
var $resultList = $('#results');

function Result(track, artist, album, url, previewUrl) {
	this.track = track;
	this.artist = artist;
	this.album = album;
	this.url = url || 'http://www.bundeskunsthalle.de/fileadmin/user_upload/no_image_available.png';
	this.previewUrl = previewUrl;
}

Result.prototype.render = function() {
	var $item = $(itemTemplate(this));
	$itemList.append($item);
}

$('#spotify-search').on('submit', function(event) {
	event.preventDefault();

	$.get('https://api.spotify.com/v1/search?q=' + $trackName.val() + '&type=track', function(data) {
	    var resultsArr = data.tracks.items;
	    console.log(data.tracks.items.length);

	    if (resultsArr.length == 0) {
	    	alert('Search returned no results. Try again.');
	    	$resultList.html('');
	    } else {
		    var newArr = [];

		    $.each(resultsArr, function() {
		    	newArr.push(new Result(this.name, this.artists[0].name, this.album.name, this.album.images[0].url, this.preview_url));
		    });

		    $resultList.html('');

		    var template = _.template($('#result-template').html());

		    _.each(newArr, function(item) {
		    	$resultList.append(template(item));

		    });
		}

	$trackName.val('');


	});

});

});