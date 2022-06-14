import React, { useState } from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import {
    Grid,
    TextField,
    Card,
    MenuItem,
    Select,
    Switch,
    Button,
    Autocomplete,
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
} from '@mui/material'
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import img_export from '../../../assets/export.png'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const SpanDiv = styled('span')(({ theme }) => ({
    padding: '10px',
    margin: '10px',
    width: '100px',
    textTransform: 'capitalize',
    borderRadius: '5px',
    cursor: 'pointer'
}))

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    paddingLeft: '30px',
    textTransform: 'capitalize',
    color: theme.palette.text.primary,
}))

const Paragraph = styled('p')(({ theme }) => ({
    margin: 0,
    fontWeight: 'bold',
    color: theme.palette.text.primary,
}))

const Paragraph2 = styled('p')(({ theme }) => ({
    margin: 0,
    fontSize: '12px',
    color: theme.palette.text.secondary,
}))

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}))

const subscribarList = [
    {
        name: 'john doe',
        date: '18 january, 2019',
        time: '5:00 PM',
        amount: 1000,
        status: 'close',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'kessy bryan',
        date: '10 january, 2019',
        time: '5:00 PM',
        amount: 9000,
        status: 'open',
        company: 'My Fintech LTD.',
    },
    {
        name: 'kessy bryan',
        date: '10 january, 2019',
        time: '5:00 PM',
        amount: 9000,
        status: 'open',
        company: 'My Fintech LTD.',
    },
    {
        name: 'james cassegne',
        date: '8 january, 2019',
        time: '5:00 PM',
        amount: 5000,
        status: 'close',
        company: 'Collboy Tech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        time: '5:00 PM',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        time: '5:00 PM',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        time: '5:00 PM',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        time: '5:00 PM',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        time: '5:00 PM',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
]

const sortby_options = [
    { label: 'Newest to Oldest' },
    { label: 'Oldest to Newest' },
]

const trans_types = [
    { label: 'All Types' },
    { label: 'Other' },
]

const asset_types = [
    { label: 'All Assets' },
    { label: 'Other' },
]

const History = () => {
    const [status, setStatus] = useState('all');
    const Export = () => {
        console.log("Export");
    }
    //------- For Table pagenation  -------
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    // --------------------------------------
    const [value, setValue] = React.useState([null, null]);
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'History', path: '/history' },
                    ]}
                />
            </div>
            <H4>Transaction History</H4>
            <div style={{padding: '20px 10px', margin: 'auto'}}>                
                <Grid container spacing={3} rowspacing={3}>
                    <Grid item xs={12} sm={4} md={4} style={{textAlign: 'center'}}>
                        <SpanDiv className={status == 'all'? 'selected' : 'deselected'} onClick={()=>setStatus('all')}>All</SpanDiv>
                        <SpanDiv className={status == 'paid'? 'selected' : 'deselected'} onClick={()=>setStatus('paid')}>Paid</SpanDiv>
                        <SpanDiv className={status == 'waiting'? 'selected' : 'deselected'} onClick={()=>setStatus('waiting')}>Waiting</SpanDiv>
                        <SpanDiv className={status == 'refund'? 'selected' : 'deselected'} onClick={()=>setStatus('refund')}>Refund</SpanDiv>
                    </Grid>
                    <Grid item xs={3} sm={1} md={1}>
                        <Paragraph2>Sort By</Paragraph2>
                    </Grid>
                    <Grid item xs={5} sm={2} md={2} style={{paddingLeft: '0px'}}>
                        <Autocomplete
                            style={{marginTop: '-10px'}}
                            options={sortby_options}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    // label="Combo box"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={4} sm={3} md={3} style={{textAlign: 'right'}}>
                        <Button style={{marginTop: '-10px'}} onClick={Export}><Icon>add</Icon>&nbsp;Export</Button>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} >
                        <Box py="20px" />
                    </Grid>
                </Grid>
                <Grid container spacing={6} justifyContent="center">
                    <Grid item xs={12} sm={7} md={7} >
                        <Box width="100%" overflow="auto">
                            <StyledTable>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Item</TableCell>
                                        {/* <TableCell>Company</TableCell> */}
                                        <TableCell align="center">Datetime</TableCell>
                                        {/* <TableCell>Status</TableCell> */}
                                        <TableCell align="right">Amount</TableCell>
                                        {/* <TableCell>Action</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {subscribarList
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((subscriber, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left">
                                                    <Grid container spacing={1} alignItems="center">
                                                        <Grid item xs={4} sm={4} md={4} style={{textAlign: 'right', paddingTop: '18px', paddingRight: '10px'}}><img src={img_export} /></Grid>
                                                        <Grid item xs={8} sm={8} md={8}>
                                                            <Paragraph>Interest</Paragraph>
                                                            <Paragraph2>DOT Interest Earned</Paragraph2>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                                {/* <TableCell align="left">
                                                    {subscriber.company}
                                                </TableCell> */}
                                                <TableCell align="center">
                                                    <Paragraph2>{subscriber.date}</Paragraph2>
                                                    <Paragraph2>{subscriber.time}</Paragraph2>
                                                </TableCell>
                                                {/* <TableCell>{subscriber.status}</TableCell> */}
                                                <TableCell align="right">
                                                    <Paragraph>+0.00035422 DOT</Paragraph>
                                                    <Paragraph2>+0.00 USD</Paragraph2>
                                                </TableCell>
                                                {/* <TableCell>
                                                    <IconButton>
                                                        <Icon color="error">close</Icon>
                                                    </IconButton>
                                                </TableCell> */}
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </StyledTable>

                            <TablePagination
                                sx={{ px: 2 }}
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={subscribarList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{
                                    'aria-label': 'Previous Page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'Next Page',
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3} >
                        <Box py="10px" />
                        <Paragraph style={{fontSize: '18px'}}>Filters</Paragraph>
                        <Box py="20px" />
                        <Paragraph style={{fontSize: '14px', fontWeight: 'none'}}>Date Range</Paragraph>
                        <Box py="10px" />
                        <div style={{width: '100%'}}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDateRangePicker
                                startText="start"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(startProps, endProps) => (
                                    <React.Fragment>
                                    <TextField {...startProps} size="small"/>
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} size="small"/>
                                    </React.Fragment>
                                )}
                                />
                            </LocalizationProvider>
                        </div>
                        <Box py="20px" />
                        <Paragraph style={{fontSize: '14px', fontWeight: 'none'}}>Transaction Type</Paragraph>
                        <Box py="10px" />
                        <Autocomplete
                            style={{marginTop: '-10px'}}
                            options={trans_types}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    // label="Combo box"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />
                            )}
                        />
                        <Box py="20px" />
                        <Paragraph style={{fontSize: '14px', fontWeight: 'none'}}>Asset</Paragraph>
                        <Box py="10px" />
                        <Autocomplete
                            style={{marginTop: '-10px'}}
                            options={asset_types}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    // label="Combo box"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </div>
            
        </Container>
    )
}

export default History
