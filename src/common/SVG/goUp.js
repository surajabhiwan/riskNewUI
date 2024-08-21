const GoUp = (props) => {
    const {stroke}=props;
    return (
        <>
            <svg className={`${stroke?"stroke-[#939393]":"stroke-[#20eb7a]"}`}  width="8" height="8" viewBox="0 0 12 12"><g id="Group_16321" data-name="Group 16321" transform="translate(-32.793 -63.793)"><line id="Line_369" data-name="Line 369" y1="10" x2="10" transform="translate(33.5 64.5)" fill="none" strokeLinecap="round" strokeWidth="2"></line><line id="Line_370" data-name="Line 370" y1="6" transform="translate(43.5 64.5)" fill="none" strokeLinecap="round" strokeWidth="2"></line><line id="Line_371" data-name="Line 371" x2="6" transform="translate(37.5 64.5)" fill="none" strokeLinecap="round" strokeWidth="2"></line></g></svg>
        </>
    )
}
export default GoUp;