
const Placeholder = ({data}) => {
  
  return (
    <div className="xl:w-8 sm:w-7 w-6 xl:h-8 sm:h-7 h-6 ml-5 rounded-full bg-blue-700">
   <span>{data?.name?.split('')[0]}</span>
  </div>
  )
}

export default Placeholder;