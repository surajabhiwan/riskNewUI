import React, { useEffect } from 'react'
import { showToast } from '../../functions/showToast'

const BlockMiners = () => {
  useEffect(()=>{
    showToast()
  },[])
 
  return (
    <div className="w-full">
    <iframe src="https://block-miners.com/" height="900rem" width="100%" allow="geolocation" title="jpg store"></iframe>
</div>
  )
}

export default BlockMiners
