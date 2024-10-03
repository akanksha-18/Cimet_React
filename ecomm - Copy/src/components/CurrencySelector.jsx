import { useSelector, useDispatch } from 'react-redux';
import { setCurrency } from '../slices/currencySlice';

const CurrencySelector = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency.currency); 

  return (
    <select
      value={currency}
      onChange={(e) => dispatch(setCurrency(e.target.value))}
      className="ml-2 border rounded p-1"
    >
      <option value="USD">USD</option>
      <option value="INR">INR</option>
      <option value="AUD">AUD</option>
    </select>
  );
};

export default CurrencySelector;
