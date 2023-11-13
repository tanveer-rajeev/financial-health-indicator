import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
  Paper,
  styled,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const { access_token, userId } = useSelector((state) => state.auth.authData);
  const [save, setSave] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [financialHealth, setFinancialHealth] = useState(0.0);
  const [financialData, setFinancialData] = useState({
    id: 0,
    monthlyIncome: 0.0,
    monthlyExpenses: 0.0,
    totalDebts: 0.0,
    totalAssets: 0.0,
    userId: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      handleHealthCheck();
      try {
        const response = await axios.get(
          `http://localhost:9090/api/v1/data/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        const { data } = response.data;

        setFinancialData((prevData) => ({
          ...prevData,
          id: data?.id || 0,
          monthlyIncome: data?.monthlyIncome || 0.0,
          monthlyExpenses: data?.monthlyExpenses || 0.0,
          totalDebts: data?.totalDebts || 0.0,
          totalAssets: data?.totalAssets || 0.0,
        }));
      } catch (error) {
        console.error("Error fetching financial data:", error);
        setFinancialData({
          id: 0,
          monthlyIncome: 0.0,
          monthlyExpenses: 0.0,
          totalDebts: 0.0,
          totalAssets: 0.0,
          userId: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, access_token]);

  const handleInputChange = (field, value) => {
    setFinancialData((prevData) => ({
      ...prevData,
      [field]: +value || 0,
    }));
  };

  const handleHealthCheck = () => {
    axios
      .get(`http://localhost:9090/api/v1/data/calculateHealth/${userId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        setFinancialHealth(res.data.data);
      });
  };

  const handleSave = () => {
    const savePayload = {
      ...financialData,
      userId: userId,
    };

    axios
      .post(`http://localhost:9090/api/v1/data/save`, savePayload, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const savedData = response.data; // Assuming the response contains the saved data

        if (savedData?.data?.id > 0) setSave((prev) => !prev);
        setFinancialData((prevData) => ({
          ...prevData,
          ...savedData,
        }));
        handleHealthCheck();
        setEdit(false);
        console.log(financialData);
      })
      .catch((error) => {
        console.error("Error saving financial data:", error);
      });
  };

  const handleUpdate = () => {
    const savePayload = {
      ...financialData,
      userId: userId,
    };

    axios
      .put(`http://localhost:9090/api/v1/data/${userId}`, savePayload, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const savedData = response.data; // Assuming the response contains the saved data
        console.log(savedData);

        setFinancialData((prevData) => ({
          ...prevData,
          ...savedData,
        }));
        handleHealthCheck();
        setEdit(false);
        console.log(financialData);
      })
      .catch((error) => {
        console.error("Error saving financial data:", error);
      });
  };
  return (
    <Box>
      {isLoading && <p>Loading..</p>}
      <Card sx={{ minWidth: 85, margin: 5 }}>
        <CardContent>
          <Grid item xs={6}>
            <Typography
              sx={{ fontSize: 44 }}
              color="text.secondary"
              gutterBottom
            >
              Your financial health score
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ fontSize: 124, fontWeight: 700 }}
              color="text.secondary"
              gutterBottom
            >
              {financialHealth}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 6 }}
      >
        <Grid item xs={6}>
          <Item sx={{ fontWeight: 700 }}>
            Monthly Income: {financialData.monthlyIncome}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item sx={{ fontWeight: 700 }}>
            Monthly Expenses: {financialData.monthlyExpenses}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item sx={{ fontWeight: 700 }}>
            Total Debts: {financialData.totalDebts}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item sx={{ fontWeight: 700 }}>
            Total Assets: {financialData.totalAssets}
          </Item>
        </Grid>
      </Grid>
      {!edit && (
        <Button
          sx={{ width: "50%" }}
          onClick={() => {
            setEdit(true);
          }}
          variant="contained"
          color="primary"
          size="large"
          type="button"
        >
          Edit
        </Button>
      )}

      {edit && (
        <>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                name="monthlyIncome"
                label="Monthly Income"
                fullWidth
                variant="outlined"
                value={financialData.monthlyIncome}
                onChange={(e) =>
                  handleInputChange("monthlyIncome", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="monthlyExpenses"
                label="Monthly ex"
                fullWidth
                variant="outlined"
                value={financialData.monthlyExpenses}
                onChange={(e) =>
                  handleInputChange("monthlyExpenses", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="totalDebts"
                label="Total debts "
                fullWidth
                variant="outlined"
                value={financialData.totalDebts}
                onChange={(e) =>
                  handleInputChange("totalDebts", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="totalAssets"
                label="Total Assets"
                fullWidth
                variant="outlined"
                value={financialData.totalAssets}
                onChange={(e) =>
                  handleInputChange("totalAssets", e.target.value)
                }
              />
            </Grid>
            {/* Repeat similar TextField components for other fields */}
          </Grid>
          <Box>
            {save ? (
              <Button
                sx={{ marginTop: 10, width: "50%" }}
                onClick={handleSave}
                variant="contained"
                color="primary"
                size="large"
                type="button"
              >
                Save
              </Button>
            ) : (
              <Button
                sx={{ marginTop: 10, width: "50%" }}
                onClick={handleUpdate}
                variant="contained"
                color="primary"
                size="large"
                type="button"
              >
                Update
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Home;
