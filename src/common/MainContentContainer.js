const MainContentContainer = (props) => {
  const { children } = props;
  return <div className=" px-2 w-screen overflow-x-hidden"> {children} </div>;
};

export default MainContentContainer;
