import React from 'react';
import { Fab, withStyles, Tooltip, Typography, Table, TableBody, TableHead, TableRow, TableCell, Paper } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { compose } from 'recompose';
import { formatMessage, FormattedMessage } from 'umi-plugin-locale';
import ReactMarkdown from 'react-markdown';
import get from 'lodash/get';
import { connect } from 'dva';

const styles: any = (theme: any) => ({
  container: {
    margin: theme.spacing.unit * 2,
  },
  attachFileButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
  },
  markdown: {
    background: '#eee',
    padding: theme.spacing.unit,
  },
  uploadInput: {
    display: 'none',
  },
  paper: {
    width: '100%',
    margin: '0 auto',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    maxWidth: 700,
  },
  table: {
  },
});

interface IShoppingReceiptAppProps {
  classes: any;
  dispatch: any;
  receipt: any;
}

const demoMarkdown = `\`\`\`json
{
  "location": "CA",
  "products": [
    {
      "name": "book",
      "price": 17.99,
      "quantity": 1
    },
    {
      "name": "potato chips",
      "price": 3.99,
      "quantity": 1
    }
  ]
}
\`\`\``;

const ShoppingReceiptApp = (props: IShoppingReceiptAppProps) => {

  const { classes, dispatch, receipt } = props;

  const onUpload = (event: any) => {
    const file = event.target.files[0];
    if (!file) {
      alert(formatMessage({ id: 'app.error.no.json.file' }));
    }
    const fileReader = new FileReader();
    fileReader.onload = (fileReaderEvent: any) => {
      try {
        const json = JSON.parse(get(fileReaderEvent, 'target.result'));
        dispatch({
          type: 'shoppingReceipts/updateReceipt',
          json,
        });
      } catch (e) {
        alert(formatMessage({ id: 'app.error.json.parse' }));
      }
    };
    fileReader.readAsText(file);
  };

  const UploadDescription = () => (
    <>
      <Typography variant="subtitle1" gutterBottom={true}>
        <FormattedMessage id="app.upload.json.description" />
      </Typography>

      <ReactMarkdown source={demoMarkdown} className={classes.markdown} />
    </>
  );

  const UploadJSONButton = () => (
    <>
      <input
        accept="application/json"
        className={classes.uploadInput}
        id="json-upload-input"
        type="file"
        onChange={onUpload}
      />
      <label htmlFor="json-upload-input">
        <Tooltip title={formatMessage({ id: 'app.upload.json' })}>
          <Fab
            color="secondary"
            component="span"
            className={classes.attachFileButton}
          >
            <AttachFileIcon />
          </Fab>
        </Tooltip>
      </label>
    </>
  );

  const products = get(receipt, 'items', []);

  const Receipt = () => {

    const tableRows = get(receipt, 'items', []).map((p: any, index: any) => (
      <TableRow key={index}>
        <TableCell>{get(p, 'name')}</TableCell>
        <TableCell align="right">${get(p, 'price', 0).toFixed(2)}</TableCell>
        <TableCell align="right">{get(p, 'quantity', 0)}</TableCell>
      </TableRow>
    ));

    return (
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <FormattedMessage id="app.receipt.item" />
              </TableCell>
              <TableCell align="right">
                <FormattedMessage id="app.receipt.price" />
              </TableCell>
              <TableCell align="right">
                <FormattedMessage id="app.receipt.quantity" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows}
            <TableRow>
              <TableCell colSpan={2}>
                <FormattedMessage id="app.receipt.subTotal" />
              </TableCell>
              <TableCell align="right">
                ${get(receipt, 'subTotal', 0).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <FormattedMessage id="app.receipt.tax" />
              </TableCell>
              <TableCell align="right">
                ${get(receipt, 'tax', 0).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <FormattedMessage id="app.receipt.total" />
              </TableCell>
              <TableCell align="right">
                ${get(receipt, 'total', 0).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  };

  return (
    <div className={classes.container}>
      {products.length > 0 ? <Receipt /> : <UploadDescription />}
      <UploadJSONButton />
    </div>
  );
}

export default compose(
  withStyles(styles),
  connect(
    (state: any) => ({
      receipt: get(state, 'shoppingReceipts')
    }),
  ),
)(ShoppingReceiptApp as any);
