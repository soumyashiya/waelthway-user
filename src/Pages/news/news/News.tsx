import React from "react";
import cash from "../../../assets/cash.webp";
import bank from "../../../assets/bank.webp";
import cashtransfer from "../../../assets/cashtransfer.webp";
import "./News.css";
import { useNavigate } from "react-router-dom";


interface Method {
  title: string;
  img: string;
}

const depositMethods = [
  {
    title: "Bank",
    img: bank,
  },
  {
    title: "Cash",
    img: cash,
  },
  {
    title: "Domestic Bank Transfer",
    img: cashtransfer,
  },
];

const News = () => {
  const navigate = useNavigate();

  const navigateToReadMore = (method: Method) => {
    navigate("/readmore", { state: { newsItem: method } });
  };

  return (
    <div className="deposit-containerr">
      <h2 className="deposit-title">News</h2>
      <div className="deposit-grid">
        {depositMethods.map((method, index) => (
          <div className="deposit-card" key={index}>
            <img src={method.img} alt={method.title} className="deposit-icon" />
            <h3>{method.title}</h3>
            <button
              className="px-4 py-2"
              onClick={() => navigateToReadMore(method)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
