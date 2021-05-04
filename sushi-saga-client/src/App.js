import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state={
    sushis: [],
    displayedSushi: [],
    displayIndStart: 0,
    displayIndEnd:4,
    moneyLeft: 100,
    emptyPlates:[]
  }

  componentDidMount(){
    fetch(API)
    .then(resp => resp.json())
    .then(sushiArr => {
      let sushis = sushiArr.map(sushiObj => ({...sushiObj, eaten: false}))
      let displayedSushi = sushis.slice(this.state.displayIndStart, this.state.displayIndEnd)
      this.setState({
        sushis: sushis,
        displayedSushi: displayedSushi
      })
    })
  }

  moreSushiButton = () => {
    if(this.state.displayIndEnd >= 100){
      this.setState({
        displayIndStart: 0,
        displayIndEnd: 4,
        displayedSushi: [...this.state.sushis.slice(0, 4)]
    
      })
    }else{
      this.setState({
        displayIndStart: this.state.displayIndStart + 4,
        displayIndEnd: this.state.displayIndEnd + 4,
        displayedSushi: [...this.state.sushis.slice( this.state.displayIndStart + 4, this.state.displayIndEnd + 4)]
      })
    }
  }

  eatSushi = (sushiObj) =>{
    if(this.state.moneyLeft <= 0) {
      return null
    }else{
      console.log(sushiObj.name)
      let index = this.state.sushis.findIndex(sushi => sushi.id === sushiObj.id)
      let copySushis = [...this.state.sushis]
      copySushis[index].eaten = true
      this.setState({
        sushis: [...copySushis],
        moneyLeft: this.state.moneyLeft - sushiObj.price,
        emptyPlates: [...this.state.emptyPlates, ""]
      })
    }
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushis={this.state.displayedSushi} moreSushiButton={this.moreSushiButton} eatSushi={this.eatSushi} />
        <Table moneyLeft={this.state.moneyLeft} emptyPlates={this.state.emptyPlates} />
      </div>
    );
  }
}

export default App;