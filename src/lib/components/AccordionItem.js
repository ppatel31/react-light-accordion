import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class AccordionItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    className: PropTypes.string,
    titleClass: PropTypes.string,
    panelClass: PropTypes.string
  };

  static defaultProps = {
    title: 'TITLE',
    isOpen: false,
    className: '',
    titleClass: '',
    panelClass: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
      className: props.className,
      titleClass: props.titleClass,
      panelClass: props.panelClass
    };
    this.mounted = true;
  }

  handleDocumentClick = event => {
    if (
      this.mounted &&
      !ReactDOM.findDOMNode(this).contains(event.target) &&
      this.state.isOpen
    ) {
      this.setState({ isOpen: false });
    }
  };

  componentDidMount() {
    if (this.props.atomic) {
      document.addEventListener('click', this.handleDocumentClick, false);
      document.addEventListener('touchend', this.handleDocumentClick, false);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  onClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const accordionItemClassNames = classNames([
      'accordion-item',
      this.state.className,
      {
        active: this.state.isOpen
      }
    ]);

    return (
      <div className={accordionItemClassNames}>
        <div
          className={`title ${this.state.titleClass}`}
          onClick={this.onClick}
        >
          {this.props.title}
        </div>
        <div className={`panel ${this.state.panelClass}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AccordionItem;
