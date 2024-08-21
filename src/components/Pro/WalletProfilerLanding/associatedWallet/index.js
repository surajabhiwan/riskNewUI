import TopSection from './topSection';
import Table from './table';
import TokenAssoc from './table/TableAssoc';

const AssociatedWallets = () => {
  return (
    <div className="mt-2">
      <TopSection />
      {/* <Table /> */}
      <TokenAssoc/>
    </div>
  );
};

export default AssociatedWallets;
