import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="backdrop">
        <div className="modal">
          {this.props.children}
          <br />
          <div className="footer">
            <button className={"btn btn-primary btn-lg"} onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;