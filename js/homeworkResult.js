async function getResults() {
    const homeworkId = window.location.search.split('?homeworkId=')[1];
    let studentId = sessionStorage.getItem('studentId')

    let requestOptions = {
        method: 'GET',
        headers: new Headers({ "studentId": studentId }),
        cache: 'default'
    };

    const response = await fetch(`https://sideschool-app.herokuapp.com/api/sideschool/homework/${homeworkId}/result`, requestOptions);

    return await response.json();
}

async function loadResult() {

    const resultResponse = await getResults();

    if(resultResponse != null) {
        document.getElementById('loading-spinner').className = 'hide-loading';
    }

    let mainContent = document.getElementById('main-content');
    let cardImg = document.createElement('img');
    let cardBody = document.createElement('div');
    let resultList = document.createElement('ul');
    let resultListItemRight = document.createElement('li');
    let resultListItemRightParagraph = document.createElement('p');
    let resultListItemWrong = document.createElement('li');
    let resultListItemWrongParagraph = document.createElement('p');

    cardImg.classList.add('card-img-top');
    cardImg.setAttribute('src', '');
    cardImg.setAttribute('alt', '');

    cardBody.classList.add('card-body');
    resultList.classList.add('d-flex');

    resultListItemRightParagraph.classList.add('card-text');
    resultListItemWrongParagraph.classList.add('card-text');

    resultListItemRightParagraph.innerHTML = `Acertos: ${resultResponse.rightAnswers}`
    resultListItemWrongParagraph.innerHTML = `Erros: ${resultResponse.wrongAnswers}`

    resultListItemRight.appendChild(resultListItemRightParagraph);
    resultListItemWrong.appendChild(resultListItemWrongParagraph);
    resultList.appendChild(resultListItemRight);
    resultList.appendChild(resultListItemWrong);

    
    cardBody.appendChild(resultList);
    
    mainContent.appendChild(cardImg);
    mainContent.appendChild(cardBody);

}

