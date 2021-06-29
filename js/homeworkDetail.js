async function getHomeworkDetail() {
    let homeworkId = window.location.search.split('?homeworkId=')[1];

    let requestOptions = {
        method: 'GET',
        cache: 'default'
    };

    const response = await fetch(`https://sideschool-app.herokuapp.com/api/sideschool/homework/${homeworkId}`, requestOptions);

    return await response.json();
}

async function loadHomework() {

    const homeworkResponse = await getHomeworkDetail();

    if(homeworkResponse != null) {
        document.getElementById('loading-spinner').className = 'hide-loading';
    }

    homeworkResponse.questions.forEach(question => {
    
        const questionList = document.getElementById('question-list');
        let questionListItem = document.createElement('li');
        let questionListItemLink = document.createElement('a');

        questionListItem.classList.add('question-list-item');
        questionListItem.setAttribute('id', question.questionId);
        questionListItemLink.innerHTML = question.description;

        questionListItem.appendChild(questionListItemLink);
        questionList.appendChild(questionListItem);

        question.alternativeEntity.forEach(alternative => {

            let alternativeDiv = document.createElement('div');
            let alternativeInput = document.createElement('input');
            let alternativeLabel = document.createElement('label');
    
            alternativeDiv.classList.add('answer');

            alternativeInput.classList.add('form-check-input');
            alternativeInput.setAttribute('type', 'radio');
            alternativeInput.setAttribute('name', `answer-radio${question.questionId}`);
            alternativeInput.setAttribute('id', `answer-radio${alternative.alternativeId}`);
            alternativeInput.setAttribute('value', alternative.alternativeId);

            alternativeLabel.setAttribute('for', `answer-radio${alternative.alternativeId}`);
            alternativeLabel.setAttribute('id', `answer-label-${alternative.alternativeId}`);
            alternativeLabel.innerHTML = alternative.answer;

            alternativeDiv.appendChild(alternativeInput);
            alternativeDiv.appendChild(alternativeLabel);

            questionListItem.appendChild(alternativeDiv);
        });
    });
}

function changeInput() {
    var radio = document.querySelectorAll('input[type=radio]');

    radio.forEach(element => {
        if(element.checked) {
            element.parentElement.classList.add('selected-option');
            console.log(element.value)
        }
        else {
            element.parentElement.classList.remove('selected-option');
        }
    });
}

async function submitHomework() {

    event.preventDefault();

    document.getElementById('loading-spinner').className = 'show-loading';

    const homeworkId = window.location.search.split('?homeworkId=')[1];
    const studentId = sessionStorage.getItem('studentId');

    let bodyRequest = {
        studentId: Number(studentId),
        alternativesId: [].map.call(document.querySelectorAll('input[type=radio]:checked'), (e) => Number(e.value))
    }

    let myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json, */*'
    });

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(bodyRequest),
        headers: myHeaders
    };

    const response = await fetch(`https://sideschool-app.herokuapp.com/api/sideschool/homework/${homeworkId}/submit`, requestOptions);

    if (response != null) {
        document.getElementById('loading-spinner').className = 'hide-loading';

        if(response.ok) {
            window.location = `atividade_resultado.html?homeworkId=${homeworkId}`; return false;
        }
        else {
            alert('Ocorreu um erro :( Tente novamente mais tarde!');
        }
    }
}

function updatePoints() {
    // Adicionar pontos no sessionStorage
    // sessionStorage.setItem('points', '');
    // sessionStorage.setItem('coins', '')
}

