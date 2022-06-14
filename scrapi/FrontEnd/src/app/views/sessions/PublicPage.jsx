import React, { useState, Fragment } from 'react'
import DoughnutCard from '../dashboard/shared/DoughnutCard'
import RiskCard from '../dashboard/shared/RiskCard'
import StayCard from '../dashboard/shared/StayCard'
import SearchBox from './SearchBox'
import { Span } from '../../components/Typography'
import { Box, styled, useTheme } from '@mui/system'
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Telegram from '@mui/icons-material/Telegram';
import Reddit from '@mui/icons-material/Reddit';
import Chart from "react-apexcharts";
import useAuth from 'app/hooks/useAuth'
import img_addUmbrella from '../../../assets/addUmbrella.png'
import img_affection from '../../../assets/affection.png'
import img_human from '../../../assets/human.png'
import img_stay1 from '../../../assets/stay1.png'
import img_stay2 from '../../../assets/stay2.png'
import img_stay3 from '../../../assets/stay3.png'
import logo from '../../../assets/AutonomusLogo.png'
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
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
    Tab,
    Tabs,
    Icon,
    TablePagination,
} from '@mui/material'

import SmoothScroll from "smooth-scroll";
import { DoubleArrow } from '@mui/icons-material'

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const ContentBox = styled('div')(({ theme }) => ({
    margin: 'auto',
    marginTop: '30px',
    padding: '10px 50px',
    maxWidth: '1400px',
    [theme.breakpoints.down('sm')]: {
        marginTop: '16px',
    },
    

}))

const Contact = styled('div')(({ theme }) => ({
    background: '#555555',
    color: 'white',
    marginTop:'50px',
    padding: '20px',
}))

const ImageDiv = styled('div')(({ theme }) => ({
    padding: '50px',
    textAlign: 'center',
    minHeight: '400px',
    border: 'solid 0.5px #e1e1e1',
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))
const STextField = styled(TextField)(({theme}) => (
    {
        '& label.Mui-focused' : {
            color: 'white',
        },
        '& .MuiOutlinedInput-root' : {
            '& fieldset' : {
                borderColor: 'white',
                color: 'white'
            },
            '& input' : {
                color: 'white'
            },
            '&.Mui-focused fieldset' : {
                borderColor: 'white'
            }
        }
    }
))

const StyledTable = styled(Table)(({ theme }) => ({
    // '& .MuiTableHead-root': {
    //     borderBottom: '1px solid rgb(187, 187, 187)'
    // },
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

const Paragraph2 = styled('p')(({ theme }) => ({
    margin: 0,
    fontSize: '12px',
    color: theme.palette.text.secondary,
}))

const Title = styled('p')(() => ({
    fontSize: '25px',
    fontWeight: '600',
    marginTop: '0',
    marginBottom: '0',
    textTransform: 'capitalize',
}))

const SubTitle = styled('p')(({ theme }) => ({
    fontSize: '20px',
    fontWeight: '200',
    marginTop: '0',
    marginBottom: '0',
    color: theme.palette.text.secondary,
}))
const Paragraph = styled('p')(({ theme }) => ({
    margin: 0,
    fontWeight: 'bold',
    color: theme.palette.text.primary,
}))

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '16px',
    fontWeight: '600',
    margin: '0',
    textTransform: 'capitalize',
    color: theme.palette.text.primary,
}))

const Paragraph3 = styled('p')(({ theme }) => ({
    fontSize: '25px',
    textAlign: 'center',
    padding: '10px',
    paddingBottom: '25px',
    margin: 0,
    fontWeight: 'bold',
}))

const Paragraph4 = styled('p')(({ theme }) => ({
    fontSize: '16px',
    textAlign: 'center',
    padding: '10px',
    margin: '20px 0px',
    fontWeight: '400',
}))

const Paragraph5 = styled('p')(({ theme }) => ({
    fontSize: '16px',
    textAlign: 'center',
    padding: '10px',
    margin: '20px 0px',
    fontWeight: '400',
    color: "white",
    cursor: 'pointer',
    background: '#fb9a0a',
    '&:hover': {
        background: '#bf7609',
    },
}))

const Paragraph6 = styled('u')(({ theme }) => ({
    fontSize: '25px',
    textAlign: 'center',
    padding: '10px',
    paddingBottom: '25px',
    margin: 0,
    fontWeight: '500'
}))

const Paragraph7 = styled('div')(({ theme }) => ({
    fontSize: '16px',
    padding: '10px',
    margin: '20px 0px',
    fontWeight: '100',
    textAlign: 'left'
}))


const subscribarList = [
    {
        name: 'Alpha Edition',
        usd: '$19.9',
        eur: '€15.6',
        sgd: 'S$24.5'
    },
    {
        name: 'Arena Promos',
        usd: '$29.9',
        eur: '€22.6',
        sgd: 'S$34.5'
    },
    {
        name: 'Eternal Masters',
        usd: '$29.9',
        eur: '€22.6',
        sgd: 'S$34.5'
    },
]

const PublicPage = () => {
    const { palette } = useTheme()
    const [keyword, setKeyword] = useState();
    const [cardname, setCardName] = useState("Card Name");
    const [edition, setEdition] = useState("Card Edition");
    const [reserved, setReserved] = useState(1);
    const [localprice, setLocalPrice] = useState(0);
    const [lowprice, setLowPrice] = useState(1000000);
    const [lowprice_date, setLowPriceDate] = useState();
    const [highprice, setHighPrice] = useState(0);
    const [highprice_date, setHighPriceDate] = useState();
    const [cardimage, setCardImage] = useState();
    const [printingsList, setPrintingsList] = useState([]);

    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onKeyPress = (e) => {
        if(e.keyCode == 13){
            // console.log(e.target.value);
        }
        console.log(e.target.value);
        
    }

    const getUUID = async (cardname, edition) => { // the callback. Use a better name
        const response = await fetch(
            // 'http://34.239.122.150/api/cardbyname2?name=' + cardname + '&setcode=' + edition
            'http://localhost:8000/api/cardbyname2?name=' + cardname + '&setcode=' + edition
        )
        const carddetail = await response.json();
        console.log(carddetail);

        // const response_scryfall = await fetch(
        //     'https://api.scryfall.com/cards/' + carddetail['scryfallId']
        // )
        // const scryfall_detail = await response_scryfall.json();
        // setCardImage(scryfall_detail['image_uris']['normal']);

        setCardName(carddetail['name']);
        setEdition(carddetail['edition']);
        setReserved(carddetail['isReserved']);
        setLocalPrice(carddetail['local_price']);
        let ckd_history = carddetail['price_history']['cardkingdom'];
        let tcg_history = carddetail['price_history']['tcgplayer'];
        let scg_history = carddetail['price_history']['starcitygame'];
        
        let ckd_series = Object.entries(ckd_history).map((date_price) => {
            // Here date_price[1] = {"2022-4-22": "$19.9"}
            let arr = Object.keys(date_price[1]).map((key) => {
                return [key, parseFloat(date_price[1][key])];
            })
            return arr[0];
        });
        let tcg_series = Object.entries(tcg_history).map((date_price) => {
            // Here date_price[1] = {"2022-4-22": "$19.9"}
            let arr = Object.keys(date_price[1]).map((key) => {
                return [key, parseFloat(date_price[1][key])]
            })
            return arr[0];
        });
        let scg_series = Object.entries(scg_history).map((date_price) => {
            // Here date_price[1] = {"2022-4-22": "$19.9"}
            let arr = Object.keys(date_price[1]).map((key) => {
                return [key, parseFloat(date_price[1][key].substring(1))]
            })
            return arr[0];
        });
        console.log(ckd_series);
        let scg_series_obj = {}
        scg_series.map((dateprice) => {
            scg_series_obj[dateprice[0]] = dateprice[1];
        })
        let ckd_series_obj = {}
        ckd_series.map((dateprice) => {
            ckd_series_obj[dateprice[0]] = dateprice[1];
        })
        let tcg_series_obj = {}
        tcg_series.map((dateprice) => {
            tcg_series_obj[dateprice[0]] = dateprice[1];
        })

        ckd_series = Object.keys(ckd_series_obj).map((date) => {
            return [date, ckd_series_obj[date]];
        });
        tcg_series = Object.keys(tcg_series_obj).map((date) => {
            return [date, tcg_series_obj[date]];
        });
        console.log(ckd_series);

        let local_series = [];
        let lowest = 1000000;
        let lowest_date = '';
        let highest = 0;
        let highest_date = '';

        scg_series.map((dateprice) => {
            let ckd = ckd_series_obj[dateprice[0]];
            console.log(ckd);
            let local = dateprice[1];
            if (ckd && ckd > local)
            {
                local = ckd;
            }
            local = Math.round(local);
            local_series.push([dateprice[0], local]);
            if (lowest > local){
                lowest = local;
                lowest_date = dateprice[0];
            }
            if (highest < local){
                highest = local;
                highest_date = dateprice[0];
            }
        });
        console.log(local_series);
        setLowPrice(lowest);
        setLowPriceDate(lowest_date);
        setHighPrice(highest);
        setHighPriceDate(highest_date);
        setSeries([
            {
                name: 'cardkingdom',
                data: ckd_series
            },
            {
                name: 'tcgplayer',
                data: tcg_series
            },
            {
                name: 'starcitygame',
                data: scg_series
            },
            {
                name: 'local market',
                data: local_series
            }
        ]);

        const response_printings = await fetch(
            // 'http://34.239.122.150/api/printings2?name=' + cardname + '&setcode=' + edition
            'http://localhost:8000/api/printings2?name=' + cardname + '&setcode=' + edition
        )
        const printings = await response_printings.json();
        const printings_list = printings.map((one_print) => {
            return {
                name: one_print['edition'],
                code: one_print['setCode'],
                usd: "$" + one_print['local_price'],
                eur: "€" + Math.floor(100 * parseFloat(one_print['local_price'])/1.2) / 100,
                sgd: "S$" + one_print['local_price'],
            }
        })
        setPrintingsList(printings_list);
        
    };
    const generateDayWiseTimeSeries = (baseval, count, yrange) => {
        var i = 0;
        var series = [];
        while (i < count) {
          var x = baseval;
          var y =
            Math.floor(Math.random() * (yrange.max - yrange.min + i)) +
            yrange.min * i;
    
          series.push([x, y]);
          baseval += 86400000;
          i++;
        }
    
        return series;
    }
    const [chartOptionsArea, setChartOptionsArea] = useState({
        // annotations: {
        //   xaxis: [
        //     {
        //       x: new Date("23 Jul 2017").getTime(),
        //       strokeDashArray: 0,
        //       borderColor: "#775DD0",
        //       label: {
        //         borderColor: "#775DD0",
        //         style: {
        //           color: "#fff",
        //           background: "#775DD0"
        //         },
        //         text: "Anno Test"
        //       }
        //     }
        //   ]
        // },
        chart: {
            id: "chartArea",
            toolbar: {
                autoSelected: "pan",
                show: false
            },
            zoom: {
                autoScaleYaxis: true
            }
        },
        colors: ["#54EE7A", "#546E7A", "#545EEA", "#E45E5A"],
        stroke: {
            width: 3
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1
        },
        markers: {
            size: 0
        },
        xaxis: {
            type: "datetime"
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    });
    const [chartOptionsBrush, setChartOptionsBrush] = useState({
        chart: {
            id: "chartBrush",
            brush: {
                target: "chartArea",
                enabled: true
            },
            // selection: {
            //     enabled: true,
            //     xaxis: {
            //         min: new Date("19 Jun 2017").getTime(),
            //         max: new Date("14 Aug 2017").getTime()
            //     }
            // }
        },
        colors: ["#54EE7A", "#546E7A", "#545EEA", "#E45E5A"],
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.91,
                opacityTo: 0.1
            }
        },
        xaxis: {
            type: "datetime",
            tooltip: {
                enabled: false
            }
        },
        yaxis: {
            tickAmount: 2
        }
    } );
    const [series, setSeries] = useState([
        {
            name: 'cardkingdom',
            data: []
        },
        {
            name: 'tcgplayer',
            data: []
        },
        {
            name: 'starcitygame',
            data: []
        },
        {
            name: 'local market',
            data: []
        }
    ]);

    return (
        <Fragment >
            <div className={"topbar"}>
                <div className={"topnav"} id={"myTopnav"}>
                    <Grid container spacing={3} style={{marginTop: '0', marginLeft: '0'}}>
                        <img src={logo} alt='logo' style={{width: '50px', marginLeft: '10px'}} />
                        <div style={{paddingTop: '8px', marginRight: '50px'}}>
                            <div style={{fontSize: '15px', fontWeight: 'bold'}}>GUTENBERG</div>
                            <div style={{fontSize: '13px', fontWeight: 'bold'}}>Cai</div>
                        </div>
                        <a href="#card-info" class="active">Card Info</a>
                        <a href="#buy">Buy</a>
                        <a href="#contact">Contact</a>
                        <Span sx={{ m: "auto" }}></Span>
                        <SearchBox getUUID={getUUID}></SearchBox>
                        <Span sx={{ m: "auto" }}></Span>
                        <a href="/session/signin" style={{marginRight: '20px'}}>Sign In</a>
                        <a href="javascript:void(0);" class="icon" style={{marginRight: '20px'}} onClick="myFunction()">
                            <i class="fa fa-bars"></i>
                        </a>
                    </Grid>
                </div>
            </div>
            
            
            <ContentBox className="analytics" >
                <Grid container spacing={6} id="card-info">
                    <Grid item lg={4} md={4} sm={12} xs={12} >
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Title>{cardname}</Title>
                                <SubTitle>{edition}</SubTitle>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <ImageDiv>
                                    <img
                                        src={"http://localhost:3000/assets/images/face-5.jpg"}
                                        // src={cardimage}
                                        alt="CardImage"
                                        style={{width: '100%'}}
                                    />
                                </ImageDiv>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Box width="100%" overflow="auto" style={{maxHeight: '300px'}}>
                                    <StyledTable>
                                        <TableHead style={{borderBottom: '2px solid rgb(187, 187, 187)'}}>
                                                <TableRow>
                                                    <TableCell align="left" width="40%"><H4>Other Printings</H4></TableCell>
                                                    {/* <TableCell>Company</TableCell> */}
                                                    <TableCell align="center">USD</TableCell>
                                                    <TableCell align="center">EUR</TableCell>
                                                    <TableCell align="center">SGD</TableCell>
                                                    {/* <TableCell>Action</TableCell> */}
                                                </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {printingsList
                                                .slice(
                                                    0,
                                                    10
                                                )
                                                .map((subscriber, index) => (
                                                    <TableRow key={index}>
                                                        {/* <TableCell align="left">
                                                            <Grid container spacing={1} alignItems="center">
                                                                <Grid item xs={4} sm={4} md={4} style={{textAlign: 'right', paddingTop: '18px', paddingRight: '10px'}}>Tell</Grid>
                                                                <Grid item xs={8} sm={8} md={8}>
                                                                    <Paragraph>Interest</Paragraph>
                                                                    <Paragraph2>DOT Interest Earned</Paragraph2>
                                                                </Grid>
                                                            </Grid>
                                                        </TableCell> */}
                                                        <TableCell align="left">
                                                            <Paragraph onClick={() => getUUID(cardname, subscriber.code)} style={{cursor: 'pointer'}}>{subscriber.name}</Paragraph>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Paragraph2>{subscriber.usd}</Paragraph2>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Paragraph2>{subscriber.eur}</Paragraph2>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Paragraph2>{subscriber.sgd}</Paragraph2>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </StyledTable>                                    
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div style={{float: 'right'}}>
                                    <span><a href=""><Facebook sx={{ color: "#5588e4" }}/></a></span>
                                    <span><a href=""><Twitter sx={{ color: "#5588e4" }}/></a></span>
                                    <span><a href=""><Reddit sx={{ color: "#5588e4" }}/></a></span>
                                    <span><a href=""><Telegram sx={{ color: "#5588e4" }}/></a></span>
                                </div>
                            </Grid>
                        </Grid>

                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            variant="fullWidth"
                            aria-label="secondary tabs example"
                        >
                            <Tab value="one" label="History" />
                            <Tab value="two" label="Card" />
                            <Tab value="three" label="Records" />
                        </Tabs>
                        {value == 'one' ?
                            <Grid container spacing={3}>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <div id="charts">
                                        <div id="chart1" style={{paddingTop: '40px'}}>
                                            <Chart
                                                options={chartOptionsArea}
                                                series={series}
                                                type="line"
                                                height="500"
                                            />
                                        </div>
                                        {/* <div id="chart2">
                                            <Chart
                                                options={chartOptionsBrush}
                                                series={series}
                                                type="area"
                                                height="130"
                                            />
                                        </div> */}
                                    </div>
                                </Grid>
                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                    <div style={{textAlign: 'center'}}>
                                        <Paragraph2 style={{color: '#3ad57f'}}>All Time Low</Paragraph2>
                                        <Paragraph3 style={{color: '#3ad57f'}}>{lowprice != "1000000" ? '$'+ lowprice : '--'}</Paragraph3>
                                        <Paragraph2 style={{color: '#1976d2'}}>{lowprice_date}</Paragraph2>
                                    </div>
                                </Grid>
                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                    <div style={{textAlign: 'center'}}>
                                        <Paragraph2 style={{color: '#db4747'}}>All Time High</Paragraph2>
                                        <Paragraph3 style={{color: '#db4747' }}>{highprice != "0" ? '$'+ highprice : '--'}</Paragraph3>
                                        <Paragraph2 style={{color: '#1976d2'}}>{highprice_date}</Paragraph2>
                                    </div>
                                </Grid>
                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                    <div style={{textAlign: 'center'}}>
                                        <Paragraph2 style={{color: '#4771e7'}}>Local Market Price</Paragraph2>
                                        <Paragraph3 style={{color: '#4771e7'}}>{localprice != "0" ? '$'+ localprice : '--'}</Paragraph3>
                                    </div>
                                </Grid>
                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                    <div style={{textAlign: 'center'}}>
                                        <Paragraph2>Reserve List</Paragraph2>
                                        
                                        <Paragraph3>{reserved == 0 ? 'No' : 'Yes' }</Paragraph3>
                                    </div>
                                </Grid>
                            
                            </Grid>
                            :
                            <></>
                        }
                        {value == 'two' ? <></> :<></>}
                        {value == 'three' ? <></> :<></>}
                    </Grid>
                    {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container spacing={3}>
                            <Grid item lg={3} md={3} sm={6} xs={6}>
                                <Paragraph3 style={{fontSize: '16px'}}>Buy It Now (International)</Paragraph3>
                                <Paragraph4>TCGPlayer $2</Paragraph4>
                                <Paragraph4>CARDKINGDOM $2</Paragraph4>
                                <Paragraph4>CARDMARKET $2</Paragraph4>
                                <Paragraph4>EASTERNTCG $2</Paragraph4>
                            </Grid>
                            <Grid item lg={3} md={3} sm={6} xs={6}>
                                <Paragraph3 style={{fontSize: '16px'}}>AUCTION</Paragraph3>
                                <Paragraph4>TCGPlayer $2</Paragraph4>
                                <Paragraph4>TCGPlayer $2</Paragraph4>
                            </Grid>
                            <Grid item lg={3} md={3} sm={6} xs={6}>
                                <Paragraph3 style={{fontSize: '16px'}}>Buy It Now (International)</Paragraph3>
                                <Paragraph5>EBAY $3</Paragraph5>
                                <Paragraph5>FACEBOOK $2</Paragraph5>
                                <Paragraph5>SHOPEE $3</Paragraph5>
                                <Paragraph5>EASTERNTCG $2</Paragraph5>
                            </Grid>
                            <Grid item lg={3} md={3} sm={6} xs={6}>
                                <Paragraph3 style={{fontSize: '16px'}}>--</Paragraph3>
                                <Paragraph4>TCGPlayer $2</Paragraph4>
                                <Paragraph4>TCGPlayer $2</Paragraph4>
                            </Grid>
                        </Grid>
                    </Grid> */}
                    
                </Grid>
            </ContentBox>
            <Contact>
                <div style={{maxWidth: '1400px',margin: 'auto', paddingLeft: '60px', paddingTop: '60px'}}>
                    <Grid container spacing={6} id="contact" >
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Grid container spacing={3}>
                                <Grid item lg={2} md={2} sm={6} xs={6} >
                                    <Paragraph6 style={{fontSize: '16px'}}>About Us</Paragraph6>
                                    <Paragraph7 ><a href="">Careers</a></Paragraph7>
                                    <Paragraph7><a href="">About Us</a></Paragraph7>
                                    <Paragraph7 ><a href="">Our Story</a></Paragraph7>
                                    <Paragraph7><a href="">Services</a></Paragraph7>
                                    <Paragraph7><a href="">Our Blog</a></Paragraph7>
                                </Grid>
                                <Grid item lg={2} md={2} sm={6} xs={6} >
                                    <Paragraph6 style={{fontSize: '16px'}}>Social Media</Paragraph6>
                                    <Paragraph7 ><a href="">Facebook</a></Paragraph7>
                                    <Paragraph7><a href="">Twitter</a></Paragraph7>
                                    <Paragraph7 ><a href="">Instagram</a></Paragraph7>
                                    <Paragraph7><a href="">Linkedin</a></Paragraph7>
                                    <Paragraph7><a href="">Google +</a></Paragraph7>
                                </Grid>
                                
                                <Grid item lg={4} md={4} sm={12} xs={12} >
                                    <Paragraph6 style={{fontSize: '16px'}}>Account &amp; Shiping Info </Paragraph6>
                                    <Paragraph7 ><a href="">Your account</a></Paragraph7>
                                    <Paragraph7><a href="">Shipping Rates &amp; Policies</a></Paragraph7>
                                    <Paragraph7 ><a href="">Refonos &amp; Replacements</a></Paragraph7>
                                    <Paragraph7><a href="">Delivery Info</a></Paragraph7>
                                    <Paragraph7><a href="">Affiliate Program</a></Paragraph7>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12} >
                                    <Paragraph6 style={{fontSize: '16px'}}>SUBSCRIPTION</Paragraph6>
                                    <Grid container spacing={3} style={{marginTop: '10px'}}>
                                        <Grid item lg={9} md={9} sm={12} xs={12} style={{textAlign: 'center'}}>
                                            <STextField 
                                                style={{marginTop: '15px'}}
                                                onKeyDown={onKeyPress}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={3} sm={12} xs={12} style={{textAlign: 'center'}}>
                                            <Paragraph5>SUB</Paragraph5>
                                        </Grid>
                                    </Grid>
                                    <Paragraph7 style={{fontSize: '14px'}}>Subscriber to our Newslatter to receive early discount offers, latest news, sales and promo information</Paragraph7>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Contact>
        </Fragment>
    )
}

export default PublicPage
