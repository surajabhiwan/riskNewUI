import { useState, useEffect } from "react";
import * as SVG from "../../common/Icons";
import { Link } from "react-router-dom"

const DropDownDatas = [
  {
    id: 0,
    value: "Charts",
    menu: "/charts",
    selectedMenu: "Token",
    active: true,
    isPro: false
  },
  {
    id: 1,
    value: "QuantumAnalysis",
    selectedMenu: "QuantumAnalysis",
    menu: "/charts/volume",
    active: false,
    isPro: true
  },
  {
    id: 2,
    value: "Allocation",
    menu: "/charts/distribution",
    selectedMenu: "Allocation",
    active: true,
    isPro: true
  },
  {
    id: 3,
    value: "CashFlow",
    selectedMenu: "CashFlow",
    menu: "/charts/profit",
    active: false,
    isPro: false
  },
  {
    id: 4,
    value: "Liquidity",
    active: true,
    menu: "/charts/liquidity",
    selectedMenu: "Liquidity",
    isPro: false
  },
  {
    id: 5,
    value: "Disposition",
    menu: "/charts/transfer",
    selectedMenu: "Disposition",
    active: true,
    isPro: false
  },
  {
    id: 6,
    value: "Staking",
    active: true,
    menu: "/charts/debt",
    selectedMenu: "Staking",
    isPro: false
  }
]
const ChartSmallHeaderDirect = () => {
  const [menu, setMenu] = useState("");
  const [displayValue, setDisplayValue] = useState(DropDownDatas[0]);
  const [isOpen, setIsOpen] = useState(false);
  const toggelMenu = () => {
    setIsOpen(!isOpen);
  }
  const [menuItem, setMenuItem] = useState(DropDownDatas);
  const handleItem = (_idx) => {
    const newMenuItem = menuItem.map((item, idx) => {
      if (_idx === idx) {
        item.active = true;
        setDisplayValue(item)
      }
      else {
        item.active = false;
      }
      return item
    })
  }
  useEffect(() => {
    var current = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
    setMenu(current)
  }, [window.location.pathname.substring(window.location.pathname.lastIndexOf('/' + 1))])
  return (
    <div className="relative z-1" style={{position: "relative", zIndex: '1'}}>
      <div
        onClick={toggelMenu}
        className={`bg-[#142028]  flex justify-between px-3   items-center  w-[150px] h-[40px]   lg:gap-4 gap-1 cursor-pointer rounded-xl ${menu === displayValue.selectedMenu ? "bg-[#24242c]" : ""}  `} >
        <div
          className={`flex justify-start items-center  w-full h-full `}>
          <Link
            className={`lg:text-base text-base  font-medium ${menu === "token" ? "text-white" : "text-[#9f9fa8]"} hover:text-white text-[#9f9fa8]`}>{menu === "token" ? "Chart" : menu === "volume" ? "QuantumAnalysis" : menu === "distribution" ? "Allocation" : menu === "profit" ? "CashFlow" : menu === "liquidity" ? "Liquidity" : menu === "transfer" ? "Disposition" : menu === "debt" ? "Staking" : ""}</Link>
        </div>
        {isOpen ? (<SVG.Left />) : (<SVG.Right />)}
      </div>
      <div
        className={` flex justify-between  absolute z-20  bg-[#142028] px-3   items-center transition-all duration-200 transform h-[40px] w-[800px]  ${isOpen ? "scale-x-100" : "scale-x-0"} rounded-xl origin-left   lg:gap-4 gap-1 cursor-pointer  top-0 left-[160px]`} >
        {DropDownDatas.map((item, idx) => {
          return (

            <div
              key={idx}
              className={` ${isOpen ? "flex justify-start" : "hidden"}  items-center  w-full h-full `}>
              <Link
                to={item.menu}
                className={`lg:text-base text-base  font-medium hover:text-white text-[#9f9fa8]`}>{item.value}</Link>
            </div>
          )
        })}
      </div>
    </div>

  )
}

export default ChartSmallHeaderDirect;