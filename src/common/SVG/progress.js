const Progress = ({data}) => {
  // const { menu } = props;
  // const {percent} = props;

  // console.log('progressbar', data)
  return (
    <>
      <div className="flex justify-end rounded-[50px] w-[80px] mt-1 bg-[rgb(18,18,24)]">
        <div className={`h-1 rounded-[50px] bg-green-500`} style={{width: `${data}%`}}></div>
      </div>
    </>
  )
}
export default Progress;