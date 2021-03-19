import React from 'react';

const RightSide = () => (
  <div className="col h-100">
    <div className="d-flex flex-column h-100">
      <div id="messages-box" className="chat-messages overflow-auto mb-3" />
      <div className="mt-auto">
        <form noValidate="" className="">
          <div className="form-group">
            <div className="input-group">
              <input name="body" aria-label="body" className="mr-2 form-control" value="" />
              <button aria-label="submit" type="submit" className="btn btn-primary">Submit</button>
              <div className="d-block invalid-feedback">&nbsp;</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default RightSide;
