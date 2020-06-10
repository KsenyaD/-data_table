const form = document.querySelector(".form-add-str");
const wrap = document.querySelector(".wrap");
let arrayPersons = [];
let indexPersonNeedChange;

function displayTable(array) {
    const tableArr = ['<table class="table">'];
    tableArr.push('<tr><th scope="col" class="th">ID</th> <th scope="col" colspan = "2" class="th">Name</th><th scope="col" class="th">Age</th> <th></th></tr>');
    tableArr.push('<tr><td></td> <td><button class="sort-button" onclick=sortArrayAscending("Surname")><img src="./svg/sort_ascending.png"></button> <button class="sort-button" onclick=sortArrayDownward("Surname")><img src="./svg/sort_descending.png"></button></td> ' +
        '<td><button class="sort-button" onclick=sortArrayAscending("Name")><img src="./svg/sort_ascending.png"></button><button class="sort-button" onclick=sortArrayDownward("Name")><img src="./svg/sort_descending.png"></button></td> ' +
        '<td><button class="sort-button" onclick=sortArrayAscending("Age")><img src="./svg/sort_ascending.png"></button><button class="sort-button" onclick=sortArrayDownward("Age")><img src="./svg/sort_descending.png"></button></td><td colspan = "2"><button class="add-button" onclick=showDialog() >Add</button></td></tr>');

    array.forEach((obj, index) => {
        tableArr.push(`<tr><td>${obj.ID}</td> <td>${obj.Surname}</td><td>${obj.Name}</td> <td>${obj.Age}</td> <td><button class="add-button" onclick=showDialog(${index})>Edit</button></td><td><button id="${obj.ID}" class="add-button" onclick=removeUser(${obj.ID})>Delete</button></td></tr>`);
    });

    tableArr.push('</table>');
    wrap.innerHTML = tableArr.join('\n')
}

function addInArray(form) {
    const id = form.id.value;
    const age = form.age.value;
    let username = form.username.value.split(" ");

    username = username.filter((element) => {
        return element.length > 0
    });

    if (username.length !== 2) {
        alert("Имя и фамилия введено не корректно");
        return false
    }

    const obj = {
        "ID": id,
        "Surname": username[0],
        "Name": username[1],
        "Age": age
    };

    if (indexPersonNeedChange !== undefined) {
        changeUser(obj, id);
    } else {
        addUser(obj, id);
    }
    return false
}

function changeUser(obj, id) {
    for (let i = 0; i < arrayPersons.length; i++) {
        const value = arrayPersons[i].ID;

        if (value === id && value !== arrayPersons[indexPersonNeedChange].ID) {
            alert("Пользователь с таким ID уже существует");
            return
        }
    }
    arrayPersons[indexPersonNeedChange] = obj;
    displayTable(arrayPersons);
    form.classList.remove("form-add-str__active");
}

function addUser(obj, id) {
    for (let i = 0; i < arrayPersons.length; i++) {
        const value = arrayPersons[i].ID;
        if (value === id) {
            alert("ID не уникально");
            return
        }
    }
    arrayPersons.unshift(obj);
    displayTable(arrayPersons);
    form.classList.remove("form-add-str__active");
}

function removeUser(id) {
    for (let i = 0; i < arrayPersons.length; i++) {
        const value = Number(arrayPersons[i].ID);
        if (value === id) {
            arrayPersons.splice(i, 1);
            break
        }
    }
    displayTable(arrayPersons);
}

function showDialog(index) {
    indexPersonNeedChange = index;
    form.classList.add("form-add-str__active");

    if (indexPersonNeedChange !== undefined) {
        const obj = arrayPersons[indexPersonNeedChange];
        form.id.value = obj.ID;
        form.username.value = obj.Surname + " " + obj.Name;
        form.age.value = obj.Age;

    } else {
        form.id.value = "";
        form.username.value = "";
        form.age.value = "";
    }
}

function sortArrayAscending(value) {
    if (value === "Age") {
        arrayPersons.sort(function (a, b) {
            return a.Age - b.Age
        });
    }

    if (value === "Surname") {
        arrayPersons.sort(function (a, b) {
            let nameA = a.Surname.toLowerCase(), nameB = b.Surname.toLowerCase();
            if (nameA < nameB)
                return -1;
            if (nameA > nameB)
                return 1;
            return 0
        })
    }


    if (value === "Name") {
        arrayPersons.sort(function (a, b) {
            let nameA = a.Name.toLowerCase(), nameB = b.Name.toLowerCase();
            if (nameA < nameB)
                return -1;
            if (nameA > nameB)
                return 1;
            return 0
        })
    }

    displayTable(arrayPersons);
}

function sortArrayDownward(value) {
    if (value === "Age") {
        arrayPersons.sort(function (a, b) {
            return b.Age - a.Age
        });
    }

    if (value === "Surname") {
        arrayPersons.sort(function (a, b) {
            let nameA = a.Surname.toLowerCase(), nameB = b.Surname.toLowerCase();
            if (nameA > nameB) //сортируем строки по возрастанию
                return -1;
            if (nameA < nameB)
                return 1;
            return 0
        })
    }

    if (value === "Name") {
        arrayPersons.sort(function (a, b) {
            let nameA = a.Name.toLowerCase(), nameB = b.Name.toLowerCase();
            if (nameA > nameB) //сортируем строки по возрастанию
                return -1;
            if (nameA < nameB)
                return 1;
            return 0
        })
    }

    displayTable(arrayPersons);
}

function removeNumbers(input) {
    if (input.value.indexOf(".") != '-1') {
        input.value = input.value.substring(0, input.value.indexOf(".") + 5);
    }
}

async function downloadJsonFile() {

    arrayPersons = await fetch("../big_data_persons.json")
        .then(res => res.json())
        .catch(err => console.error(err));

    arrayPersons = arrayPersons.map((value) => {
        let arrayName = value.Name.split(" ");
        return {
            "ID": value.ID,
            "Surname": arrayName[0],
            "Name": arrayName[1].replace("﻿А", "А"),
            "Age": value.Age
        }
    });
    displayTable(arrayPersons);
}

downloadJsonFile();