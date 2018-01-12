
window.addEventListener('click', clicked);
window.addEventListener('keypress', pressed);


function clicked(e)
{
  var id = e.toElement.id;
  if (id == 'searchBtn')
  {
      search();
  }
}

function pressed(e)
{
  if($(e.target).is('input'))
  {
    if (e.keyCode == 13)
        {
            search();
        }
  }
  else
  {
    return;
  }
}

function search()
{

  var query = $("#searchbar").val();
  console.log(query);
  if (query)
  {

    location.assign('http://2048-game.review?q=' + query);
  }
}
