import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {
          props.sushis.map((sushi, idx) => <Sushi key={idx} sushi={sushi} eatSushi={props.eatSushi} /> )
        }
        <MoreButton moreSushiButton={props.moreSushiButton} />
      </div>
    </Fragment>
  )
}

export default SushiContainer