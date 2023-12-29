import React, {useState, useEffect} from "react";
import UserService from "../services/user.service";
import {showSuccessSnackbar, showErrorSnackbar} from "../actions/snackbarActions";
import {useDispatch} from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {styled} from "@mui/material/styles";
import CommentMessage from "../components/commentMessage";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'rgb(49,152,144)',
        color: theme.palette.common.white,
        paddingBottom: 1,
        paddingTop: 1
    },
    [`&.${tableCellClasses.body}`]: {
        paddingBottom: 1,
        paddingTop: 0,
    },
}));


function createData(username, email, message, comment, status, dateStart, dateUpdate, id) {
    return {username, email, message, comment, status, dateStart, dateUpdate, id};
}


let rows = [];
let oldrows = [];

function createRows(data){
    rows = [];
    let index =0;
    if (data !== undefined){
        if (data.length >0){
            data.map((item) =>{
                index +=1;
                rows.push(createData(
                                    item.username,
                                    item.email,
                                    item.message,
                                    item.comment,
                                    item.status,
                                    item.createdAt.slice(0,10)+'  ('+item.createdAt.slice(11,16)+')',
                                  item.updatedAt.slice(0,10)+'  ('+item.updatedAt.slice(11,16)+')',
                                    item.id
                                    ));
            })}
        else  rows.push(createData("","","","","","","","",));
    }

}
function createOldRows(data){
    oldrows = [];
    let index =0;
    if (data !== undefined){
        if (data.length >0){
            data.map((item) =>{
                oldrows.push(createData(
                    item.username,
                    item.email,
                    item.message,
                    item.comment,
                    item.status,
                    item.createdAt.slice(0,10)+'  ('+item.createdAt.slice(11,16)+')',
                    item.updatedAt.slice(0,10)+'  ('+item.updatedAt.slice(11,16)+')',
                    item.id
                ));
            })}
        else  oldrows.push(createData("","","","","","","","",));
    }

}

const BoardAdmin = () => {
  const [content, setContent] = useState([]);
  const [oldContent, setOldContent] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
      getNewRequests();
      getOldRequests();
  },[]);


  function getNewRequests(){
      UserService.getRequests().then(
          (response) => {
              setContent(response.data);
              createRows(response.data);
              dispatch(showSuccessSnackbar("Данные загружены"));
          },
          (error) => {dispatch(showErrorSnackbar(error.toString()))
          }
      );
  }
    function getOldRequests(){
        UserService.getOldRequests().then(
            (response) => {
                setOldContent(response.data);
                createOldRows(response.data);
                dispatch(showSuccessSnackbar("Данные загружены"));
            },
            (error) => {dispatch(showErrorSnackbar(error.toString()))
            }
        );
    }

    function OldRow(props) {
        const { row } = props;
        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}  >
                    <StyledTableCell component="th" scope="row">{row.username}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">{row.message}</StyledTableCell>
                    <StyledTableCell align="right">{row.comment}</StyledTableCell>
                    <StyledTableCell align="right">{row.status}</StyledTableCell>
                    <StyledTableCell align="right">{row.dateStart}</StyledTableCell>
                    <StyledTableCell align="right">{row.dateUpdate}</StyledTableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    function Row(props) {
        const { row } = props;
        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className='table-row' onClick={()=>handleCLickRow(row)}>
                    <StyledTableCell component="th" scope="row">{row.username}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">{row.message}</StyledTableCell>
                    <StyledTableCell align="right">{row.comment}</StyledTableCell>
                    <StyledTableCell align="right">{row.status}</StyledTableCell>
                    <StyledTableCell align="right">{row.dateStart}</StyledTableCell>
                    <StyledTableCell align="right">{row.dateUpdate}</StyledTableCell>
                </TableRow>
            </React.Fragment>
        );
    }



    function handleCLickRow(row){
      if (row.id) {
          let itemSelected = content.find((item) => item.id === row.id);

          console.log('row', row);
          setSelectedItem(itemSelected);
      }
    }


    return (
    <div className="container">
          <h3>Список заявок</h3>
          <h6>Выберите из списка, что бы оставить комментарий </h6>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer component={Paper} sx={{ maxHeight: "85vh" }}>
                  <Table stickyHeader  aria-label="collapsible table" >
                      <TableHead >
                          <TableRow >
                              <StyledTableCell>Имя</StyledTableCell>
                              <StyledTableCell>эл. почта</StyledTableCell>
                              <StyledTableCell align="right">Сообщение</StyledTableCell>
                              <StyledTableCell align="right">Комментарий</StyledTableCell>
                              <StyledTableCell align="right">Статус</StyledTableCell>
                              <StyledTableCell align="right">Дата Создания</StyledTableCell>
                              <StyledTableCell align="right">Дата Обновления</StyledTableCell>
                          </TableRow>
                      </TableHead>
                      {content &&(<TableBody  >
                          {rows.map((row) => (
                              <Row key={row.id} row={row}  onClick={handleCLickRow}/>
                          ))}
                      </TableBody>)}
                  </Table>
              </TableContainer>
          </Paper>


        <h3>Список Выполненных заявок</h3>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer component={Paper} sx={{ maxHeight: "85vh" }}>
                <Table stickyHeader  aria-label="collapsible table" >
                    <TableHead >
                        <TableRow >
                            <StyledTableCell>Имя</StyledTableCell>
                            <StyledTableCell>эл. почта</StyledTableCell>
                            <StyledTableCell align="right">Сообщение</StyledTableCell>
                            <StyledTableCell align="right">Комментарий</StyledTableCell>
                            <StyledTableCell align="right">Статус</StyledTableCell>
                            <StyledTableCell align="right">Дата Создания</StyledTableCell>
                            <StyledTableCell align="right">Дата Обновления</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {oldContent &&(<TableBody  >
                        {oldrows.map((row) => (
                            <OldRow key={row.id} row={row}  />
                        ))}
                    </TableBody>)}
                </Table>
            </TableContainer>
        </Paper>


        {selectedItem.id &&(<CommentMessage data={selectedItem} setData={setSelectedItem}  getNewRequests={ getNewRequests} getOldRequests={getOldRequests} />)}
    </div>
  );
};

export default BoardAdmin;
