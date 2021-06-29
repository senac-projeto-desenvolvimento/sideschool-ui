async function getRanking() {

    let requestOptions = {
        method: 'GET',
        cache: 'default'
    };

    const response = await fetch(`https://sideschool-app.herokuapp.com/api/sideschool/student/ranking`, requestOptions);

    return await response.json();
}

async function loadRanking() {
    const response = await getRanking();

    if(response != null) {
        document.getElementById('loading-spinner').className = 'hide-loading';
    }

    let rankingList = document.getElementById('ranking');
    
    response.forEach(element => {
        let listItem = document.createElement('li');
        let listItemStudent = document.createElement('div');
        let listItemStudentPosition = document.createElement('a');
        let listItemStudentName = document.createElement('a');

        let listItemPoints = document.createElement('div');
        let listItemPointsImage = document.createElement('img');
        let listItemPointsNumber = document.createElement('a');

        listItem.classList.add('ranking-list-item');
        listItemStudent.classList.add('ranking-list-item-student');
        listItemStudentPosition.setAttribute('id', `position-${element.rankingPosition}`);
        listItemStudentPosition.innerHTML = element.rankingPosition;
        listItemStudentName.innerHTML = element.studentName;
        listItemStudentName.setAttribute('id', `student-${element.rankingPosition}`);

        listItemStudent.appendChild(listItemStudentPosition);
        listItemStudent.appendChild(listItemStudentName);

        listItem.appendChild(listItemStudent);

        listItemPoints.classList.add('ranking-list-item-points');
        listItemPointsNumber.innerHTML = element.points;

        listItemPoints.appendChild(listItemPointsImage);
        listItemPoints.appendChild(listItemPointsNumber);

        listItem.appendChild(listItemPoints);

        rankingList.appendChild(listItem);
    });
}