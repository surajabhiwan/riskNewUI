import ProfileLeaderboardTable from "./ProfileLeaderboardTable";

const ProfitLeaderboard = () =>{
    return(
        <>
           {/* <h1>ProfileLeaderboard</h1> */}
           <div className="flex pb-2">
            <div className="bg-gradient-to-r from-yellow-200 to-yellow-400 px-4 py-[5px] rounded-lg mr-4">
              <span className="truncate">Profit Leaderboard</span>
            </div>
          </div>
           <ProfileLeaderboardTable />
        </>
    )
}

export default ProfitLeaderboard;