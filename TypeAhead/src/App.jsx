import { useState } from "react";


const upiHandles = ["@oksbi", "@okhdfcbank", "@okicici", "@okaxis", "@ybl", "@paytm", "@upi"];

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredHandles, setFilteredHandles] = useState([]);
  const [bestMatch, setBestMatch] = useState("");

  
  const handleInputChange = (e) => {
    const value = e.target.value;

    
    if (value.split("@").length > 2) {
      return; 
    }

    setInputValue(value);

    
    if (value.includes("@")) {
      const searchTerm = value.split("@")[1];
      const filtered = upiHandles.filter((handle) =>
        handle.includes(searchTerm)
      );
      setFilteredHandles(filtered.length > 0 ? filtered : ["No matching UPI handles"]);
      
      
      if (filtered.length > 0 && filtered[0] !== "No matching UPI handles") {
        setBestMatch(filtered[0]);
      } else {
        setBestMatch("");
      }
    } else {
      setFilteredHandles([]);
      setBestMatch(""); 
    }
  };

  
  const handleSelect = (handle) => {
    if (handle !== "No matching UPI handles") {
      setInputValue(inputValue.split("@")[0] + handle); 
      setFilteredHandles([]); 
      setBestMatch(""); 
    }
  };

  
  const handleKeyPress = (e) => {
    if (e.key === "ArrowRight" && bestMatch) {
      setInputValue(inputValue.split("@")[0] + bestMatch);
      setFilteredHandles([]); 
      setBestMatch(""); 
    }
  };

  return (
    <div>
      <h2>Enter your UPI handle:</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress} 
        placeholder="e.g. yourname@okicici"
        style={{ padding: "10px", width: "300px" }}
      />
      
      {bestMatch && inputValue.includes("@") && (
        <p style={{ color: "grey", marginTop: "-20px" }}>
          Did you mean: <strong>{bestMatch}</strong>?
        </p>
      )}

      
      {filteredHandles.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "10px", border: "1px solid #ccc" }}>
          {filteredHandles.map((handle, index) => (
            <li
              key={index}
              onClick={() => handleSelect(handle)}
              style={{ padding: "10px", cursor: "pointer", background: "#f9f9f9" }}
            >
              {handle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
