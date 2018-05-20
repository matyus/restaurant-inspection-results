function parseJSON(response) { return response.json() };

function handleJSON(json) {
  var list = document.getElementById('search-results');
  var resultsList = document.createElement('ul');

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  if (json.length == 0) {

    resultsList.append('No results found.');

  } else {

    for (var index = 0; index < json.length; index++) {
      var dba = json[index].dba;
      var cuisine = json[index].cuisine_description;
      var violation = json[index].violation_description;
      var inspectionDate = json[index].inspection_date;
      var grade = json[index].grade;
      var street = json[index].street;
      var boro = json[index].boro;

      var listItem = document.createElement('li');

      listItem.innerHTML = `
        <p class="dba" title="${cuisine}"><strong>${dba} ${grade ? `<span class="grade ${grade.toLowerCase()}">${grade}</span>` : ''}</strong> <span class="cuisine">${cuisine}</span></p>
        <p><span class="date">${moment(inspectionDate).format('LL')}</span></p>
        <p class="description">${violation ? violation.replace(/Â/g,'') : json[index].action}</p>
        <p class="street">${street}, ${boro}</p>
      `;

      resultsList.append(listItem);
    }

  }

  list.append(resultsList);
};

function handleSubmit(event) {
  event.preventDefault();

  var zipCode = event.target.elements['zipcode'].value;

  var url = new URL('https://data.cityofnewyork.us/resource/9w7m-hzhe.json')
  url.searchParams.append('zipcode', zipCode)
  url.searchParams.append('$order', 'dba')

  fetch(url)
    .then(parseJSON)
    .then(handleJSON);
};

var searchForm = document.getElementById('search');

searchForm.addEventListener('submit', handleSubmit, false);
