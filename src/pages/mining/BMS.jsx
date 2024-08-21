import React, { useEffect } from 'react'
import { showToast } from '../../functions/showToast'

const BMS = () => {
  useEffect(()=>{
    showToast()
  },[])
 
  return (
    <div className="w-full">
    <iframe src="https://beartoothmountainsaloon.com/" height="900rem" width="100%" allow="geolocation" title="jpg store"></iframe>
</div>
  )
}

export default BMS
