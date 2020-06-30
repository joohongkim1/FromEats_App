import React from "react";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import logo from "../images/logo.png";

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      position: "fixed",
      display: "flex",
      top: 0,
      backgroundImage:
        "url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0IDQgKDQgIBwgICA0HBwcHBw8ICQcNFREWFhURExMYHSggGCYlGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDw0NDi0ZFRk4NysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIARMAtwMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQID/8QAGhABAQEAAwEAAAAAAAAAAAAAAAERITFBUf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgb/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AO5pUcE78qAqiABQRUUQBYIoACCqig1BFRVVCILCgAIAxagNAipQARQKACKAACCosFWKyqDSsNIKqKAAgBQHMqDSAVBVZUUSgihqxCCNCaSgoCKoiwFWVIqDQixBRBAAUYqKioIoqoACVFqKAAgs4RQURUUVFBVjKoNKkVAAQKFFRzFRQQVVQAExK0iiC1BF6NRQUCIqkRYCrEixBVRUAACiAMoCglVFAEAorNUNMFANIoBAQFRYCgINQhBBQQAAGANUQBQEKAEpVCiaoheFSqKARAWEEFEUFioqCpVQEoUBmgjQUKAIqaAlBQgUBTtAFWIqCgAKioLFRUAAEogoiAoAkMFSqyoAAAALqAEaZaAipFQFiCDREWAqUQAKAiLiKCYqaAURQBAUAA0AGmVhRYqCCgIKAKAAItBGQoohSlihqAAJoAqAKABGmVhRQioACKoAAuIIUKAyKiiVIUUKAAipQAAIACrEWAoCCwIIqgA0ipUEAVGQRRKtEUAOgEAAAAAFWIA0AlFARVABoqaiAFFRlFFGRaigUAQ0ASKgooioCosFVUipQVFQVYiwAq1JEEAVGQFBlaigUAQAEFqKKIoCoqCxUipVFBBYsSNAAIMi4KjFCiglKigACAAIqKLCIoCoqCxUipVVUioLIpBEAWCoLQRyoVGgtRdKoiKAgGgIUUURQGoysQaImKlFipFRWoEWIIoAUSwEcqeg2DP0AAAEBQKACgAtBBZ4qiUIoILCUBWgEQoAP//Z)",
      backgroundSize: "cover",

      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    },
    box: {
      backgroundColor: "#f59c4e",
      borderRadius: "15px 15px 15px 15px",
      padding: "10px 10px 3px 10px",
      color: "#ffffff",
      fontWeight: 500,
      fontSize: 30,
      bottom: "0px",
      position: "fixed",
      width: "70%",
      marginLeft: "15%",
      marginBottom: "30%",
    },
    title: {
      marginTop: "30%",
      width: 300,
      height: 300,
    },
  })
);

//const wines = [1, 2, 3]; // 표시할 카드 개수

export default function Entrance() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div
          className={classes.content}
          style={{
            width: "100%",
            height: "100vh",
            zIndex: 2,
            textAlign: "center",
          }}
        >
          <Link to="/lifestyle" style={{ width: "100%" }}>
            <img src={logo} alt="back" className={classes.title} />
            {/* <Box className={classes.title}>From Eats</Box> */}
            <Box className={classes.box}>시작하기</Box>
          </Link>
        </div>
        {/* End hero unit */}
      </main>
    </React.Fragment>
  );
}
