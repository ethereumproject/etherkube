import React from 'react';
import { connect } from 'react-redux'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Moment from 'react-moment'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { reloadNode } from '../store/nodesActions'

import log from 'loglevel'

const shortStyle = { width: 12 };
const wideStyle = { width: 120 };

const Render = ({node, refresh}) => {
    const haveData = typeof (node.block) === 'object';
    const ts = haveData ? new Date(parseInt(node.block.timestamp, 16) * 1000) : null;

    return (
        <TableRow key={node.service.metadata.uid} selectable={false}>
            <TableRowColumn style={shortStyle}>{node.service.metadata.name}</TableRowColumn>
            <TableRowColumn style={shortStyle}>{node.service.metadata.creationTimestamp}</TableRowColumn>
            <TableRowColumn style={shortStyle}>{node.height}</TableRowColumn>
            <TableRowColumn style={shortStyle}>
                <Moment fromNow>{ts}</Moment>
            </TableRowColumn>
            <TableRowColumn style={wideStyle}>{typeof(node.block) === 'object' ? node.block.hash : ''}</TableRowColumn>
            <TableRowColumn style={shortStyle}>
                <FlatButton icon={<FontIcon className="fa fa-refresh" />} onClick={refresh}/>
            </TableRowColumn>
        </TableRow>
    );
};

const NodesMini = connect(
    (state, ownProps) => {
        return {}
    },
    (dispatch, ownProps) => {
        return {
            refresh: () => {
                dispatch(reloadNode(ownProps.node));
            }
        }
    }
)(Render);


export default NodesMini