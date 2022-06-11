const name = document.getElementsByClassName('cw-name')[0];
const links = document.getElementsByClassName('cw-links')[0];
const result = document.getElementsByClassName('cw-result')[0];
const button = document.getElementsByClassName('check-button')[0];
const doneTasks = document.getElementsByClassName('done-tasks')[0];
const undoneTasks = document.getElementsByClassName('undone-tasks')[0];

let done = [];
let undone = [];
let page = 0;
let userKatas = [];

button.addEventListener('click', () => {
  if (name.value.length === 0 || links.value.length === 0) {
    alert('Fill all fields');
  } else {
    done = [];
    undone = [];
    page = 0;
    userKatas = [];
    doneTasks.innerHTML = '';
    undoneTasks.innerHTML = '';

    const allLinksArr = links.value
      .split(' ')
      .filter((el) => el.includes('codewars.com/kata'));

    const slugs = [];

    allLinksArr.forEach((el) => {
      const strEnd = el.indexOf('\n') !== -1 ? el.indexOf('\n') : el.length;
      const slug = el.slice(el.indexOf('kata') + 4, strEnd);
      slugs.push(slug.replaceAll(/\//gi, ''));
    });
    if (slugs.length === 0) {
      alert('Enter some Codewars katas links first');
    } else {
      getUserKatas(name.value, page, slugs);
    }
  }
});

function getUserKatas(user, page, slugsData) {
  try {
    fetch(
      `https://www.codewars.com/api/v1/users/${user}/code-challenges/completed?page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          alert('You entered wrong name. Check the upper and lower case');
        } else {
          userKatas = [...userKatas, ...data.data];
          page++;

          if (page < data.totalPages) {
            getUserKatas(user, page, slugsData);
          } else {
            userKatas.forEach((el) => {
              if (slugsData.includes(el.slug)) done.push(el.slug);
            });

            slugsData.forEach((el) => {
              if (!done.includes(el)) undone.push(el);
            });

            done.forEach((el) => {
              createHtml(el, doneTasks, 'Done Katas');
            });

            undone.forEach((el) => {
              createHtml(el, undoneTasks, 'Undone Katas');
            });
          }
        }
      });
  } catch (error) {
    console.log(error);
  }
}

function createHtml(slug, item, headerText) {
  if (!item.hasChildNodes()) {
    const header = document.createElement('h2');
    header.innerText = headerText;
    item.appendChild(header);
  }
  const link = document.createElement('a');
  link.className = 'task-link';
  link.innerText = `https://www.codewars.com/kata/${slug}`;
  link.href = `https://www.codewars.com/kata/${slug}`;
  item.appendChild(link);
}
