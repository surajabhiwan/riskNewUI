const ChartProgress = ({data, color}) => {

  return (
    <>
      <div className="flex justify-start rounded-[50px] w-full mt-1 bg-[#4d5359]">
        <div className={`h-1 rounded-[50px] ${color?.action === "buy" ? "bg-green-400": "bg-red-500"} `} style={{width: `${data ? data : 0}%`}}></div>
      </div>
    </>
  )
}
export default ChartProgress;