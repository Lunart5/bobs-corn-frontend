import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import App from "./App"

const theme = createTheme({
  palette: {
    primary: {
      main: "#f9d039",
    },
    secondary: {
      main: "#10b981",
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </BrowserRouter>
  </>,
)
