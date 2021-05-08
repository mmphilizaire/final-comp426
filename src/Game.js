import React from 'react';
import './App.css';
import Player from "./Player.js";
import AlienCrowd from "./AlienCrowd.js";
import {auth, firestore} from "./firebase.js";
import { Link } from 'react-router-dom';
import axios from 'axios';

const game_dimension = 550;
const player_dimension = game_dimension * 0.075;
const player_bullet_width = 4;
const player_bullet_height = 16;
const alien_bullet_width = 2;
const alien_bullet_height = 15;
const alien_rows = 5;
const alien_cols = 11;
const alien_size = 35;
const alien_start_x = 10;
const alien_start_y = 10;

class Game extends React.Component {
  constructor(){
    super();
    this.player_x = null;
    this.player_y = null;
    this.state = {
      alien_x: alien_start_x,
      alien_y: alien_start_y,
      movingRight: true,
      alien_bullets: [],
      player_bullets: [],
      player_lives: 3,
      aliens: this.createAlienCrowd(),
      score: 0,
      gameOver: false,
      gameStart: false,
    }
  }
  
  updatePlayer(x, y){
    this.player_x = x;
    this.player_y = y;
  }

  updateAliens(x, y, aliens, movingRight){
    this.setState({
      aliens: aliens,
      alien_x: x,
      alien_y: y,
      movingRight: movingRight,
    });
    if(this.hitPlayer()){
      this.setState({gameOver: true});
    }
  }

  updateAlienBullets(bullets){
      this.setState({
        alien_bullets: bullets,
      })
      this.checkForCollision();
  }

  updatePlayerBullets(bullets){
    this.setState({
      player_bullets: bullets,
    })
    this.checkForShot();
  }

  hitPlayer(){
    if(this.collision(this.player_x, this.player_y, player_dimension, player_dimension, this.state.alien_x, this.state.alien_y, alien_cols*alien_size, alien_rows*alien_size)){
      for(let r = this.state.aliens.length-1; r >= 0; r--){
        for(let c = 0; c < this.state.aliens[0].length; c++){
          if(this.state.aliens[r][c] && this.collision(this.player_x, this.player_y, player_dimension, player_dimension, this.state.alien_x+c*alien_size, this.state.alien_y+r*alien_size, alien_size, alien_size)){
            return true;
          }
        }
      }
    }
    return false;
  }

  checkForCollision(){
    let bullets = this.state.alien_bullets;
    let lives = this.state.player_lives;
    let gameOver = this.state.gameOver
    for(let i = bullets.length-1; i >= 0; i--){
      let bullet = bullets[i];
      if(this.collision(bullet.x, bullet.y, alien_bullet_width, alien_bullet_height, this.player_x, this.player_y, player_dimension, player_dimension)){
        bullets.splice(i, 1);
        lives -= 1;
        if(lives == 0){
          gameOver = true;
          this.updateFirebase(this.state.score);
        }
      }
    }
    this.setState({
      alien_bullets: bullets,
      player_lives: lives,
      gameOver: gameOver,
    });
  }

  async updateFirebase(new_score){
      let user = auth.currentUser;
      try{
        let doc_user = await firestore.collection("users").doc(user.uid).get();
        if(new_score > doc_user.data().high_score){
          try{
            await firestore.collection("users").doc(user.uid).set({
              high_score: new_score,
              username: doc_user.data().username,
            })
          }
          catch(error){

          }
        }
      }
      catch(error){

      }
  }

  checkForShot(){
    let bullets = this.state.player_bullets;
    let new_aliens = this.state.aliens;
    let new_score = this.state.score;
    for(let i = bullets.length-1; i >= 0; i--){
      let bullet = bullets[i];
      if(this.collision(bullet.x, bullet.y, player_bullet_width, player_bullet_height, this.state.alien_x, this.state.alien_y, alien_cols*alien_size, alien_rows*alien_size)){
        let collision_detected = false;
        for(let r = new_aliens.length-1; r >= 0; r--){
          for(let c = 0; c < new_aliens[0].length; c++){
            if(!collision_detected && new_aliens[r][c] && this.collision(bullet.x, bullet.y, player_bullet_width, player_bullet_height, this.state.alien_x+c*alien_size, this.state.alien_y+r*alien_size, alien_size, alien_size)){
              collision_detected = true;
              bullets.splice(i, 1);
              new_aliens[r][c] = 0;
              new_score += 10;
              break;
            }
          }
          if(collision_detected){
            break;
          }
        }
      }
    }
    if(this.allEmpty(new_aliens)){
      new_aliens = this.createAlienCrowd();
      this.setState({
        alien_x: alien_start_x,
        alien_y: alien_start_y,
        aliens: new_aliens,
        score: new_score,
        alien_bullets: bullets,
        movingRight: true,
      })
    }
    else{
      this.setState({
        aliens: new_aliens,
        score: new_score,
        alien_bullets: bullets,
      });
    }
  }

  allEmpty(aliens){
    for(let i = 0; i < aliens.length; i++){
      for(let j = 0; j < aliens[0].length; j++){
        if(aliens[i][j]){
          return false;
        }
      }
    }
    return true;
  }

  createAlienCrowd(){
    let aliens = [];
    for(let i = 0; i < alien_rows; i++){
        let alien_row = [];
        for(let j = 0; j < alien_cols; j++){
            alien_row.push(1);
        }
        aliens.push(alien_row);
    }
    return aliens;
}

  startGame = () => {
    this.setState({gameStart: true})
  }

  collision(object1_x, object1_y, object1_width, object1_height, object2_x, object2_y, object2_width, object2_height) {
    if(object1_x < object2_x + object2_width &&
      object1_x + object1_width > object2_x &&
      object1_y < object2_y + object2_height &&
      object1_y + object1_height > object2_y) {
       return true;
   }
   return false;
  }
  
  render(){
    if(this.state.gameOver){
      return (
        <div className="Game">
          <GameOver score={this.state.score}/>
        </div>
      )
    }
    else if(!this.state.gameStart){
      return(
        <div className="Game">
          <p onClick={this.startGame} className="StartGame">CLICK TO START</p>
        </div>
      )
    }
    return (
      <div className="Game">
        <Player onUpdate={(x, y) => {this.updatePlayer(x,y)}} onUpdateBullets={(bullets => {this.updatePlayerBullets(bullets)})} x={this.props.dimension/2 - player_dimension/2} y={this.props.dimension*0.85} dimension={player_dimension} game_dimension={this.props.dimension}/>
        <AlienCrowd onUpdate={(x,y, aliens, movingRight) => {this.updateAliens(x, y, aliens, movingRight)}} onUpdateBullets={(bullets) => {this.updateAlienBullets(bullets)}} x={this.state.alien_x} y={this.state.alien_y} rows={alien_rows} cols={alien_cols} dimension={this.props.dimension} bullets={this.state.alien_bullets} aliens={this.state.aliens} movingRight={this.state.movingRight}/>
        <div className="Lives">
          <p>LIVES: {this.state.player_lives}</p>
        </div>
        <div className="Score">
          <p>SCORE: {this.state.score}</p>
        </div>
      </div>
    )
  }
}

class GameOver extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      joke: "",
    }
    this.getJoke();
  }

  handleTweet = async () => {
    const result = await axios({
      method: 'post',
      url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
      withCredentials: true,
      data: {
        body: `Just scored ${this.props.score} points in Space Invaders!`,
      },
  });
  }

  reloadGame = () => {
    window.location.reload(false);
  }

  getJoke = async () => {
    const result = await axios({
      method: "get",
      url: "https://icanhazdadjoke.com/",
      headers: {
        Accept: "text/plain",
      }
    });
    this.setState({
      joke: result.data,
    })
  }
  
  render(){
    return(
      <div className="GameOver">
        <h3>GAME OVER</h3>
        <p>Score: {this.props.score}</p>
        <a onClick={this.reloadGame}>PLAY AGAIN</a>
        <a onClick={this.handleTweet}>TWEET</a>
        <p>Here's a joke to cheer you up! <br></br> {this.state.joke}</p>
      </div>
    );
  }
}

export default Game;
