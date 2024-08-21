import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { timestampToUTC } from "../../../../../functions/functions";
import * as IMG from "../../../../../common/IMG/Images";
import { getImage } from "../../../../../baseurl/baseurl";
import moment from "moment";

const tableCustomStyles = {
    table: {
      style: {
        borderRadius : '18px 18px 0 0',
        backgroundColor: '#142028',
        // padding: '.9rem',
        overflowY: 'scroll',
        textOverflow: "hidden",
        height: '100%',
        //  displayWrap : 'wrap',
         width:'100%',
        borderBottom: '1px solid #56577A !important ',
        whiteSpace: "nowrap", 
        //overflowX: 'hidden',       
      }, 
    },
   
  
    tableWrapper: {
          style: {
        display: 'table',
        backgroundColor: '#142028',
        borderRadius : '18px 18px 0 0', 
        padding: '.8rem',
        height: '79vh',
          },
      },
    
  
    headRow: {
      style: {
        borderBottom: '1px solid #56577A !important ',
        borderRadius : '18px 18px 0 0', 
      },
    },
      headCells: {
        style: {
          backgroundColor: '#142028' ,
          fontSize: '1rem',
          color: '#A0AEC0',
          fontWeight: 'bold',
          paddingLeft: '0 8px',
          // justifyContent: 'center',
          textOverflow: 'hidden'
          
        },
      },
  
      cells: {
          style: {
               fontSize:'0.875rem',
              //  justifyContent: 'center',
               fontWeight: 'bold',
               borderWidth: "80% !important"  ,
              //  textOverflow: "ellipsis", 
          },
      },
  
      rows: {
        style :{
          backgroundColor: '#142028' ,
          color : 'white',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'evenly',
          borderRadius : '18px 18px 0 0',
        //   borderBottom: '1px solid #56577A !important ',
          displayWrap: 'wrap',
        },
      },
      noData: {
        style :{
          color: "white",
          backgroundColor: 'transparent',
          fontSize: '1.4rem'
        },
      },
  
      pagination: {
        style :{
          color : "#A0AEC0",
          backgroundColor : '#142028',
          borderRadius : '0 0 18px 18px',
          fontWeight: "700",
          borderTop: '0px '
        },
        pageButtonsStyle: {
          borderRadius: '40%',
          height: '40px',
          width: '40px',
          cursor: 'pointer',
          transition: '0.4s',
          color: 'white !important',
          fill: '#A0AEC0',
  
          '&:disabled': {
            cursor: 'unset',
            fill: '#8993a1'
           
          },
          '&:hover:not(:disabled)': {
          
          },
          '&:focus': {
            outline: 'none',
            
          },
        },
      },
    }

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return num.toString();
        }
    }

const columns = [
        {
            name: <p>Time</p>,
            // width: "130px",
            selector: row =><p className="truncate">{moment(timestampToUTC(row?.time)).format('LLL')}</p>,
        },
        
        {
            name: <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type</p>,
            selector: row => <p className={row?.action === 'Sell' || row?.action ==='Remove Liquidity' ? 'text-red-500 flex justify-center w-full text-center' : 'text-green-500'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{row?.action === 'Remove Liquidity' ? 'Sell' : row?.action}</p>,
            // maxWidth: "280px",
        },
        {
            name: <p>&nbsp;&nbsp;&nbsp;Token</p>,
            selector: row =>    <div className="text-left flex items-center justify-start gap-2 p-2">
            <span className="flex-shrink-0">{
row?.tokenA ?
              <img src={`${getImage}/image?unit=${row?.tokenA}&w=32`} className="w-8 rounded-full" alt="icon" /> :
              <div
                                className="xl:w-8 sm:w-7 w-6 xl:h-8 sm:h-7 h-6 xl:w-8 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "#00008B" }}
                              >
                                <span className="text-white font-medium">
                                  {row?.tokenAName?.split("")[0]}
                                </span>
                              </div>
            }
            </span>
            <span className="truncate whitespace-nowrap overflow-hidden text-ellipsis text-left">
                {row?.tokenAName}
              </span>
            
          </div>,
            // maxWidth: "280px", 
        },
        {
          name: 'Token amount',
          selector: row => <p>{formatNumber(row?.tokenAAmount?.toFixed())}  {row?.tokenAName}</p>,
        //   maxWidth: "300px",
      },
        {
            name: 'Swap amount',
            selector: row =><p>{formatNumber(row?.tokenBAmount?.toFixed())}</p>,
            // maxWidth: "120px",   
        },
      
        {
            name: 'Exchange',
            selector: row => row.exchange,
            // maxWidth: "80px", 
        },
        {
            name: '',
            selector: row =>        <div className="lg:w-6 w-0">
            <a href={`https://cardanoscan.io/token/${row?.tokenA}`} target = 'blank'> 
            <img
              src={IMG.Tappy}
              alt="riskwise"
              className="lg:w-6 w-0"
            />
            </a>
            
          </div>,
            // maxWidth: "80px", 
        },
      ];
const TokenSummary = () =>{

    const { walletTradeHistory } = useSelector((state) => state.walletProfilerReducer);

    return(
        <>
<div className="dataTableContainer pt-2"> 
    <DataTable  
      columns={columns}
      data={walletTradeHistory?.walletTrade}
      pagination={true} 
        paginationPerPage={15} 
        paginationRowsPerPageOptions={[10, 20, 30]}
        customStyles={tableCustomStyles}
        noDataComponent='No trade found'
        pointerOnHover
        responsive
        fixedHeaderScrollHeight="300px"
        subHeaderWrap  
    />
  </div>
        </>
    )
}

export default TokenSummary;