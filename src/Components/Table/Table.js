import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import Fuse from 'fuse.js'
import database from '../../Database/database.json';
import { titleCase } from '../../Utils/function';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {default as MaterialTable} from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflowY: 'hidden',
        overflowX: 'auto',
        flexDirection: 'column',
        textAlign: 'center'
    },
    sort: {
        fontSize: '12px',
        marginLeft: '2px'
    },
    pagination: {
        marginTop: theme.spacing(1),
        textAlign: "right"
    },
    selectLimit: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2)
    },
    pageOf: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2)
    },
    nextPrevButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
    },
    search: {
        display: 'flex',
        flexDirection: 'row-reverse',
        width: 'auto'
    }
}));

export default function Table() {
    const classes = useStyles();
    const { t } = useTranslation();
    const [ data, setData ] = useState([]);
    const [ orderBy, setOrderBy ] = useState(0);
    const [ order, setOrder ] = useState('desc');
    const [ headCells, setHeadCells ] = useState([]);
    const [ limit, setLimit ] = useState(10);
    const [ page, setPage] = useState(1);
    const [ searchInput, setSearchInput ] = useState('');
    useEffect(() => {
        let tempHeadCells = [];
        Object.keys(database.employees[0]).map((o, oi) => {
            if(o !== 'login') {
                tempHeadCells.push({
                    id: oi,
                    label: o === 'id' ? 'No.' : titleCase(o),
                    property: o
                })
            }
        });
        setHeadCells(tempHeadCells)
        setData(database.employees)
    }, [])

    const handleSort = (id, property) => {
        let orientation = '';
        if(orderBy !== id) { 
            orientation = 'asc';
        } else {
            if(order === 'asc') {
                orientation = 'desc'
            } else {
                orientation = 'asc'
            }
        }
        setData (_.orderBy(data, [property], [orientation]));
        setOrderBy(id);
        setOrder(orientation)
    }

    const fuseOptions = {
        keys: ['name'],
        threshold: 0.3,
    }

    const fuse = new Fuse(database.employees, fuseOptions);

    const handleSearch = (e) => {
        setSearchInput(e.target.value)
        e.target.value.length > 0 ? setData(fuse.search(e.target.value).map(s => s.item)) : setData(database.employees);
    }
    
    return(
        <Paper className={classes.paper}>
            <Box className={classes.search}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    label={t('dashboard.search')}
                    name="search"
                    id="search"
                    value={searchInput}
                    onChange={handleSearch}
                    autoFocus={false}
                    size="small"
                />
            </Box>
            <MaterialTable
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
            >
                <TableHead>
                    <TableRow>
                        {headCells && headCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                align="center"
                                sortDirection={orderBy === headCell.id ? order : false}
                                onClick={() => handleSort(headCell.id, headCell.property)}
                            >
                            {t(`dashboard.${headCell.property}`)}
                            {order === 'desc' && 
                                <ArrowDownwardIcon className={classes.sort}
                                    style={orderBy === headCell.id ? {opacity: 1} : {opacity: 0}} 
                                />}
                            {order === 'asc' &&
                                <ArrowUpwardIcon className={classes.sort}
                                    style={orderBy === headCell.id ? {opacity: 1} : {opacity: 0}} 
                                />}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && _.chain(data).drop((page-1)*limit).take(limit).value().map((d,di) => {
                        return (
                            <TableRow key={`data-${d.id}`}>
                                <TableCell align="center">{di + 1}</TableCell>
                                <TableCell align="center">{d["join-date"]}</TableCell>
                                <TableCell align="center">{d.name}</TableCell>
                                <TableCell align="center">{d.age}</TableCell>
                                <TableCell align="center">{d.gender}</TableCell>
                                <TableCell align="center">{d.position}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </MaterialTable>
            <Box className={classes.pagination}>
                {t('dashboard.perPage')} 
                <Select
                    labelId="select-employee-limit"
                    id="select-employee-limit"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    className={classes.selectLimit}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                </Select>
                <span className={classes.pageOf}>
                    {`${t('dashboard.noPage')} ${page} ${t('dashboard.noPageOf')} ${Math.ceil(data.length/limit)}`}
                </span>
                <span className={classes.nextPrevButton}>
                    <NavigateBeforeIcon 
                        color={page - 1 === 0 ? "disabled" : ""} 
                        fontSize="small"
                        onClick={() => {if(page !== 1) {setPage(page-1)} }}
                    />
                    <NavigateNextIcon 
                        color={page === Math.ceil(data.length/limit) ? "disabled" : ""}
                        fontSize="small"
                        onClick={() => {if(page !== Math.ceil(data.length/limit)) {setPage(page+1)} }}
                    /> 
                </span>
            </Box>
        </Paper>
    );
}
