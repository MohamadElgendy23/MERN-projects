import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 30,
    marginTop: "30px",
    marginLeft: "33px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
  },
  typography: { textAlign: "center", marginLeft: "100px" },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "30px",
    height: "75px",
  },
}));
