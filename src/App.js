import React from 'react';
import './App.css';
import { Link, Redirect } from 'react-router-dom';
import {auth, firestore} from "./firebase.js";
import Game from "./Game.js"

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      loggedIn: false,
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true});
      }
    });
  }

  render(){
    if(this.state.loggedIn){
      return(
        <Redirect to="/play" />
      );
    }
    else{
      return(
        <div className="Home">
        <h1>SPACE INVADERS</h1>
        <h4><Link to='/login'>LOGIN</Link> or <Link to='/signup'>SIGN UP</Link> to play</h4>
      </div>
      );
    }
  }

}

class Login extends React.Component{
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      signedIn: false,
      errorMessage: "",
    }
  }

  formChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  submitFormHandler = async (event) => {
    event.preventDefault();
    if(this.state.email == "" || this.state.password == ""){
      this.setState({errorMessage: "Must enter email/password"});
      return;
    }
    try{
      const {user} = await auth.signInWithEmailAndPassword(this.state.email, this.state.password);
      this.setState({signedIn: true});
    }
    catch(error){
      let message = "";
      switch(error.code){
        case "auth/invalid-email":
          message="Invalid Email"
          break;
        case "auth/user-not-found":
          message="Email not registered"
          break;
        case "auth/wrong-password":
          message="Wrong password"
          break;
        default:
          break;
      }
      this.setState({errorMessage: message});
    }
  }
  
  render(){
    if(this.state.signedIn){
      return(<Redirect to="/play"/>)
    }
    return(
      <div class="Login">
        <h2>LOGIN</h2>
        <form onSubmit={this.submitFormHandler}>
          <input type="text" name="email" placeholder="Email" onChange={this.formChangeHandler}></input>
          <input type="password" name="password" placeholder="Password" onChange={this.formChangeHandler}></input>
          <p class="errorMessage">{this.state.errorMessage}</p>
          <div>
            <a onClick={this.submitFormHandler}>SUBMIT</a>
            <h6><Link to='/'>CANCEL</Link></h6>
          </div>
        </form>
      </div>
    );
  }
}

class SignUp extends React.Component{
  constructor(){
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      signedIn: false,
      errorMessage: "",
    }
  }

  formChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  submitFormHandler = async (event) => {
    event.preventDefault();
    if(this.state.email == "" || this.state.password == "" || this.state.username == ""){
      this.setState({errorMessage: "Must enter username/email/password"});
      return;
    }
    try{
      const {user} = await auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
      this.addUser(user);
      this.setState({signedIn: true});
    }
    catch(error){
      let message = "";
      switch(error.code){
        case "auth/email-already-in-use":
          message="Email already registered"
          break;
        case "auth/invalid-email":
          message="Invalid email"
          break;
        case "auth/weak-password":
          message="Password must be 6+ characters"
          break;
        default:
          break;
      }
      this.setState({errorMessage: message});
    }
  }

  addUser = async (user) => {
    try{
      firestore.collection("users").doc(user.uid).set({
        username: this.state.username,
        high_score: 0,
      });
    }
    catch(error){
    
    }
  }
  
  render(){
    if(this.state.signedIn){
      return(<Redirect to="/play"/>)
    }
    return(
      <div class="SignUp">
        <h2>CREATE AN ACCOUNT</h2>
        <form>
          <input type="text" name="username" placeholder="Username" onChange={this.formChangeHandler}></input>
          <input type="text" name="email" placeholder="Email" onChange={this.formChangeHandler}></input>
          <input type="password" name="password" placeholder="Password" onChange={this.formChangeHandler}></input>
          <p class="errorMessage">{this.state.errorMessage}</p>
          <div>
            <a onClick={this.submitFormHandler}>SUBMIT</a>
            <h6><Link to='/'>CANCEL</Link></h6>
          </div>
        </form>
      </div>
    );
  }
}

class Play extends React.Component{
  constructor(){
    super();
    this.state = {
      signOut: false,
    }
  }
  
  userSignOut = async () => {
    try{
      await auth.signOut();
      this.setState({signOut: true});
    }
    catch(error){

    }
  };
  
  render(){
    if(this.state.signOut){
      return(
        <Redirect to="/"/>
      );
    }
    return(
      <div className="Play">
        <Header signOut={this.userSignOut}/>
        <Game dimension={550}></Game>
      </div>
    );
  }
}

class LeaderBoard extends React.Component{
  constructor(){
    super();
    this.state = {
      signOut: false,
      leaderboard: [],
    }
    this.getTopScores(5);
  }
  
  userSignOut = async () => {
    try{
      await auth.signOut();
      this.setState({signOut: true});
    }
    catch(error){

    }
  };

  getTopScores = async (num) => {
    let leaderboard = this.state.leaderboard;
    try{
        let top_scores = await firestore.collection("users").orderBy("high_score", "desc").limit(num).get();
        top_scores.forEach((doc => {
          leaderboard.push(doc.data());
        }))
     }
     catch(error){
       
     }
     this.setState({leaderboard: leaderboard});
  }
  
  render(){
    if(this.state.signOut){
      return(
        <Redirect to="/"/>
      );
    }

    let item_divs = this.state.leaderboard.map((value, index) => {
      return(
          <LeaderBoardItem key={index} place={index+1} username={value.username} score={value.high_score}/>
      );
    })
    
    return(
      <div className="LeaderBoard">
        <Header signOut={this.userSignOut}/>
        <LeaderBoardItem key={-1} place={"place"} username={"username"} score={"score"}></LeaderBoardItem>
        {item_divs}
      </div>
    );
  }
}

const LeaderBoardItem = (props) => {
  return(
    <div className="LeaderBoardItem" key={props.key}>
      <p>{props.place}</p>
      <p>{props.username}</p>
      <p>{props.score}</p>
    </div>
  );
}

const Header = (props) => {
  return (
    <div className="Header">
        <Link to="/play">PLAY</Link>
        <Link to="/leaderboard">LEADERBOARD</Link>
        <a onClick={props.signOut}>SIGN OUT</a>
    </div>
  )
};


export {App, Login, SignUp, Play, LeaderBoard};
