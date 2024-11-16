import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddProduct from "./pages/AddPrdouct";
import EditProduct from "./pages/EditProduct";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
// import AllProducts from "./components/AllProducts";

// Material-UI Imports
import { CssBaseline, Box, ThemeProvider } from "@mui/material";
import theme from "./theme"; // Custom Material-UI theme

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "#f9f9f9",
          }}
        >
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <Box component="main" sx={{ flexGrow: 1, padding: "1rem" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              //<Route path="/all-products" element={<AllProducts />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>

          {/* Footer */}
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
