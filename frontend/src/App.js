import { Grid, IconButton, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={6} sx={{ mb: 3 }}>
          <Typography variant="h2">Multipedia</Typography>
        </Grid>
        <Grid item xs={12}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="What would you like to know?"
            style={{ minWidth: "70vh" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
