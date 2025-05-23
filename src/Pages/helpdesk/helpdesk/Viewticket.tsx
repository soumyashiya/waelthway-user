import { Button } from "react-bootstrap";
import "./viewticket.css";
const Viewticket = () => {
  return (
    <div className="viewticket-container">
      <div className="enquiry-card-container">
        <h2 className="card-title">FDDSDFSD</h2>
        <p className="card-subtitle">Enquiry Type: Trading Operations</p>
        <p className="card-user">
          <strong>User Name:</strong> Textdxb
        </p>
        <p className="card-description">
          <strong>Description:</strong> sdfsdf
        </p>
        <p className="card-status">
          <strong>Status:</strong> <span className="status-open">Open</span>
        </p>
        <p className="card-date">Created On: 2025-03-03</p>
      </div>
      <div className="ticket-reply-container">
        <div className="ticket-reply">
          <h3 className="admin-name">Admin</h3>
          <p className="message">test ticket replay</p>
          <span className="timestamp">2025-03-04 - 9:11</span>
        </div>
        <div className="ticket-reply">
          <h3 className="admin-name">Admin</h3>
          <p className="message">test ticket replay</p>
          <span className="timestamp">2025-03-04 - 9:11</span>
        </div>
        <div className="ticket-reply">
          <h3 className="admin-name">Admin</h3>
          <p className="message">test ticket replay</p>
          <span className="timestamp">2025-03-04 - 9:11</span>
        </div>
      </div>
      <div className="add-reply-container">
        <h2>Add Reply</h2>

        <div className="reply-form">
          <input
            type="text"
            placeholder="write your replay here"
            className="error-message"
          />
          <div className="user-list-btn">
            <button
              style={{
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="scroll-top">
          <button className="scroll-top-button" aria-label="Scroll to top">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Viewticket;
