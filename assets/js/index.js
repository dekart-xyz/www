var suggestions = document.getElementById('suggestions');
var userinput = document.getElementById('userinput');

if (userinput) {
  document.addEventListener('keydown', inputFocus);
}

function inputFocus(e) {

  if (!userinput) return;

  if (e.keyCode === 191 ) {
    e.preventDefault();
    userinput.focus();
  }

  if (e.keyCode === 27 ) {
    userinput.blur();
    if (suggestions) {
      suggestions.classList.add('d-none');
    }
  }

}

if (suggestions) {
  document.addEventListener('click', function(event) {

    var isClickInsideElement = suggestions.contains(event.target);

    if (!isClickInsideElement) {
      suggestions.classList.add('d-none');
    }

  });
}

/*
Source:
  - https://dev.to/shubhamprakash/trap-focus-using-javascript-6a3
*/

if (suggestions) {
  document.addEventListener('keydown',suggestionFocus);
}

function suggestionFocus(e){

  if (!suggestions) return;

  const focusableSuggestions= suggestions.querySelectorAll('a');
  const focusable= [...focusableSuggestions];
  const index = focusable.indexOf(document.activeElement);

  let nextIndex = 0;

  if (e.keyCode === 38) {
    e.preventDefault();
    nextIndex= index > 0 ? index-1 : 0;
    focusableSuggestions[nextIndex].focus();
  }
  else if (e.keyCode === 40) {
    e.preventDefault();
    nextIndex= index+1 < focusable.length ? index+1 : index;
    focusableSuggestions[nextIndex].focus();
  }

}


/*
Source:
  - https://github.com/nextapps-de/flexsearch#index-documents-field-search
  - https://raw.githack.com/nextapps-de/flexsearch/master/demo/autocomplete.html
*/

(function(){

  var index = new FlexSearch({
    preset: 'score',
    cache: true,
    doc: {
        id: 'id',
        field: [
          'title',
          'description',
          'content',
        ],
        store: [
          'href',
          'title',
          'description',
        ],
    },
  });

  var docs = [
    {{ range $index, $page := (where .Site.Pages "Section" "docs") -}}
      {
        id: {{ $index }},
        href: "{{ .Permalink | absURL }}",
        title: {{ .Title | jsonify }},
        description: {{ .Params.description | jsonify }},
        content: {{ .Content | jsonify }}
      },
    {{ end -}}
  ];

  index.add(docs);

  if (userinput) {
    userinput.addEventListener('input', show_results, true);
  }
  if (suggestions) {
    suggestions.addEventListener('click', accept_suggestion, true);
  }

  function show_results(){

    if (!suggestions) return;

    var value = this.value;
    var results = index.search(value, 5);
    var entry, childs = suggestions.childNodes;
    var i = 0, len = results.length;

    suggestions.classList.remove('d-none');

    results.forEach(function(page) {

      entry = document.createElement('div');

      entry.innerHTML = '<a href><span></span><span></span></a>';

      a = entry.querySelector('a'),
      t = entry.querySelector('span:first-child'),
      d = entry.querySelector('span:nth-child(2)');

      a.href = page.href;
      t.textContent = page.title;
      d.textContent = page.description;

      suggestions.appendChild(entry);

    });

    while(childs.length > len){

        suggestions.removeChild(childs[i])
    }

  }

  function accept_suggestion(){

      if (!suggestions) return false;

      while(suggestions.lastChild){

          suggestions.removeChild(suggestions.lastChild);
      }

      return false;
  }

}());
