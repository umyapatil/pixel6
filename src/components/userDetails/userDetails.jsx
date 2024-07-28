import React from 'react'
import { useState, useEffect } from "react";
import { Paper, TableContainer, Table, TableHead, TableCell, TableBody, Avatar, TableRow, TablePagination } from '@mui/material';

const UserDetails = () => {

  const [usersData, setUsersData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


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
    }

    fetchUsersData();

  }, [])



  return (
    <div>
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
                  Designation
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {usersData.map((user) => {
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
          count={usersData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default UserDetails