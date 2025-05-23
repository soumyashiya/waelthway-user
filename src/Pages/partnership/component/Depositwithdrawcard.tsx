import './depositwithdrawcard.css'

const cardDataa = [
  { id: 1, title: "Total MT5 Account", value: 0, img: "https://monet.tairad.com/assets/images/account-file.webp" },
];

const Depositwithdrawcard = () => {
  return (



    <div className="deposit-dashboard-cards-wrapper">
      {cardDataa.map((card) => (
        <div key={card.id} className="card-body">
          {/* <img className="user-img" src={card.img} alt="" /> */}
            <h3>{card.title}</h3>
          <p>{card.value}</p>
        </div>
      ))}
    </div>





  )
}

export default Depositwithdrawcard
