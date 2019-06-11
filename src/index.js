document.addEventListener('DOMContentLoaded', init)

const dogUrl = "http://localhost:3000/dogs"
const table = document.querySelector("#table-body")
const form = document.querySelector("#dog-form")
let currentDog

function fetchDogs () {
    return fetch(dogUrl) 
        .then(response => response.json())
        .then(dogsArray => renderDogs(dogsArray));
}

function renderDogs(dogsArray) {
    table.innerHTML = ""
    dogsArray.forEach(dog => {
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")

        let submitButton = document.createElement("button")

        submitButton.addEventListener('click', function(event) {
            event.preventDefault;
            //I want to populate the form here so I add the inputs to the values
            form.name.value = dog.name;
            form.breed.value = dog.breed; 
            form.sex.value = dog.sex;
            currentDog = dog;
        })
       
        td1.innerText = dog.name 
        td2.innerText = dog.breed 
        td3.innerText = dog.sex
        td4.innerText = "Edit"

        table.append(tr)
        tr.append(td1, td2, td3, td4)
        td4.append(submitButton)

    })
}

form.addEventListener("submit", patchDog);

function patchDog(event) {
    event.preventDefault();
    const dogData = {
        name: form.name.value,
        breed: form.breed.value,
        sex: form.sex.value,
        id: currentDog.id
    };

    fetch(dogUrl + `/${dogData.id}`, {
        method: "PATCH", 
        body: JSON.stringify(dogData), 
        headers: {
            "Content-Type": "application/json"
        }
    }).then(() => fetchDogs())
}

function init() {
    fetchDogs();
};

init();