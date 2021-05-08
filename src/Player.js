import React from 'react';
import "./App.js"

const bullet_width = 4;
const bullet_height = 16;

class Player extends React.Component{
    constructor(props){
        super(props);
        this.movingLeft = 0;
        this.movingRight = 0;
        this.state = {
            x: props.x,
            y: props.y,
            bullets: [],
        }
    }
  
    componentDidMount() {
      this.keyEventListener = window.addEventListener("keydown", this.processKey);
      this.updateInterval = setInterval(() => {
        this.update();
      }, 50);
    }
  
    componentWillUnmount() {
      this.pauseGame();
    }

    pauseGame() {
        window.removeEventListener("keydown", this.processKey);
        clearInterval(this.updateInterval);
    }
  
    processKey = (event) => {
      switch(event.key){
        case "ArrowLeft":
          this.movingLeft = 10;
          this.movingRight = 0;
          break;
        case "ArrowRight":
          this.movingRight = 10;
          this.movingLeft = 0;
          break;
        case " ":
          this.shoot();
          break;
        default:
          break;
      }
    }
  
    update() {
        this.movePlayer();
        this.moveBullets();
    }

    movePlayer(){
        if(this.movingLeft){
            if(this.state.x > 5){
                this.setState({x: this.state.x-5});
            }
            else{
               this.setState({x: 0});
            }
            this.movingLeft -= 1;
        }
        else if(this.movingRight){
            if(this.state.x < this.props.game_dimension - this.props.dimension - 5){
                this.setState({x: this.state.x+5});
            }
            else{
                this.setState({x: this.props.game_dimension - this.props.dimension});
            }
            this.movingRight -= 1;
        }
        this.props.onUpdate(this.state.x, this.state.y);
    }

    moveBullets(){
        let new_bullets = this.state.bullets;
        for(let i = new_bullets.length - 1; i >= 0; i--){
            new_bullets[i].y -= 20;
            if(new_bullets[i].y < 0){
                new_bullets.splice(i, 1);
            }
        }
        this.setState({
            x: this.state.x,
            y: this.state.y,
            bullets: new_bullets,
        });
        this.props.onUpdateBullets(new_bullets);
    }
  
    shoot = () => {
        let new_bullets = this.state.bullets;
        new_bullets.push({x: this.state.x+this.props.dimension/2, y: this.props.y-bullet_height});
        this.setState({
            x: this.state.x,
            y: this.state.y,
            bullets: new_bullets,
        });
        this.props.onUpdateBullets(new_bullets);
    }
  
    render() {
      let bullets = this.state.bullets.map((value, index) => {
        return (
          <div key = {index}>
            <PlayerBullet x = {value.x} y = {value.y} />
          </div>
        );
      });
  
      return(
          <div>
            <Image img={`${process.env.PUBLIC_URL}/invader.png`} width={this.props.dimension+"px"} height={this.props.dimension+"px"} left={this.state.x} top={this.props.y} />
            {bullets}
          </div>
        );
      }
  }

  function PlayerBullet(props){
    return(
        <Image img={`${process.env.PUBLIC_URL}/bullet.png`} width={bullet_width+"px"} height={bullet_height+"px"} left={props.x} top={props.y}/>
      );
  }

  function Image(props) {
    return (
      <img alt="" src={props.img} width={props.width} height={props.height} style={{left: props.left, top: props.top}}></img>
    );
   }

  export default Player;