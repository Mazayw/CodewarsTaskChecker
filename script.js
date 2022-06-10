const name = document.getElementsByClassName('cw-name')[0];
const links = document.getElementsByClassName('cw-links')[0];
const result = document.getElementsByClassName('cw-result')[0];
const button = document.getElementsByClassName('check-button')[0];
//links.value =
button.addEventListener('click', () => {
  let page = 0;
  let link = `https://www.codewars.com/api/v1/users/${name.value}/code-challenges/completed?page=${page}`;

  console.log(link);

  const allLinksArr = links.value
    .split(' ')
    .filter((el) => el.startsWith('http'));

  const slugs = [];
  const done = [];

  allLinksArr.forEach((el) => {
    const strEnd = el.indexOf('\n') !== -1 ? el.indexOf('\n') : el.length;
    const slug = el.slice(el.indexOf('kata') + 4, strEnd);
    slugs.push(slug.replaceAll(/\//gi, ''));
  });

  console.log(slugs);
  console.log(allLinksArr);

  fetch(link)
    .then((res) => res.json())
    .then((data) => {
      //console.log('lalaal', data.data);
      data.data.forEach((el) => {
        if (slugs.includes(el.slug)) {
          done.push(el);
        }
      });
      console.log(done);
    });
});

/*
Classes, Prototypes
8 kyu https://www.codewars.com/kata/regular-ball-super-ball
7 kyu https://www.codewars.com/kata/what-a-classy-song
7 kyu https://www.codewars.com/kata/fun-with-es6-classes-number-2-animals-and-inheritance
7 kyu https://www.codewars.com/kata/fun-with-es6-classes-number-4-cubes-and-setters
6 kyu https://www.codewars.com/kata/fun-with-es6-classes-number-6-fake-files-basic
6 kyu https://www.codewars.com/kata/array-helpers
6 kyu https://www.codewars.com/kata/array-number-reduce
5 kyu https://www.codewars.com/kata/using-closures-to-share-class-state
Asynchronous
6 kyu https://www.codewars.com/kata/i-promise-not-to-optimize
6 kyu https://www.codewars.com/kata/jokes-youve-been-awaiting-for-dot-dot-dot-promise
6 kyu https://www.codewars.com/kata/nuclear-missile-manager
OOP, Design Patterns
7 kyu https://www.codewars.com/kata/santaclausable-interface
7 kyu https://www.codewars.com/kata/singleton-pattern
7 kyu http://www.codewars.com/kata/patterncraft-adapter/
7 kyu http://www.codewars.com/kata/patterncraft-visitor/
6 kyu http://www.codewars.com/kata/patterncraft-state/
6 kyu http://www.codewars.com/kata/patterncraft-strategy/
6 kyu http://www.codewars.com/kata/patterncraft-decorator/
Beta https://www.codewars.com/kata/class-extension-model-with-mixin-ability
6 kyu https://www.codewars.com/kata/extract-nested-object-reference
6 kyu https://www.codewars.com/kata/image-host-filename-generator
5 kyu https://www.codewars.com/kata/replicate-new
5 kyu https://www.codewars.com/kata/simple-events
4 kyu http://www.codewars.com/kata/undo-slash-redo
4 kyu https://www.codewars.com/kata/dependency-injection
*/
