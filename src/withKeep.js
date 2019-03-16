import React, { Component } from "react";

function withKeep(WrappedComponent, propsToKeep, shouldUseKeptProps) {
  if (!Array.isArray(propsToKeep) || typeof shouldUseKeptProps !== "function") {
    return WrappedComponent;
  }

  class Keep extends Component {
    constructor(props) {
      super(props);

      this.keptProps = {};
    }

    keepProps() {
      propsToKeep.forEach(prop => {
        this.keptProps[prop] = this.props[prop];
      });
    }

    render() {
      const props = { ...this.props };

      if (shouldUseKeptProps(this.props)) {
        Object.assign(props, this.keptProps);
      } else {
        this.keepProps();
      }

      return <WrappedComponent {...props} />;
    }
  }

  return Keep;
}

export default withKeep;
