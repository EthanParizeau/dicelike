import './styles/charScreen.css';

class CharacterScreen {
    constructor(player) {
        this.player = player;
        this.element = null;
    }

    show() {
        this.element = document.createElement('div');
        this.element.id = "charScreen";
        this.element.innerText = "CHARACTER SCREEN";
        document.getElementsByClassName('app')[0].appendChild(this.element);
        console.log(this.player);
        
        //document.body.appendChild(element);
    }

    hide() {
        this.element.hidden = true;
    }
    
    test() {
        
    }
}

export default CharacterScreen;