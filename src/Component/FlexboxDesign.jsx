import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Barcharts from './Barcharts'
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function JustifyContent() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Item sx={{width:"250px" ,height:"130px",marginRight:"35px"}}>Item 1</Item>
        <Item sx={{width:"250px" ,height:"130px",marginRight:"35px"}}>Item 2</Item>
        <Item sx={{width:"250px" ,height:"130px",marginRight:"35px"}}>Item 3</Item>
        <Item sx={{width:"250px" ,height:"130px",marginRight:"35px"}}>Item 3</Item>
      </Box>
     
    
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Item sx={{width:"560px" , height:"200px"}}>itemschart<Barcharts/></Item>
        <Item sx={{width:"560px" , height:"200px"}}>Item 2</Item>
        
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Item sx={{width:"600px",height:"190px"}}>Item 1</Item>
        <Item sx={{width:"300px",height:"190px"}}>Item 2</Item>
        <Item sx={{width:"200px",height:"190px"}}>Item 3</Item>
      </Box>
     
    </div>
  );
}
