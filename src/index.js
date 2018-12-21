import './styles/index.css';
import game from './game';
import reportBug from './bugReport';

// Setup bug reporting
document.getElementById('reportBtn').onclick = () => {
    let bugText = prompt("Enter bug:");
    let xhr = new XMLHttpRequest();
    xhr.open("POST", 'bugReport/' + bugText, true);
    xhr.send();
    
}

game.init();



