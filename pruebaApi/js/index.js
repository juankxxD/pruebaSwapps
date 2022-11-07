const $form = document.querySelector("form");
const $book = document.getElementById("book");
const $author = document.getElementById("author");
const $next = document.getElementById('btn-next');
const $back = document.getElementById('btn-back');
const LIMIT = 8;
let offset = 0;

let api = 'https://openlibrary.org/search.json?';

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const regex = / /gi;
  if ($book.value && $author.value) {
    const book = $book.value.trim().replace(regex, "+");
    const author = $author.value.trim().replace(regex, "+");
    api += `title=${book}?author=${author}`;
  } else if ($book.value) {
    const book = $book.value.trim().replace(regex, "+");
    api += `title=${book}`;
  } else if ($author.value) {
    const author = $author.value.trim().replace(regex, "+");
    api += `author=${author}`;
  }
  offset = 0;
  httpFetch();
});

function httpFetch() {
  fetch(`${api}&offset=${offset}&limit=${LIMIT}`)
    .then((res) => res.json())
    .then((data) => {
      let $containerInfo = document.querySelector(".container-info");
      if (data.docs.length > 0) {
        let html = '';
        for (let i = 0; i < data.docs.length; i++) {
          html += `
          <div class='container-cards'>
          <img src='http://covers.openlibrary.org/b/isbn/${data.docs[i].isbn[0]}-M.jpg'/>
          <div class='container-info-card'>
            <h2><span>Title: </span> ${data.docs[i].title}</h2>
            <h3><span>Author: </span> ${data.docs[i].author_name}</h3>
          </div>
          </div>`;
        }
        console.log(html)
        $containerInfo.innerHTML = html;
      } else {
        $containerInfo.innerHTML = "<h3>Not found</h3>";
      }
    });
}

$next.onclick = (e) => {
  offset += 8;
  httpFetch();
}