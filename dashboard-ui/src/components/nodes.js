import React from 'react';
import { connect } from 'react-redux'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import log from 'loglevel';

const Render = ({nodes}) => {

    var table = <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Since</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
            {nodes.map( (node) => {
            return (
                <TableRow key={node.service.metadata.uid} selectable={false}>
                    <TableRowColumn>{node.service.metadata.name}</TableRowColumn>
                    <TableRowColumn>{node.service.metadata.creationTimestamp}</TableRowColumn>
                </TableRow>
            );
            })}
        </TableBody>
    </Table>;



    return (
        <div id="nodes">
            <h2>Nodes</h2>
            {table}
        </div>
    )
};

const NodesList = connect(
    (state, ownProps) => {
        return {
            nodes: state.nodes.has('items') ? state.nodes.get('items').toJS() : [],
        }
    },
    (dispatch, ownProps) => {
        return {}
    }
)(Render);


export default NodesList