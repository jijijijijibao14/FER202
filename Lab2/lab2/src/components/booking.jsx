export default function Booking(){
    return(
         <div className="py-5 bg-dark text-white">
      <h2 className="text-center mb-4">Book Your Table</h2>

      <form className="bg-dark p-4 rounded">
        <div className="row mb-3">
            <div className ="alert alert-info mt-4" role ="alert">
                Nhap thong tin de dat ban
            </div>
          <div className="col-md-4"> 
            <input
              type="text" className="form-control" placeholder="Your Name *"
            />
          </div>
          <div className="col-md-4">
            <input
              type="email" className="form-control" placeholder="Your Email *"
            />
          </div>
          <div className="col-md-4">
            <select className="form-select">
              <option defaultValue>Select a Service</option>
              <option value="1">Eat</option>
              <option value="2">Booking</option>
              <option value="3">Party</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="4"
            placeholder="Please write your comment"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-warning text-white">
          Send Message
        </button>
      </form>
    </div>
    );
}
            