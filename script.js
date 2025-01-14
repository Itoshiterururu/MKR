let nextPage = 1;
let characterCount1 = 1;
let isLoading = false;

function httpRequest(type, url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            callback(response);
        }
    };
    xhr.send();
}
function loadCharacters() {
    const characterList = document.getElementById("character-list");
    const characterDetails = document.getElementById("character-details");
    let nextPage = 1;

    function loadMoreCharacters() {
        httpRequest("GET", `https://anapioficeandfire.com/api/characters?page=${nextPage}&pageSize=50`, function (data) {
            if (data.length === 0) {
                window.removeEventListener('scroll', scrollHandler);
                return;
            }
            data.forEach(function (character, index) {
                const listItem = document.createElement("li");
                listItem.textContent = `Character ${characterList.children.length + 1}`;

                listItem.addEventListener("click", function () {
                    loadCharacterDetails(character.url);
                    markSelectedCharacter(index);
                });

                characterList.appendChild(listItem);

                if (index === 0) {
                    loadCharacterDetails(character.url);
                    markSelectedCharacter(0);
                }
            });
            nextPage++;
        });
    }
    function markSelectedCharacter(index) {
        Array.from(characterList.children).forEach((item) => {
            item.classList.remove('selected');
        });
        characterList.children[index].classList.add('selected');
    }

    loadMoreCharacters();

    function scrollHandler() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            loadMoreCharacters();
        }
    }

    window.addEventListener('scroll', scrollHandler);
}
function loadCharacterDetails(characterUrl) {
    const characterDetails = document.getElementById("character-details");
    httpRequest("GET", characterUrl, function (data) {
    });
}


loadCharacters();

$(window).on('mousewheel DOMMouseScroll', function(e) {
	var $target = $(e.target);
  
  if($target.hasClass('characters-list')) {
  	var scrollTop = $target.scrollTop();
    var scrollHeight = $target[0].scrollHeight;
    var height = $target.outerHeight(false);
    var delta = e.deltaY || e.detail * -1 || e.originalEvent.wheelDelta;
    
    if(scrollTop <= 0 && delta >= 0) {
      return false;
    }
    else if(scrollTop >= scrollHeight - height &&  delta < 0) {
    	return false;
    }
  }
});
