import React from 'react';
import "./App.js"

const alien_size = 35;
const bullet_width = 2;
const bullet_height = 15;
const alien_start_x = 10;
const alien_start_y = 10;

class AlienCrowd extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        aliens: this.props.aliens,
        bullets: this.props.bullets,
      }
    }
  
    componentDidMount() {
      this.updateInterval = setInterval(() => {
        this.update();
      }, 100);
  
      this.newBulletInterval = setInterval(() => {
        this.setState({
          bullets: this.newBullet(),
        });
      }, 1000);
    }
  
    componentWillUnmount() {
      this.pauseGame();
    }
  
    pauseGame() {
        clearInterval(this.updateInterval);
      clearInterval(this.newBulletInterval);
    }

    update(){
      let [new_x, new_y, new_movingRight] = this.moveAliens();

      this.setState({
        bullets: this.updateBullets(),
      });

      this.props.onUpdate(new_x, new_y, this.props.aliens, new_movingRight);
    }

    moveAliens(){
        let new_x = this.props.x;
        let new_y = this.props.y;
        let new_movingRight = this.props.movingRight;
        
        if(new_movingRight){
            new_x += 5;
            if(new_x == this.props.dimension-alien_start_x-alien_size*this.props.cols){
                new_y += 10;
                new_movingRight = false;
            }
          }
          else{
            new_x -= 5;
            if(new_x == 10){
              new_y += 10;
              new_movingRight = true;
            }
          }
        return [new_x, new_y, new_movingRight];
    }
  
    updateBullets(){
        let new_bullets = this.state.bullets;
      for(let i = new_bullets.length-1; i >= 0; i--){
        new_bullets[i].y += 15;
        if(new_bullets[i].y >= this.props.dimension){
            new_bullets.splice(i, 1);
        }
      }
      this.props.onUpdateBullets(new_bullets);
      return new_bullets;
    }
  
    newBullet(){
      let bullets = this.state.bullets;
      let bottomAliens = this.getBottomAliens();
  
      let shootingAlien = Math.floor(Math.random() * bottomAliens.length);    
      bullets.push({x: this.props.x + bottomAliens[shootingAlien].col*alien_size + alien_size/2, y: this.props.y + bottomAliens[shootingAlien].row*alien_size + alien_size});
  
      this.props.onUpdateBullets(bullets);

      return bullets;
    }
  
    getBottomAliens(){
      let bottomAliens = [];
      for(let i = 0; i < this.props.cols; i++){
        let j = this.props.rows-1;
        while(j >= 0 && !this.props.aliens[j][i]){
          j -= 1;
        }
        if(j == -1){
          continue;
        }
        else{
          bottomAliens.push({row: j, col: i});
        }
      }
      return bottomAliens;
    }
  
    render(){
      let alien_pos = []
      for(let i = 0; i < this.props.aliens.length; i++){
          for(let j = 0; j < this.props.aliens[0].length; j++){
            if(this.props.aliens[i][j]){
                alien_pos.push({x: this.props.x + j*alien_size, y: this.props.y + i*alien_size});
            }
          }
      }

      let alien_divs = alien_pos.map((value, index) => {
        return (
          <div key = {index}>
            <Alien x = {value.x} y = {value.y}/>
          </div>
        );
      });

      let bullet_divs = this.state.bullets.map((value, index) => {
        return (
          <div key = {index}>
            <AlienBullet x = {value.x} y = {value.y} />
          </div>
        );
      });
  
      return(
        <div>
          {alien_divs}
          {bullet_divs}
        </div>
      );
    }
  }

  class Alien extends React.Component {
    constructor(props){
      super(props);
    }
    render(){
        return(
        <Image img={`${process.env.PUBLIC_URL}/alien.png`} width={alien_size+"px"} height={alien_size+"px"} left={this.props.x} top={this.props.y}/>
      );
    }
  }
  
  class AlienBullet extends React.Component{
    constructor(props){
      super(props);
    }
  
    render() {
      return(
        <Image img={`${process.env.PUBLIC_URL}/bullet2.png`} width={bullet_width+"px"} height={bullet_height+"px"} left={this.props.x} top={this.props.y}/>
      )
    }
  }

  function Image(props) {
    return (
      <img src={props.img} width={props.width} height={props.height} style={{left: props.left, top: props.top}}></img>
    );
}

export default AlienCrowd;