import Table from "./cryptocurrencies/Table";
import Header from "./cryptocurrencies/Header";

const Cryptocurrencies = () => {
    return (
        <div className="w-full px-0 pb-4 lg:px-4">
            <div className="bg-[#142028] rounded-2xl px-1 py-2">
                <Header />
                <Table />
            </div>
        </div>

    )
}

export default Cryptocurrencies;