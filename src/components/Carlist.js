import React, { useState, useEffect } from "react";
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import BtnCellRenderer from "./BtnCellRenderer";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Addcar from "./Addcar";
import Editcar from "./Editcar";


 export default function Carlist() {

    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }
    
    const handleClick = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setOpen(false);
    };
    
    const deleteCar = (field) => {
        if(window.confirm('Are you sure?')){
            fetch(field, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
            setMessage('Car Deleted');
            handleClick();
        }
    }

    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
        setMessage('New Car added');
        handleClick();
    }

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
            setMessage('Car details updated');
            handleClick();
        } 
        
    const columns = [
        {headerName: 'Brand', field: 'brand', floatingFilter: true, sortable: true},
        {headerName: 'Model', field: 'model',floatingFilter: true, sortable: true},
        {headerName: 'Color', field: 'color',floatingFilter: true, sortable: true},
        {headerName: 'Fuel', field: 'fuel',floatingFilter: true, sortable: true},
        {headerName: 'Year', field: 'year',floatingFilter: true, sortable: true},
        {headerName: 'Price', field: 'price',floatingFilter: true, sortable: true},
        {
            width: 90,
            headerName: 'Edit',
            field: '_links.self.href',
            cellRenderer: row => <Editcar updateCar={updateCar} car={row.data} />
        },
        {
            headerClass: 'Delete-button',
            sortable: false,
            width: 90,
            headerName: 'Delete',
            field: '_links.self.href',
            cellRenderer: BtnCellRenderer,
            cellRendererParams:{
                clicked: function (field) {
                    deleteCar(field);
                }}
            }
        ]

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
            <CloseIcon fontSize="small" />
            </IconButton>
            </React.Fragment>
          );

    return (
        <div className="tablecontent">
            <div className="ag-theme-material"
                style={{height: '90vh', width: '100%',}} >
            <Addcar saveCar={saveCar} />
            <AgGridReact
                rowSelection="single"
                columnDefs={columns}
                rowData={cars}
                animateRows={true}
                enableColResize={true}
                onGridReady= {function(params) {
                    params.api.sizeColumnsToFit();
                }}
            ></AgGridReact>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            />
            </div>
        </div>
    );
}





 