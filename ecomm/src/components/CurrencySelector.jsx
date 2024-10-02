import { useCurrency } from '../context/CurrencyContext';

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="ml-2 border rounded p-1"
    >
      <option value="USD">USD</option>
      <option value="INR">INR</option>
      <option value="AUD">AUD</option>
    </select>
  );
};

export default CurrencySelector;