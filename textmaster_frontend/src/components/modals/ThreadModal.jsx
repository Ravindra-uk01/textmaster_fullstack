import "./threadModal.css";

const ThreadModal = ({ visible, onClose, threadData, setThreadData }) => {
  if (!visible) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setThreadData((prev) => ({
      ...prev,
      [name]: name === 'bookmarked' ? value === 'true' : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('ready to submit')
  };

  console.log("thread data is ", threadData);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <h2> Thread Details</h2>
          <div className="close-button" onClick={onClose}>
            X
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" name="title" value={threadData.title} onChange={handleInputChange} required  />
            <label htmlFor="title" >Title</label>
          </div>
          <div>
            <span>Bookmark</span>
            <label>
                <input
                type="radio"
                name="bookmarked"
                value={"true"}
                onChange={handleInputChange}
                />
                Yes
            </label> 

            <label>
                <input
                type="radio"
                name="bookmarked"
                value={"false"}
                onChange={handleInputChange}
                />
                No
            </label>
            
           
          </div>

          <div>
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThreadModal;
