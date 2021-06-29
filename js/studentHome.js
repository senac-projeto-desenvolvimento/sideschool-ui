async function getHomework() {
    let studentId = sessionStorage.getItem('studentId')

    let requestOptions = {
        method: 'GET',
        headers: new Headers({ "studentId": studentId }),
        cache: 'default'
    };

    const response = await fetch('https://sideschool-app.herokuapp.com/api/sideschool/homework/home', requestOptions)

    return await response.json();
}

async function getStudentPoints() {
    let studentId = sessionStorage.getItem('studentId')

    let requestOptions = {
        method: 'GET',
        headers: new Headers({ "studentId": studentId }),
        cache: 'default'
    };

    const response = await fetch('https://sideschool-app.herokuapp.com/api/sideschool/student/status', requestOptions);
    
    return await response.json();
}

async function loadStudentHome() {
    const response = await getHomework();
    const responsePoints = await getStudentPoints();

    if(response != null && responsePoints != null) {
        document.getElementById('loading-spinner').className = 'hide-loading';
        saveSessionPoints(responsePoints);
        loadStudentPoints(responsePoints);
    }
    response.forEach(element => {
        const homeworkList = document.getElementById('homework-list');
        let homeworkListItem = document.createElement('li');
        let homeworkListItemLink = document.createElement('a');

        homeworkListItemLink.href = `atividade_detalhe.html?homeworkId=${element.homeworkId}`;
        homeworkListItemLink.innerHTML = element.description;
        homeworkListItem.appendChild(homeworkListItemLink);
        homeworkList.appendChild(homeworkListItem);
    });
}

async function loadStudentPoints(responsePoints) {
    const response = await responsePoints;

    if(response.status == 500) {
        document.getElementById('points').innerHTML = 0;
        document.getElementById('coins').innerHTML = 0;  
    } else { 
        document.getElementById('points').innerHTML = response.points;

        if(response.balance == 0) {
            document.getElementById('coins').innerHTML = response.coins;  
        }
        else {
            document.getElementById('coins').innerHTML = response.balance;  
        }
    }
}

async function saveSessionPoints(responsePoints) {
    const response = await responsePoints;
    console.log(response);

    if(response.status == 500) {
        sessionStorage.setItem('points', 0);
        sessionStorage.setItem('coins', 0);
    } else {
        sessionStorage.setItem('points', response.points);
        if(response.balance == 0) {
            sessionStorage.setItem('coins', response.coins);
        }
        else {
            sessionStorage.setItem('coins', response.balance);
        }
    }
}
