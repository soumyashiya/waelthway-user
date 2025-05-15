import { Outlet } from 'react-router-dom';

const Compliance = () => {
  return (
    <div className='compliance-container'>
      {/* <h2>Compliance Section</h2> */}
      <Outlet />
    </div>
  );
};

export default Compliance;
