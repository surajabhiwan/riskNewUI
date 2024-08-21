import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { timestampToUTC } from "../../../../../functions/functions";
import * as IMG from "../../../../../common/IMG/Images";
import { getImage } from "../../../../../baseurl/baseurl";
import { useEffect } from "react";
import moment from "moment/moment";
import useAddressHandler from "../../../../../customHook/adressConvert";
import { setwalletprofilermenuitems } from "../../../../../store/slices/wallet";


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
          justifyContent: 'center',
          textOverflow: 'hidden'
          
        },
      },
  
      cells: {
          style: {
               fontSize:'0.875rem',
               justifyContent: 'center',
               fontWeight: 'bold',
               borderWidth: "80% !important"  ,
              //  textOverflow: "ellipsis", 
          },
      },
  
      rows: {
        style :{
          backgroundColor: '#142028' ,
          color : 'white',
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
      
const TokenAssoc = () =>{

    const { inputOutputData } = useSelector((state) => state.walletProfilerReducer);
    const { isSearching, handleAddresses } = useAddressHandler();
     const dispatch = useDispatch()
    const handleSubmit = async (inputValue) => {
      if(inputValue?.length > 0){
          handleAddresses(inputValue);
      }
      else{
        return null
      }
      };

    const columns = [
        {
            name: 'Address',
            // width: "130px",
            selector: row =>  <span className={`${row?.stake?.length ? 'hover:text-gray-500' : ''} w-full truncate`} onClick={()=>handleSubmit(row?.stake)}>
            {row?.stake?.length 
              ? row?.stake?.substring(0, 10) +
                "..." +
                row?.stake?.substring(
                  row?.stake?.length - 4,
                  row?.stake?.length
                )
              :  'N/A'} 
          </span>
        },
        
        {
            name: 'Inbound amount',
            selector: row => `₳ ${((row?.amount?.inputs[0]?.amount[0]?.quantity)/1000000)?.toFixed()}`
            // maxWidth: "280px",
        },
        {
            name: 'Outbound amount',
            selector: row =>  `₳ ${((row?.amount?.outputs[0]?.amount[0]?.quantity)/1000000)?.toFixed()}` 
        },
        {
          name: 'Transaction',
          selector: row =>  <div className="">{moment(timestampToUTC(row?.blockTime)).format('LLL')}</div>,
        //   maxWidth: "300px",
      },
     
      ];

    return(
        <>
<div className="pt-4 "> 
    <DataTable  
      columns={columns}
      data={inputOutputData}
      pagination={true} 
        paginationPerPage={15} 
        paginationRowsPerPageOptions={[10, 20, 30]}
        customStyles={tableCustomStyles}
        noDataComponent='No data found'
        pointerOnHover
        responsive
        fixedHeaderScrollHeight="300px"
        subHeaderWrap    
    />
  </div>
        </>
    )
}

export default TokenAssoc;