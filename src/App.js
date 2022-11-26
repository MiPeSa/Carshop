import './App.css';
import Carlist from './components/Carlist';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <div className="App">
        <Box sx={{ flexGrow: 1, color: 'primary.main', backgroundColor: 'primary.main'}}>
      <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
              CarShop
            </Typography>
          </Toolbar>
      </AppBar>
      </Box>
      <Carlist />
    </div>
  );
}

export default App;
