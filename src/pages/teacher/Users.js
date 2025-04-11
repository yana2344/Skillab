import React from "react";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Box, IconButton, MenuItem, Select } from "@mui/material";
import { DataGrid, GridPagination, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/layout/Header";
import TableLayout from "../../components/gridLayout/TableLayout";

function Users() {
    const [pageSize, setPageSize] = useState(25);
    const [page, setPage] = useState(0);
    const isLoading = Boolean(false);

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "username", headerName: "USERNAME", flex: 1 },
        {
            field: "first_name",
            headerName: "NAME",

            cellClassName: "name-column--cell",
            flex: 1,
        },
        {
            field: "last_name",
            headerName: "SURNAME",
            flex: 1,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "date_joined",
            headerName: "REGISTERED",
            width: 200,
            valueGetter: ({ value }) => {
                const date = parseISO(value);
                const result = format(date, "dd-MM-yyyy");
                return result;
            },
        },
        {
            field: "email",
            headerName: "EMAIL",
            flex: 1,
        },
    ];

    //   const renderPagination = () => (
    //     <GridPagination
    //       page={page}
    //       totalPages={totalPages}
    //       ActionsComponent={(props) => (
    //         <>
    //           <IconButton onClick={handlePrevPage} disabled={serverPage === 1}>
    //             <NavigateBeforeIcon />
    //           </IconButton>
    //           <CustomPagination page={serverPage} totalPages={totalPages} onPageChange={(newPage) => setPage(newPage)} />
    //           <IconButton onClick={handleNextPage} disabled={serverPage === totalPages}>
    //             <NavigateNextIcon />
    //           </IconButton>
    //         </>
    //       )}
    //     />
    //   );

    return (
        <Box m="20px">
            <Header title="USERS" subtitle="Manage here your users" />

            <TableLayout>
                <DataGrid
                    loading={isLoading}
                    rows={""}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => {
                        setPageSize(newPageSize);
                        setPage(0);
                    }}
                    page={page}
                    onPageChange={(newPage) => setPage(newPage)}
                    rowCount={3}
                    pagination
                    paginationMode="server"
                    rowsPerPageOptions={[25, 50, 100]}
                    components={{
                        Toolbar: GridToolbar,
                        //Pagination: renderPagination
                    }}></DataGrid>
            </TableLayout>
        </Box>
    );
}

export default Users;