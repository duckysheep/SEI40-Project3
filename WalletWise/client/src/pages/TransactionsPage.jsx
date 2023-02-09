import NavigationBar from "../components/NavigationBar";
import AddEntryForm from "../components/transactions/AddEntryForm";
import TransactionTable from "../components/transactions/TransactionTable";

export default function TransactionsPage({
  entries,
  fetchTransaction,
  setEntries,
}) {
  return (
    <>
      <NavigationBar />
      <div>TransactionsPage</div>
      <AddEntryForm fetchTransaction={fetchTransaction} />
      <TransactionTable entries={entries} setEntries={setEntries} />
    </>
  );
}
