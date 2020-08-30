import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';


// Create Document Component
const MyDoc = (props) => (
  <Document>
    <Page size="A4" style={styles.page}>
    <Text style={styles.header} fixed>Hospitel Header</Text>
    <Text style={styles.header}>Tocken Numer: {props.tocken}</Text>
      <Text style={styles.title}>Name: </Text>
      <Text style={styles.title}>Place: </Text>
    </Page>
  </Document>
);



class Download extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      tocken: this.props.match.params.id,
    };
  }

  render(){
    return(
    <div>
      <h1>Your Tocken</h1>
    <PDFViewer style={{width: '80%', height: 400}}>
    <MyDoc tocken={this.state.tocken} />
    </PDFViewer>
      <br />
    <PDFDownloadLink document={<MyDoc tocken={this.state.tocken} />} fileName={this.state.tocken+'.pdf'}>
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
    </div>
  );


  }

}
  

  

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  header: {
    fontSize: 50,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  title: {
    fontSize: 24,
    textAlign: 'left',

  },
});


export default Download;