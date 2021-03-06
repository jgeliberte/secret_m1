import React from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import {AppContext} from '../../../AppContext';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { TablePagination } from '@material-ui/core';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const main_div={
  textAlign: 'center',
  padding: '1.5vh'
}
const big_text={
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#504D4D',
}
const padding_div_top={
  paddingTop: '4vh'
}


export default function MaterialTableDemo() {
  const [stateApp, setStateApp] = React.useContext(AppContext);
  let actual_columns = stateApp.m1neralHeaders
  let columns =()=>{
    actual_columns.forEach(element => {
      element.title = element.label
      element.field = element.actual_key
    });
    return actual_columns
  }
  return (
    <div style={main_div}>
      <div style={{...big_text, ...padding_div_top}}>Match your headers to M1neral headers</div>
      <div style={padding_div_top}>
        <MaterialTable
          title="Contacts"
          icons={tableIcons}
          columns={columns()}
          data={stateApp.csvContactsListToSend}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setStateApp((prevState) => {
                    const csvContactsListToSend = [...prevState.csvContactsListToSend];
                    csvContactsListToSend.push(newData);
                    return { ...prevState, csvContactsListToSend };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setStateApp((prevState) => {
                      const csvContactsListToSend = [...prevState.csvContactsListToSend];
                      csvContactsListToSend[csvContactsListToSend.indexOf(oldData)] = newData;
                      return { ...prevState, csvContactsListToSend };
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setStateApp((prevState) => {
                    const csvContactsListToSend = [...prevState.csvContactsListToSend];
                    csvContactsListToSend.splice(csvContactsListToSend.indexOf(oldData), 1);
                    return { ...prevState, csvContactsListToSend };
                  });
                }, 600);
              }),
          }}
          components={{
            Pagination: props => (
                         <TablePagination
                         {...props}
                        rowsPerPageOptions={[10, 25, 50, 100, 500 , 1000]}
                  />
                ),
            }}
        />
      </div>
    </div>
  );
}
