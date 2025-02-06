import  { useState, useEffect } from 'react';
import Papa from 'papaparse';

const DrugSearch = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [price, setPrice] = useState(null);
  const [price2, setPrice2] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchDrugData = async () => {
      const response = await fetch('/Medora/data/drugs.csv');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const result = await reader.read();
      const text = decoder.decode(result.value);
      Papa.parse(text, {
        complete: (parsedData) => {
          setDrugs(parsedData.data.map(row => {
            const [generic, price_in_inr,price_in_inr2] = row[0].split(',');
            // const [price_in_inr,price_in_inr2] = price_in_inr1.split('-');
            return { generic, price_in_inr: price_in_inr,price_in_inr2:price_in_inr2 };
          }));
        },
      });
    };
    fetchDrugData();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filteredSuggestions = drugs.filter(drug =>
        drug.generic.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }

    const drug = drugs.find(drug => drug.generic.toLowerCase() === query.toLowerCase());
    if (drug) {
      setPrice(drug.price_in_inr);
      setPrice2(drug.price_in_inr2);
    } else {
      setPrice(null);
    }
  };

  const handleSuggestionClick = (drugName) => {
    setSearchQuery(drugName);
    const drug = drugs.find(drug => drug.generic.toLowerCase() === drugName.toLowerCase());
    if (drug) {
      setPrice(drug.price_in_inr);
      setPrice2(drug.price_in_inr2);
    }
    setSuggestions([]);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-[#185A79] mb-12 text-center relative after:content-[''] after:absolute after:w-24 after:h-1 after:bg-[#185A79] after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2">
        Drug Price Search
      </h1>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Enter drug name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#185A79] focus:border-transparent"
        />
        {price && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#185A79]">{searchQuery}</h3>
            <p className="text-gray-600">Price: <span className="text-2xl font-bold text-[#185A79]">₹{price} </span></p>
          </div>
        )}
        {!price && searchQuery && !suggestions.length && (
          <div className="mt-4 text-red-500">Please enter the correct drug name.</div>
        )}
        {suggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            {suggestions.map((drug, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(drug.generic)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                {drug.generic}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DrugSearch;