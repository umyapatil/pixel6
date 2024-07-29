import React from 'react'
import { useState, useEffect } from "react";
import { Paper, TableContainer, Table, TableHead, Typography, Grid, MenuItem, Select, InputLabel, FormControl, TableCell, TableBody, Avatar, TableRow, TablePagination } from '@mui/material';

const EmployeesDetails = () => {

  const [usersData, setUsersData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filteredData, setFiltredData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      console.log(data.users);
      setUsersData(data.users);
      setFiltredData(data.users);
    }

    fetchUsersData();

  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    if (value === 'male') {
      const updatedData = usersData.filter((user) => {
        console.log(user.gender);
        return user.gender == "male";
      })
      setFiltredData(updatedData);
    } else if (value == "female") {
      const updatedData = usersData.filter((user) => {
        console.log(user.gender);
        return user.gender == "female";
      })
      setFiltredData(updatedData);
    }
    else {
      setFiltredData(usersData);
    }
  };

  const handleChange2 = (event) =>{
    const { name, value } = event.target;
    if (value === 'unitedstate'){
      const updatedData = usersData.filter((user) => {
        console.log(user.address.country);
        return user.address.country == "United States";
      })
      setFiltredData(updatedData);
    } 
  }



  const slicedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid>
          <Typography variant="h4" gutterBottom>
            Employees
          </Typography>
        </Grid>

        <Grid>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Gender</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              // value={age}
              label="Gender"
              onChange={handleChange}
            >
              <MenuItem value="">
              </MenuItem>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Country</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              // value={age}
              label="Country"
              onChange={handleChange2}
            >
              <MenuItem value="">
              </MenuItem>
              <MenuItem value="unitedstate">United States</MenuItem>
            </Select>
          </FormControl>
        </Grid>

      </Grid>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            {/* Table heading  */}
            <TableHead>
              <TableRow>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Image
                </TableCell>
                <TableCell>
                  Full Name
                </TableCell>
                <TableCell>
                  Gender
                </TableCell>
                <TableCell>
                  Designation
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {slicedData.map((user) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    <TableCell  >
                      {user.id}
                    </TableCell>
                    
                    <TableCell  >
                      <Avatar alt="Remy Sharp" src={user.image} />
                    </TableCell>
                    <TableCell  >
                      {user.firstName + " " + user.lastName}
                    </TableCell>
                    <TableCell >
                      {user.gender}
                    </TableCell>
                    <TableCell >
                      {user.company.department}
                    </TableCell>
                    <TableCell  >
                      {user.address.city}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default EmployeesDetails