function loadStudentPoints() {
    
    const points = sessionStorage.getItem('points');
    const coins = sessionStorage.getItem('coins');

    document.getElementById('points').innerHTML = points;
    document.getElementById('coins').innerHTML = coins;   
}