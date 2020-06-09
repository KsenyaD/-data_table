let arrayPersons = [];
const form = document.querySelector(".form-add-str");
const wrap = document.querySelector(".wrap");

function displayTable(array) { // отрисовка таблицы
    const tableArr = ['<table class="table">'];
    tableArr.push('<tr><th scope="col" class="th">ID</th> <th scope="col" colspan = "2" class="th">Name</th><th scope="col" class="th">Age</th> <th></th></tr>');
    tableArr.push('<tr><td></td> <td><button class="sort-button" onclick=sortArrayAscending("Surname")><img src="./svg/sort_ascending.png"></button> <button class="sort-button" onclick=sortArrayDownward("Surname")><img src="./svg/sort_descending.png"></button></td> ' +
        '<td><button class="sort-button" onclick=sortArrayAscending("Name")><img src="./svg/sort_ascending.png"></button><button class="sort-button" onclick=sortArrayDownward("Name")><img src="./svg/sort_descending.png"></button></td> ' +
        '<td><button class="sort-button" onclick=sortArrayAscending("Age")><img src="./svg/sort_ascending.png"></button><button class="sort-button" onclick=sortArrayDownward("Age")><img src="./svg/sort_descending.png"></button></td><td colspan = "2"><button class="add-button" onclick=showDialog() >Add</button></td></tr>');

    array.forEach((obj) => {
        tableArr.push(`<tr><td>${obj.ID}</td> <td>${obj.Surname}</td><td>${obj.Name}</td> <td>${obj.Age}</td> <td><button>edit</button></td><td><button id="${obj.ID}" onclick=deleteString(${obj.ID})>Delete</button></td></tr>`);
    });

    tableArr.push('</table>');
    wrap.innerHTML = tableArr.join('\n')
}

function checkForUniqueValue(input) {
    for (let i = 0; i < arrayPersons.length; i++) {
        let value = arrayPersons[i].ID;
        if (value === input.value) {
            input.value = " ";
            alert("ID не уникально");
            break
        }
    }
} //сразвнение введенного id на уникальность


function showDialog() {
    form.classList.add("form-add-str__active")
} // добавление строчки


function sortArrayAscending(value) {
    if (value === "Age") {
        arrayPersons.sort(function (a, b) {
            return a.Age - b.Age
        });
    }

    if (value === "Surname") {
        arrayPersons.sort(function (a, b) {
            let nameA = a.Surname.toLowerCase(), nameB = b.Surname.toLowerCase();
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1;
            if (nameA > nameB)
                return 1;
            return 0 // Никакой сортировки
        })
    }


    if (value === "Name") {
        arrayPersons.sort(function (a, b) {
            let nameA = a.Name.toLowerCase(), nameB = b.Name.toLowerCase();
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1;
            if (nameA > nameB)
                return 1;
            return 0 // Никакой сортировки
        })
    }

    displayTable(arrayPersons);
} // сортировка по возрастанию

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
} //сортировка по убыванию

function deleteString(id) {
    for (let i = 0; i < arrayPersons.length; i++) {
        let value = Number(arrayPersons[i].ID);
        if (value === id) {
            arrayPersons.splice(i, 1);
            break
        }
    }
    displayTable(arrayPersons);
} // удаление строчки

function removeNumbers(input) {
    if (input.value.indexOf(".") != '-1') {
        input.value = input.value.substring(0, input.value.indexOf(".") + 5);
    }
} //удаление символов после запятой

async function downloadData() { // получение и преобразование json

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

downloadData();