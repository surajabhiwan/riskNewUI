import React, { useEffect } from 'react'
import { showToast } from '../../functions/showToast'

const NeoViking = () => {

  useEffect(()=>{
    showToast()
  },[])
 
  return (
    <div className="w-full">
    <iframe src="https://compass.staking.zip/" height="900rem" width="100%" allow="geolocation" title="jpg store"></iframe>
</div>
  )
}

export default NeoViking
