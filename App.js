import React from 'react';
import { StyleSheet, Text, View ,Button, TouchableHighlightComponent} from 'react-native';
import Constants from 'expo-constants'
import {vibrate} from './utils';

const worktime = 1500;
const breaktime = 300;

export default class App extends React.Component {
  constructor()
  {
    super()
    this.state = {
      work:true,
      isrunning:false,
      time:worktime,
  }
}
  componentWillUpdate(nextProps,nextState){
    if(nextState.time <0)
    {
      console.log("fine")
      this.setState(prevState => ({
        time:(prevState.work === true) ? breaktime:worktime,
        work:!prevState.work
      }))
    }
  }
  componentDidMount(){
    this.toggleonoff(this.state.isrunning)
  }

  componentWillUnmount(){
    this.toggleonoff(false)
  }

  continue = () =>{
    if(this.state.time === 1)
    {
      vibrate()
    }
    console.log(this.state.time)
    this.setState(prevState =>({
      time:prevState.time-1
    }))
  }
  display = (worktime) => {
    let sec = worktime%60;
    let min = Math.trunc(worktime/60);
    if(min<10)
    {
      min = "0" + min
    }
    if(sec<10)
    {
      sec = "0" + sec
    }
    return (min + ":" + sec);
  }
  toggleonoff(param)
  {
    if(param === true)
    {
      this.counting = setInterval(this.continue,1000)
    }
    else
    {
      clearInterval(this.counting)
    }
  }
  onoff = ()=>{
    this.setState(prevState=>({
      isrunning:!prevState.isrunning
    }))

    this.toggleonoff(!this.state.isrunning)
  }

  reset = () =>{
    this.toggleonoff(false)
    this.setState({
      isrunning:false,
      time:worktime,
      work:true
    })
  }

  render() {
    return (
      <View style={styles.titlecontainer}>
        <Text style = {{fontSize:38}}>Pomodoro Timer</Text>
        <View style = {styles.appcontainer}>
            <Text style = {{fontSize:40}}>{this.display(this.state.time)}</Text>
            <View style = {styles.buttoncontainer}>
              <View style = {styles.button}>
                <Button style = {styles.buttoninside} title = {this.state.isrunning? 'stop':'start'} onPress = {this.onoff} />
              </View>
              <View style = {styles.button}>
                 <Button style = {styles.buttoninside} title = 'reset' onPress = {this.reset} />
              </View>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titlecontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop:Constants.statusBarHeight,
  },
  appcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttoncontainer:{
    flexDirection:'row',
    marginTop:20,
    justifyContent:'space-between'
  },
  button:{
    padding:15,
  },
  buttoninside:{
    padding:15
  }
});
