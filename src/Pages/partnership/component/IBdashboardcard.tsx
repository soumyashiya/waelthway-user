import './ibdashboardcard.css';

interface IBdashboardcardsProps {
  title: string;
  value: string | number;
 img?: string;
 data:string
}

const IBdashboardcards = ({ title, value, img,data }: IBdashboardcardsProps) => {
  return (
    <div className="card-body">
      {img && img.trim() !== '' && (
        <img
          className="user-img"
          src={img}
          alt={title}
          onError={() => console.error('Image failed to load:', img)}
        />
      )}
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};


export default IBdashboardcards;
