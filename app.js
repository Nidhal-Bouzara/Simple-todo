const detailsButton = document.querySelectorAll('.app-todos__item--interactions___detailsContainer');
const deleteButton = document.querySelectorAll('.app-todos__item--interactions___deleteContainer');

// event adder funcs

let aelDetailsButton = (list) => {
  for (var i = 0; i < list.length; i++) {
    let details = list[i].parentElement.parentElement.parentElement.children[1];
    list[i].addEventListener('mouseenter', () => {
      details.style.display = 'block';
    });
    list[i].addEventListener('mouseleave', () => {
      details.style.display = 'none';
    });
  }
};
let aelDeleteButton = (list) => {
  for (var i = 0; i < list.length; i++) {
    let parent = list[i].parentElement.parentElement.parentElement;
    list[i].addEventListener('click', () => {
      parent.remove();
    })
  }
};
//event adder funcs end
aelDetailsButton(detailsButton);
aelDeleteButton(deleteButton);

const todos = new XMLHttpRequest();
todos.open('GET', 'https://jsonplaceholder.typicode.com/users/1/todos');
todos.send();
todos.addEventListener('readystatechange', () => {
  if (todos.readyState === 4 && todos.status === 200) {
    console.log('XMLHttpRequest request made successfully');
  };
})

const addButton = document.querySelector('.app-todos__add--button');
let todosList = document.querySelector('.app-todos__items');
// console.log(todosList.lastElementChild.children[0].children[1].children[0]);
addButton.addEventListener('click', () => {
  let todoText = document.querySelector('.app-todos__add--input').value;
  let todoDiv = document.createElement('div');
  todoDiv.classList += 'app-todos__item'
  if (todoText != "") {
    todoDiv.innerHTML = `
      <div class="app-todos__item">
        <div class="app-todos__slice">
          <p class="app-todos__item--title">${todoText}</p>
          <div class="app-todos__item--interactions">
            <div class="app-todos__item--interactions___detailsContainer">
              <i class="app-todos__item--interactions___details fas fa-ellipsis-h"></i>
            </div>
            <div class="app-todos__item--interactions___deleteContainer">
              <i class="app-todos__item--interactions___delete fas fa-trash-alt"></i>
            </div>
          </div>
        </div>
        <div class="app-todos__item--details hide">
          <p class=".app-todos__item--details___text">roorem ipsum dolor sit amet.</p>
        </div>
      </div>
    `
    todoText = null;
    todosList.appendChild(todoDiv.children[0]);
    todosList.lastElementChild.children[0].children[1].children[0].addEventListener('mouseenter', (e) => {
      e.target.parentElement.parentElement.nextElementSibling.style.display = 'block';
    });
    todosList.lastElementChild.children[0].children[1].children[0].addEventListener('mouseleave', (e) => {
      e.target.parentElement.parentElement.nextElementSibling.style.display = 'none';
    });
    todosList.lastElementChild.children[0].children[1].children[1].addEventListener('click', (e) => {
      e.stopPropagation();
      if(e.target !== this) {

        e.target.parentElement.parentElement.parentElement.parentElement.remove();
      } else {
        e.target.parentElement.parentElement.parentElement.remove();
      }
    })
  }
});
console.log('hello');

// 'outdated' method

/*
const getData = (address) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4 && request.status === 200) {
        resolve(JSON.parse(request.responseText));
      } else if(request.readyState === 4){
        reject('error getting data at '+ address + 'readyState = ' + request.readyState + 'status = ' + request.status);
      }
    })
    request.open('GET', address);
    request.send();
  })}

getData('personA.json').then(data => {
  console.log('personA data: ',data);
  return getData('personB.json');
}).then(data => {
  console.log('personB data: ', data);
  return getData('personC.json');
}).then(data => {
  console.log('personC data: ',data);
}).catch(err => {
  console.log(err);
});
*/

// *new* outdated again :D
/*
// chained three fetch requests. fetching personA.json, personB.json, personC.json.
fetch('personA.json')
  .then(response => {
    if(response.status === 200) {
      return response.json(); // returns a promise
    } else {
      console.log('error occured: ', response.status);
    }
})
  .then(data => {
    console.log('personA data: ', data);
    return fetch('personB.json'); // fetching personB.json
})
  .then(response => {
    if(response.status === 200) {
      return response.json();
    } else {
      console.log('error occured: ', response.status);
    }
})
  .then(data => {
    console.log('personB data: ', data);
    return fetch('personC.json'); // fetching personC.json
})
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log('error occured: ', response.status);
    }
})
  .then(data => {
    console.log('personC data: ', data);
})
  .catch(err => {
    console.log('error caught: ', err);
}); // :D

console.log(200 == '200'? 'niggers' : 'it\'s false lol');
*/

const getTodos = async() => {
  const responseA = await fetch('personA.json');
  if (responseA.status !== 200) {throw new Error('gotten error: ' + responseA.status)}
  const dataA = await responseA.json();
  const responseB = await fetch('personB.json');
  if (responseB.status !== 200) { throw new Error('gotten error: ' + responseB.status)}
  const dataB = await responseB.json();
  return [dataA, dataB];
}
getTodos()
  .then((dataA, dataB) => { console.log(dataA, dataB) })
  .catch(err => { console.log(err.message) });
