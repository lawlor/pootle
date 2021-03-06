/*
 * Copyright (C) Pootle contributors.
 *
 * This file is a part of the Pootle project. It is distributed under the GPL3
 * or later license. See the LICENSE file for a copy of the license and the
 * AUTHORS file for copyright and authorship information.
 */

import cx from 'classnames';
import React, { PropTypes } from 'react';

import InnerDiv from './InnerDiv';


const ViewUnit = React.createClass({

  propTypes: {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired,
    isFuzzy: PropTypes.bool,
    language: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired, // original | translation
    innerComponent: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      innerComponent: InnerDiv,
      isFuzzy: false,
    };
  },

  createValue(value, index) {
    return (
      <div
        className="translation-text"
        dir={this.props.dir}
        key={`${this.props.type}-value-${index}`}
        lang={this.props.language}
      >
        <this.props.innerComponent value={value} />
      </div>
    );
  },

  render() {
    const classNames = cx(`translate-${this.props.type}`, 'translate-view', {
      'fuzzy-unit': this.props.isFuzzy,
    });

    return (
      <div
        dir={this.props.dir}
        className={classNames}
        id={`${this.props.type}${this.props.id}`}
        data-target={this.props.url}
      >
        {this.props.values.map(this.createValue)}
      </div>
    );
  },

});


export default ViewUnit;
